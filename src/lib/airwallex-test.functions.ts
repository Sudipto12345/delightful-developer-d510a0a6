import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPaymentIntent } from "./airwallex.server";

/**
 * Diagnostic tool to check Airwallex connection and configuration.
 * Accessible to authenticated users.
 */
export const testAirwallexConnection = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({}).parse(data))
  .handler(async ({ context }) => {
    // Basic auth check
    const ctx = context as any;
    const userId = ctx.userId;
    if (!userId) throw new Error("Unauthorized");

    const results: Record<string, any> = {
      timestamp: new Date().toISOString(),
      env: {
        CLIENT_ID: !!process.env["AIRWALLEX_CLIENT_ID"],
        API_KEY: !!process.env["AIRWALLEX_API_KEY"],
        WEBHOOK_SECRET: !!process.env["AIRWALLEX_WEBHOOK_SECRET"],
        QUOTAGUARDSTATIC_URL: !!process.env["QUOTAGUARDSTATIC_URL"],
        QUOTAGUARD_URL: !!process.env["QUOTAGUARD_URL"],
      },
      checks: [] as any[],
    };

    try {
      // 1. Connectivity check
      try {
        // Attempting to fetch a non-existent intent to test connectivity + auth
        await getPaymentIntent("test_connectivity_intent_id");
      } catch (e: any) {
        // A 404 means we CONNECTED and AUTHENTICATED, but the object wasn't found (expected).
        // A 401 means credentials are wrong.
        // A timeout or "Static-IP proxy refused CONNECT" means proxy/network issue.
        const isAuthError = e.message.includes("401");
        const isNotFoundError = e.message.includes("404");
        
        results["checks"].push({ 
          name: "Airwallex API Connectivity", 
          status: (isAuthError || isNotFoundError) ? "connected" : "failed",
          details: e.message 
        });
      }

      return results;
    } catch (e: any) {
      return { ...results, error: e.message };
    }
  });
