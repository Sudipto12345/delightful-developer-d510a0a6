// Airwallex REST helpers (server-only).
//
// Every Airwallex request is issued from server code and, when
// QUOTAGUARDSTATIC_URL is configured, is routed through the QuotaGuard Static
// forward proxy so traffic leaves from our fixed, IP-whitelisted egress address.
// Credentials (AIRWALLEX_CLIENT_ID / AIRWALLEX_API_KEY / AIRWALLEX_WEBHOOK_SECRET)
// are read inside handlers and never reach the browser.
const BASE = "https://api.airwallex.com";

type TokenCache = { token: string; expiresAt: number };
let cachedToken: TokenCache | undefined;

/** Proxy-aware fetch: tunnels the Airwallex call through the static-IP proxy. */
async function awFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const target = `${BASE}${path}`;
  const proxyUrl = process.env["QUOTAGUARDSTATIC_URL"];
  if (!proxyUrl) return await fetch(target, init);

  const { proxyFetch } = await import("./proxy-fetch.server");
  return await proxyFetch(target, init, proxyUrl);
}


async function getToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) return cachedToken.token;

  const clientId = process.env["AIRWALLEX_CLIENT_ID"];
  const apiKey = process.env["AIRWALLEX_API_KEY"];
  if (!clientId || !apiKey) throw new Error("Airwallex credentials are not configured");

  const res = await awFetch("/api/v1/authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": clientId,
      "x-api-key": apiKey,
    },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Airwallex auth failed [${res.status}]: ${body}`);
  const parsed = JSON.parse(body) as { token: string; expires_at?: string };
  const parsedExpiry = parsed.expires_at ? Date.parse(parsed.expires_at) : NaN;
  cachedToken = {
    token: parsed.token,
    expiresAt: Number.isNaN(parsedExpiry) ? now + 25 * 60_000 : parsedExpiry,
  };
  return cachedToken.token;
}

export type CreatedIntent = { id: string; clientSecret: string; hostedUrl: string };

export async function createPaymentIntent(args: {
  amount: number;
  currency: string;
  merchantOrderId: string;
  descriptor: string;
  returnUrl: string;
  email?: string;
}): Promise<CreatedIntent> {
  const token = await getToken();
  const res = await awFetch("/api/v1/pa/payment_intents/create", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      request_id: `${args.merchantOrderId}-${Date.now()}`,
      amount: args.amount,
      currency: args.currency,
      merchant_order_id: args.merchantOrderId,
      descriptor: args.descriptor.slice(0, 32),
      return_url: args.returnUrl,
      order: { products: [{ name: args.descriptor.slice(0, 120), quantity: 1 }] },
    }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Airwallex intent failed [${res.status}]: ${body}`);
  const intent = JSON.parse(body) as { id: string; client_secret: string };

  const url = new URL("https://checkout.airwallex.com/#/standalone/checkout");
  url.searchParams.set("intent_id", intent.id);
  url.searchParams.set("client_secret", intent.client_secret);
  url.searchParams.set("currency", args.currency);
  url.searchParams.set("mode", "payment");
  url.searchParams.set("successUrl", args.returnUrl);
  url.searchParams.set("failUrl", args.returnUrl);
  if (args.email) url.searchParams.set("email", args.email);

  return { id: intent.id, clientSecret: intent.client_secret, hostedUrl: url.toString() };
}

export async function getPaymentIntent(
  id: string,
): Promise<{ id: string; status: string; merchant_order_id?: string; amount?: number }> {
  const token = await getToken();
  const res = await awFetch(`/api/v1/pa/payment_intents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Airwallex intent lookup failed [${res.status}]: ${body}`);
  return JSON.parse(body) as { id: string; status: string; merchant_order_id?: string; amount?: number };
}
