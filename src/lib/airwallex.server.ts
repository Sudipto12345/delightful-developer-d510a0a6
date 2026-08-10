// Airwallex REST helpers (server-only).
const BASE = "https://api.airwallex.com";

async function getToken(): Promise<string> {
  const clientId = process.env["AIRWALLEX_CLIENT_ID"];
  const apiKey = process.env["AIRWALLEX_API_KEY"];
  if (!clientId || !apiKey) throw new Error("Airwallex credentials are not configured");

  const res = await fetch(`${BASE}/api/v1/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": clientId,
      "x-api-key": apiKey,
    },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Airwallex auth failed [${res.status}]: ${body}`);
  return (JSON.parse(body) as { token: string }).token;
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
  const res = await fetch(`${BASE}/api/v1/pa/payment_intents/create`, {
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

export async function getPaymentIntent(id: string): Promise<{ status: string; merchant_order_id?: string; amount?: number }> {
  const token = await getToken();
  const res = await fetch(`${BASE}/api/v1/pa/payment_intents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Airwallex intent lookup failed [${res.status}]: ${body}`);
  return JSON.parse(body) as { status: string; merchant_order_id?: string };
}
