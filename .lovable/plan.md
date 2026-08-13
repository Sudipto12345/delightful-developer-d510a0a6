# Plan - Airwallex Integration & UI Polish

The user wants to finalize the Airwallex integration without using QuotaGuard (free option) while maintaining security, and also resolve a persistent UI artifact (invisible character U+2063).

## Proposed Changes

### Backend & Payments
- **Airwallex Optimization**: Ensure the direct `fetch` implementation in `src/lib/airwallex.server.ts` is robust. Since the user wants a "free option," we will stick with the direct Cloudflare-to-Airwallex path.
- **Diagnostic Tooling**: Keep the `/api/public/airwallex-test` endpoint active to help the user identify the Cloudflare IP for any manual whitelisting requests to Airwallex support.
- **Payment Flow Verification**: Ensure the `hostedUrl` generated for checkout includes all necessary parameters to prevent the "blank screen" issue.

### UI & Branding
- **Invisible Character Cleanup**: Although automated searches failed to find `\u2063`, I will perform a manual review of `src/routes/index.tsx` and `src/components/layout/SiteHeader.tsx` to ensure no zero-width or invisible separators are present in the JSX or data strings.
- **Logo Loader**: Verify the `LogoLoader` component is working correctly as the entry point for the "Loading Animation" requested by the user.

## Technical Details
- **Airwallex**: Using standard `fetch` in the `awFetch` helper.
- **Security**: All API keys are kept server-side in `src/lib/airwallex.server.ts` and accessed via `process.env`.
- **UI**: Using `framer-motion` for smooth transitions and the brand splash screen.

## User Instructions
1. **Airwallex IP Whitelisting**: The user MUST contact Airwallex support or use their dashboard to disable IP whitelisting for their API keys, as Cloudflare Workers use a dynamic IP range.
2. **Webhook**: Ensure the webhook URL `https://elevatehubltd.com/api/public/webhooks/airwallex` is configured in the Airwallex dashboard with the provided secret.
