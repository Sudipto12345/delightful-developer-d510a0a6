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
      email: typeof claims?.email === "string" ? claims.email : undefined,
    });

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("enrollments").update({ txn_id: intent.id }).eq("id", enrollment.id);

    return { enrollmentId: enrollment.id, checkoutUrl: intent.hostedUrl };
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

    const { getPaymentIntent } = await import("@/lib/airwallex.server");
    const intent = await getPaymentIntent(enrollment.txn_id);
    const paid = intent.status === "SUCCEEDED" || intent.status === "CAPTURE_REQUESTED";

    if (paid) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("enrollments").update({ status: "approved" }).eq("id", enrollment.id);
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
