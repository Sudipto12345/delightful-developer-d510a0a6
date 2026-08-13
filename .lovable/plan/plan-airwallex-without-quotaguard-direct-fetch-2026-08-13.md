# Plan: Airwallex without QuotaGuard (Direct Fetch)

The user wants to avoid QuotaGuard (a paid service) and use the native "free" capabilities of Lovable Cloud (Cloudflare Workers). To do this, we will revert the Airwallex integration to use direct `fetch` calls.

**Important Security/Operational Note:** Airwallex usually requires IP whitelisting for API requests. Without a static IP proxy like QuotaGuard, requests will come from Cloudflare's dynamic IP range. The user will need to either whitelist Cloudflare's IP ranges in the Airwallex dashboard (if permitted) or contact Airwallex support to request disabling IP verification for their account.

## Proposed Changes

### 1. Simplify Airwallex API Calls
- Modify `src/lib/airwallex.server.ts` to use standard `fetch` instead of `awFetch` (which currently tunnels through the proxy).
- Keep the `awFetch` function but update it to perform a direct `fetch` by default.

### 2. Update Diagnostics
- Update `src/lib/airwallex-test.functions.ts` to check if direct connectivity works and report the current outgoing IP (via a service like `icanhazip.com`) so the user knows what IP to try whitelisting if needed.

### 3. Documentation for User
- Provide instructions on how to handle IP whitelisting in the Airwallex dashboard without a proxy.
- Mention that this is "free" but requires manual configuration in the Airwallex account settings.

## Technical Details
- **Direct Fetch**: Uses the native `fetch` API available in the TanStack Start / Cloudflare environment.
- **Environment Variables**: `QUOTAGUARDSTATIC_URL` will no longer be required.
