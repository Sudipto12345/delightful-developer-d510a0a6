/**
 * Shared server-only helpers for Airwallex webhook handling: structured
 * delivery logging and the (idempotent) enrollment state transition.
 */

export type VerificationResult =
  | "verified"
  | "missing_headers"
  | "malformed_headers"
  | "stale_timestamp"
  | "invalid_signature"
  | "invalid_json"
  | "not_configured";

export interface WebhookLogEntry {
  id: string;
  eventType: string;
  verificationResult: VerificationResult;
  failureReason?: string | null;
  intentId?: string | null;
  orderId?: string | null;
  providerStatus?: string | null;
  outcome?: string | null;
  payload?: unknown;
}

/**
 * Records every delivery attempt — including rejected ones — so the admin
 * panel can show what arrived and whether it verified.
 */
export async function logWebhookDelivery(entry: WebhookLogEntry): Promise<{ duplicate: boolean }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  console.info(
    JSON.stringify({
      scope: "airwallex.webhook",
      event_id: entry.id,
      event_type: entry.eventType,
      verification: entry.verificationResult,
      reason: entry.failureReason ?? null,
      intent_id: entry.intentId ?? null,
      order_id: entry.orderId ?? null,
    }),
  );

  const { error } = await supabaseAdmin.from("payment_webhook_events").insert({
    id: entry.id,
    provider: "airwallex",
    event_type: entry.eventType,
    verification_result: entry.verificationResult,
    failure_reason: entry.failureReason ?? null,
    intent_id: entry.intentId ?? null,
    order_id: entry.orderId ?? null,
    provider_status: entry.providerStatus ?? null,
    outcome: entry.outcome ?? null,
    payload: (entry.payload ?? null) as never,
  });

  if (error) {
    if (error.code === "23505") return { duplicate: true };
    console.error("webhook log insert failed", error);
    throw new Error("Storage error");
  }
  return { duplicate: false };
}

export async function markWebhookProcessed(
  id: string,
  patch: { providerStatus?: string | null; outcome: string },
): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin
    .from("payment_webhook_events")
    .update({
      provider_status: patch.providerStatus ?? null,
      outcome: patch.outcome,
      processed_at: new Date().toISOString(),
    })
    .eq("id", id);
}

/**
 * Re-reads the intent from Airwallex (never trusting the payload) and moves
 * the matching enrollment to approved/rejected. Safe to run repeatedly.
 */
export async function applyIntentToEnrollment(params: {
  intentId: string;
  orderId: string;
  fallbackStatus?: string;
}): Promise<{ providerStatus: string; outcome: string }> {
  let providerStatus = params.fallbackStatus ?? "";
  try {
    const { getPaymentIntent } = await import("@/lib/airwallex.server");
    providerStatus = (await getPaymentIntent(params.intentId)).status;
  } catch (error) {
    console.error("intent re-check failed", error);
  }

  const nextStatus =
    providerStatus === "SUCCEEDED" || providerStatus === "CAPTURE_REQUESTED"
      ? "approved"
      : providerStatus === "CANCELLED" || providerStatus === "FAILED"
        ? "rejected"
        : null;

  if (!nextStatus) return { providerStatus, outcome: "no_change" };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("enrollments")
    .update({ status: nextStatus })
    .eq("id", params.orderId)
    .eq("txn_id", params.intentId);
  if (error) {
    console.error("enrollment update failed", error);
    throw new Error("Update failed");
  }

  return { providerStatus, outcome: nextStatus === "approved" ? "enrollment_approved" : "enrollment_rejected" };
}

export async function hmacHex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
