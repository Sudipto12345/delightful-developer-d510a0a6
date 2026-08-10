import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/webhooks/airwallex")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["AIRWALLEX_WEBHOOK_SECRET"];
        if (!secret) return new Response("Webhook not configured", { status: 503 });

        const timestamp = request.headers.get("x-timestamp") ?? "";
        const signature = request.headers.get("x-signature") ?? "";
        const body = await request.text();

        const expected = createHmac("sha256", secret).update(timestamp + body).digest("hex");
        const sig = Buffer.from(signature);
        const exp = Buffer.from(expected);
        if (sig.length !== exp.length || !timingSafeEqual(sig, exp)) {
          return new Response("Invalid signature", { status: 401 });
        }

        const event = JSON.parse(body) as {
          name?: string;
          data?: { object?: { id?: string; merchant_order_id?: string; status?: string } };
        };
        const intent = event.data?.object;
        const succeeded =
          event.name === "payment_intent.succeeded" || intent?.status === "SUCCEEDED";

        if (succeeded && intent?.merchant_order_id) {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          await supabaseAdmin
            .from("enrollments")
            .update({ status: "approved" })
            .eq("id", intent.merchant_order_id);
        }

        return new Response("ok");
      },
    },
  },
});
