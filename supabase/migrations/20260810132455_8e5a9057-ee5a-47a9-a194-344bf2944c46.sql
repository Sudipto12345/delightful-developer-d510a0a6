CREATE TABLE IF NOT EXISTS public.payment_webhook_events (
  id text PRIMARY KEY,
  provider text NOT NULL DEFAULT 'airwallex',
  event_type text NOT NULL DEFAULT 'unknown',
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.payment_webhook_events TO service_role;

ALTER TABLE public.payment_webhook_events ENABLE ROW LEVEL SECURITY;