import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPaymentIntent } from "./airwallex.server";

/**
 * Diagnostic tool to check Airwallex connection and configuration.
 * Only accessible by authenticated users.
 */
export const testAirwallexConnection = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({}).parse(data))
  .handler(async ({ context }) => {
    // Basic role check
    const ctx = context as unknown as { userId?: string };
    const userId = ctx.userId;
    if (!userId) throw new Error("Unauthorized");

    const results: Record<string, any> = {
      timestamp: new Date().toISOString(),
      env: {
        CLIENT_ID: !!process.env["AIRWALLEX_CLIENT_ID"],
        API_KEY: !!process.env["AIRWALLEX_API_KEY"],
        WEBHOOK_SECRET: !!process.env["AIRWALLEX_WEBHOOK_SECRET"],
        QUOTAGUARD: !!process.env["QUOTAGUARDSTATIC_URL"],
      },
      checks: [] as any[],
    };

    try {
      results["checks"].push({ name: "Import", status: "ok" });

      // connectivity check
      try {
        await getPaymentIntent("test_id");
      } catch (e: any) {
        const isAuthError = e.message.includes("401");
        const isNotFoundError = e.message.includes("404");
        
        results["checks"].push({ 
          name: "API Connectivity", 
          status: (isAuthError || isNotFoundError) ? "connected" : "failed",
          details: e.message 
        });
      }

      return results;
    } catch (e: any) {
      return { ...results, error: e.message };
    }
  });
