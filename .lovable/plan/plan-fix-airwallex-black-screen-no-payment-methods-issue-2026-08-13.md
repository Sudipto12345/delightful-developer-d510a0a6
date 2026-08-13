# Plan: Fix Airwallex "Black Screen/No Payment Methods" Issue

The user reports that the Airwallex checkout page appears black or without payment methods. This usually indicates a configuration mismatch (Client ID/API Key), a network/proxy failure when communicating with Airwallex, or a lack of explicit payment method parameters in the checkout URL.

## Proposed Changes

### 1. Hardening Airwallex Integration
- **Fix Checkout URL**: Explicitly add `payment_methods=card,googlepay,applepay` to the Airwallex hosted checkout URL in `src/lib/airwallex.server.ts` to ensure the UI renders methods correctly.
- **Improved Proxy Selection**: Ensure the code correctly prioritizes `QUOTAGUARDSTATIC_URL` for fixed-IP egress.

### 2. Diagnostics & Debugging
- **Diagnostic Endpoint**: Create `/api/public/airwallex-test` to allow server-side connectivity checks (testing proxy and credentials without a full checkout flow).
- **Test Function**: Update `src/lib/airwallex-test.functions.ts` to provide a robust check for environment variables and API connectivity.

### 3. Instruction for User (Airwallex Dashboard)
- **Webhook Check**: Verify if the webhook `https://elevatehubltd.com/api/public/webhooks/airwallex` is registered for the events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.cancelled`.
- **IP Whitelisting**: Ensure the static IP provided by QuotaGuard (found in the QuotaGuard dashboard) is whitelisted in the Airwallex Developer settings under "IP Whitelist".

## Technical Details
- **Static IP Proxy**: Uses `cloudflare:sockets` to tunnel HTTPS through the QuotaGuard forward proxy.
- **Server Functions**: All Airwallex calls are server-side to prevent leaking secrets and to comply with IP whitelisting.
- **Environment Variables**: Requires `AIRWALLEX_CLIENT_ID`, `AIRWALLEX_API_KEY`, `AIRWALLEX_WEBHOOK_SECRET`, and `QUOTAGUARDSTATIC_URL`.
