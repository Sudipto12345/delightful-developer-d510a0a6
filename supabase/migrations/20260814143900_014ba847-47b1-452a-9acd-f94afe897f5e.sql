ALTER TABLE public.payment_webhook_events
  ADD COLUMN IF NOT EXISTS verification_result text NOT NULL DEFAULT 'unknown',
  ADD COLUMN IF NOT EXISTS failure_reason text,
  ADD COLUMN IF NOT EXISTS intent_id text,
  ADD COLUMN IF NOT EXISTS order_id text,
  ADD COLUMN IF NOT EXISTS provider_status text,
  ADD COLUMN IF NOT EXISTS outcome text,
  ADD COLUMN IF NOT EXISTS processed_at timestamptz;

CREATE INDEX IF NOT EXISTS payment_webhook_events_created_at_idx
  ON public.payment_webhook_events (created_at DESC);

GRANT SELECT ON public.payment_webhook_events TO authenticated;
GRANT ALL ON public.payment_webhook_events TO service_role;

DROP POLICY IF EXISTS payment_webhook_events_no_client_access ON public.payment_webhook_events;

CREATE POLICY payment_webhook_events_admin_read
  ON public.payment_webhook_events
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

CREATE POLICY payment_webhook_events_no_client_writes
  ON public.payment_webhook_events
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);