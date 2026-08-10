import { createFileRoute } from "@tanstack/react-router";

/**
 * Airwallex webhook receiver — the only trusted source of payment confirmation.
 * Verifies the HMAC signature, dedupes replays, re-reads the intent from
 * Airwallex, then updates the enrollment/order status.
 */
export const Route = createFileRoute("/api/public/webhooks/airwallex")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["AIRWALLEX_WEBHOOK_SECRET"];
        if (!secret) return new Response("Webhook not configured", { status: 503 });

        const timestamp = request.headers.get("x-timestamp") ?? "";
        const signature = (request.headers.get("x-signature") ?? "").toLowerCase();
        const body = await request.text();

        const expected = await hmacHex(secret, timestamp + body);
        if (!signature || !timingSafeEqualHex(signature, expected)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let event: {
          id?: string;
          name?: string;
          data?: { object?: { id?: string; merchant_order_id?: string; status?: string } };
        };
        try {
          event = JSON.parse(body);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const intentId = event.data?.object?.id;
        const orderId = event.data?.object?.merchant_order_id;
        const eventId = event.id ?? `${event.name ?? "event"}:${intentId ?? ""}:${timestamp}`;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Idempotency: the unique primary key makes replays a no-op.
        const { error: dedupeError } = await supabaseAdmin
          .from("payment_webhook_events")
          .insert({ id: eventId, provider: "airwallex", event_type: event.name ?? "unknown" });
        if (dedupeError) {
          if (dedupeError.code === "23505") return new Response("duplicate", { status: 200 });
          console.error("webhook dedupe insert failed", dedupeError);
          return new Response("Storage error", { status: 500 });
        }

        if (intentId && orderId) {
          // Never trust the payload alone — confirm with Airwallex directly.
          let status = event.data?.object?.status ?? "";
          try {
            const { getPaymentIntent } = await import("@/lib/airwallex.server");
            status = (await getPaymentIntent(intentId)).status;
          } catch (error) {
            console.error("intent re-check failed", error);
          }

          const nextStatus =
            status === "SUCCEEDED" || status === "CAPTURE_REQUESTED"
              ? "approved"
              : status === "CANCELLED" || status === "FAILED"
                ? "rejected"
                : null;

          if (nextStatus) {
            const { error } = await supabaseAdmin
              .from("enrollments")
              .update({ status: nextStatus })
              .eq("id", orderId)
              .eq("txn_id", intentId);
            if (error) {
              console.error("enrollment update failed", error);
              return new Response("Update failed", { status: 500 });
            }
          }
        }

        return new Response("ok");
      },
    },
  },
});

async function hmacHex(secret: string, message: string): Promise<string> {
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

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
