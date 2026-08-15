import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Starts a course purchase: records a pending enrollment and creates an
 * Airwallex payment intent, returning the hosted checkout URL.
 */
export const startCoursePurchase = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { slug: string; origin: string }) => {
    if (!input?.slug || typeof input.slug !== "string") throw new Error("Course is required");
    if (!/^https?:\/\//.test(input.origin ?? "")) throw new Error("Invalid origin");
    return { slug: input.slug.slice(0, 120), origin: input.origin.slice(0, 200) };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;

    const { data: course, error } = await supabase
      .from("courses")
      .select("slug, title, price")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!course) throw new Error("Course not found");

    const { data: enrollment, error: insertError } = await supabase
      .from("enrollments")
      .insert({
        user_id: userId,
        course_slug: course.slug,
        course_title: course.title,
        amount: course.price,
        method: "airwallex",
        txn_id: "",
        status: "pending",
      })
      .select("id")
      .single();
    if (insertError) throw new Error(insertError.message);

    const { createPaymentIntent } = await import("@/lib/airwallex.server");
    const intent = await createPaymentIntent({
      amount: Number(course.price),
      currency: "USD",
      merchantOrderId: enrollment.id,
      descriptor: course.title,
      returnUrl: `${data.origin}/checkout/return?enrollment=${enrollment.id}`,
      ...(typeof claims?.email === "string" ? { email: claims.email } : {}),
    });

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("enrollments").update({ txn_id: intent.id }).eq("id", enrollment.id);

    // Intent id + client secret are handed to the Airwallex Components SDK on the
    // client, which owns the actual hosted checkout session (see checkout.$slug.tsx).
    return {
      enrollmentId: enrollment.id,
      intentId: intent.id,
      clientSecret: intent.clientSecret,
      currency: intent.currency,
    };
  });

/**
 * Verifies an Airwallex payment after the buyer returns from checkout and
 * unlocks the course when the intent has succeeded.
 */
export const confirmCoursePurchase = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { enrollmentId: string }) => {
    if (!input?.enrollmentId) throw new Error("Missing enrollment");
    return { enrollmentId: input.enrollmentId.slice(0, 64) };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: enrollment, error } = await supabase
      .from("enrollments")
      .select("id, user_id, course_slug, course_title, amount, txn_id, status")
      .eq("id", data.enrollmentId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!enrollment || enrollment.user_id !== userId) throw new Error("Enrollment not found");

    if (enrollment.status === "approved") {
      return { status: "approved" as const, courseSlug: enrollment.course_slug, courseTitle: enrollment.course_title, amount: Number(enrollment.amount) };
    }
    if (!enrollment.txn_id) {
      return { status: "pending" as const, courseSlug: enrollment.course_slug, courseTitle: enrollment.course_title, amount: Number(enrollment.amount) };
    }

    // Server-side verification with Airwallex; the return page is never proof of payment.
    const { getPaymentIntent } = await import("@/lib/airwallex.server");
    const intent = await getPaymentIntent(enrollment.txn_id);
    const paid = intent.status === "SUCCEEDED" || intent.status === "CAPTURE_REQUESTED";
    const failed = intent.status === "CANCELLED" || intent.status === "FAILED";

    if (paid || failed) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin
        .from("enrollments")
        .update({ status: paid ? "approved" : "rejected" })
        .eq("id", enrollment.id)
        .eq("txn_id", enrollment.txn_id);
    }

    return {
      status: paid ? ("approved" as const) : ("pending" as const),
      providerStatus: intent.status,
      courseSlug: enrollment.course_slug,
      courseTitle: enrollment.course_title,
      amount: Number(enrollment.amount),
    };
  });

/** Course slugs the signed-in learner has paid for. */
export const listMyPaidCourses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("enrollments")
      .select("course_slug")
      .eq("user_id", context.userId)
      .eq("status", "approved");
    return { slugs: (data ?? []).map((r) => r.course_slug) };
  });

/**
 * Latest webhook-confirmed payment outcome for the signed-in learner's most
 * recent checkout. Reads the enrollment plus the webhook delivery that
 * confirmed it, so the dashboard reflects server-verified state only.
 */
export const latestPaymentStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: enrollment } = await context.supabase
      .from("enrollments")
      .select("id, course_slug, course_title, amount, txn_id, status, created_at, updated_at")
      .eq("user_id", context.userId)
      .eq("method", "airwallex")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!enrollment) return { payment: null };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: event } = await supabaseAdmin
      .from("payment_webhook_events")
      .select("id, event_type, provider_status, outcome, verification_result, created_at")
      .eq("order_id", enrollment.id)
      .eq("verification_result", "verified")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const providerStatus = event?.provider_status ?? null;
    const state: "succeeded" | "failed" | "cancelled" | "pending" =
      enrollment.status === "approved"
        ? "succeeded"
        : providerStatus === "CANCELLED"
          ? "cancelled"
          : enrollment.status === "rejected" || providerStatus === "FAILED"
            ? "failed"
            : "pending";

    return {
      payment: {
        enrollmentId: enrollment.id,
        courseSlug: enrollment.course_slug,
        courseTitle: enrollment.course_title,
        amount: Number(enrollment.amount),
        state,
        confirmedByWebhook: Boolean(event),
        eventType: event?.event_type ?? null,
        providerStatus,
        updatedAt: enrollment.updated_at ?? enrollment.created_at,
      },
    };
  });
