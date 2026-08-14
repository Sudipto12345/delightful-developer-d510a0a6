import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error || !data) throw new Error("Forbidden");
}

/** Recent Airwallex webhook deliveries — admins only. */
export const listWebhookDeliveries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);

    const { data, error } = await context.supabase
      .from("payment_webhook_events")
      .select(
        "id, provider, event_type, verification_result, failure_reason, intent_id, order_id, provider_status, outcome, processed_at, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);

    return { deliveries: data ?? [] };
  });

/**
 * Safe manual replay: re-reads the payment intent from Airwallex for a stored,
 * previously verified event and re-applies the resulting enrollment state.
 * It never trusts the stored payload and cannot create new events.
 */
export const reprocessWebhookEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { eventId: string }) => {
    if (!input?.eventId || typeof input.eventId !== "string") throw new Error("Event ID is required");
    return { eventId: input.eventId.trim().slice(0, 200) };
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);

    const { data: event, error } = await context.supabase
      .from("payment_webhook_events")
      .select("id, verification_result, intent_id, order_id")
      .eq("id", data.eventId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!event) throw new Error("Event not found");
    if (event.verification_result !== "verified") throw new Error("Event never passed signature verification");
    if (!event.intent_id || !event.order_id) throw new Error("Event has no payment intent to reprocess");

    const { applyIntentToEnrollment, markWebhookProcessed } = await import("@/lib/airwallex-webhook.server");
    const result = await applyIntentToEnrollment({
      intentId: event.intent_id,
      orderId: event.order_id,
    });
    await markWebhookProcessed(event.id, result);

    return { eventId: event.id, ...result };
  });
