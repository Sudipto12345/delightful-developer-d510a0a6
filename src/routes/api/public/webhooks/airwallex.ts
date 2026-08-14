import { createFileRoute } from "@tanstack/react-router";

import {
  applyIntentToEnrollment,
  hmacHex,
  logWebhookDelivery,
  markWebhookProcessed,
  timingSafeEqualHex,
  type VerificationResult,
} from "@/lib/airwallex-webhook.server";

/** Reject deliveries older than this to blunt replay attempts. */
const TIMESTAMP_TOLERANCE_MS = 15 * 60 * 1000;
const HEX_64 = /^[0-9a-f]{64}$/;
const DIGITS = /^\d{10,20}$/;

/**
 * Airwallex webhook receiver — the only trusted source of payment confirmation.
 * Validates required headers, verifies the HMAC signature, logs every delivery,
 * dedupes replays, re-reads the intent from Airwallex, then updates enrollment.
 */
export const Route = createFileRoute("/api/public/webhooks/airwallex")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rejectionId = () => `rejected:${crypto.randomUUID()}`;

        const reject = async (
          status: number,
          verification: VerificationResult,
          reason: string,
          eventType = "unknown",
        ) => {
          try {
            await logWebhookDelivery({
              id: rejectionId(),
              eventType,
              verificationResult: verification,
              failureReason: reason,
              outcome: "rejected",
            });
          } catch (error) {
            console.error("failed to log rejected webhook", error);
          }
          return new Response(reason, { status });
        };

        const secret = process.env["AIRWALLEX_WEBHOOK_SECRET"];
        if (!secret) {
          console.error("airwallex webhook secret missing");
          return new Response("Webhook not configured", { status: 503 });
        }

        const rawTimestamp = request.headers.get("x-timestamp");
        const rawSignature = request.headers.get("x-signature");

        if (!rawTimestamp || !rawSignature) {
          return reject(
            400,
            "missing_headers",
            `Missing required header(s): ${[!rawSignature && "x-signature", !rawTimestamp && "x-timestamp"]
              .filter(Boolean)
              .join(", ")}`,
          );
        }

        const timestamp = rawTimestamp.trim();
        const signature = rawSignature.trim().toLowerCase();

        if (!DIGITS.test(timestamp)) {
          return reject(400, "malformed_headers", "Malformed x-timestamp header");
        }
        if (!HEX_64.test(signature)) {
          return reject(400, "malformed_headers", "Malformed x-signature header");
        }

        const tsMs = Number(timestamp.length > 13 ? timestamp.slice(0, 13) : timestamp);
        const normalisedMs = timestamp.length <= 10 ? tsMs * 1000 : tsMs;
        if (!Number.isFinite(normalisedMs) || Math.abs(Date.now() - normalisedMs) > TIMESTAMP_TOLERANCE_MS) {
          return reject(400, "stale_timestamp", "Timestamp outside allowed window");
        }

        const contentType = request.headers.get("content-type") ?? "";
        if (contentType && !contentType.includes("json")) {
          return reject(415, "malformed_headers", "Unsupported content type");
        }

        const body = await request.text();
        if (!body || body.length > 1_000_000) {
          return reject(400, "malformed_headers", "Empty or oversized body");
        }

        const expected = await hmacHex(secret, timestamp + body);
        if (!timingSafeEqualHex(signature, expected)) {
          return reject(401, "invalid_signature", "Invalid signature");
        }

        let event: {
          id?: string;
          name?: string;
          data?: { object?: { id?: string; merchant_order_id?: string; status?: string } };
        };
        try {
          event = JSON.parse(body);
        } catch {
          return reject(400, "invalid_json", "Invalid JSON");
        }

        const intentId = event.data?.object?.id ?? null;
        const orderId = event.data?.object?.merchant_order_id ?? null;
        const eventType = event.name ?? "unknown";
        const eventId = event.id ?? `${eventType}:${intentId ?? ""}:${timestamp}`;

        // Idempotency: the unique primary key makes replays a no-op.
        const { duplicate } = await logWebhookDelivery({
          id: eventId,
          eventType,
          verificationResult: "verified",
          intentId,
          orderId,
          providerStatus: event.data?.object?.status ?? null,
          outcome: "received",
          payload: event,
        });
        if (duplicate) return new Response("duplicate", { status: 200 });

        if (intentId && orderId) {
          const result = await applyIntentToEnrollment({
            intentId,
            orderId,
            ...(event.data?.object?.status ? { fallbackStatus: event.data.object.status } : {}),
          });
          await markWebhookProcessed(eventId, result);
        } else {
          await markWebhookProcessed(eventId, { outcome: "ignored_no_intent" });
        }

        return new Response("ok");
      },
    },
  },
});
