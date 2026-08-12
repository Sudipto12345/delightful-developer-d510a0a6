
-- 1. Replace has_role() usage inside policies with inline, non-recursive checks.
DROP POLICY IF EXISTS profiles_select_own ON public.profiles;
CREATE POLICY profiles_select_own ON public.profiles FOR SELECT TO authenticated
USING (id = auth.uid() OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE TO authenticated
USING (id = auth.uid() OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (id = auth.uid() OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

-- user_roles must stay self-referential only, to avoid recursive policy evaluation.
DROP POLICY IF EXISTS user_roles_select_own ON public.user_roles;
CREATE POLICY user_roles_select_own ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS enrollments_select ON public.enrollments;
CREATE POLICY enrollments_select ON public.enrollments FOR SELECT TO authenticated
USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS enrollments_update ON public.enrollments;
CREATE POLICY enrollments_update ON public.enrollments FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS enrollments_delete_admin ON public.enrollments;
CREATE POLICY enrollments_delete_admin ON public.enrollments FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS progress_all_own ON public.lesson_progress;
CREATE POLICY progress_all_own ON public.lesson_progress FOR ALL TO authenticated
USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (user_id = auth.uid());

-- 2. Signed-in users may no longer execute the SECURITY DEFINER helper.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated, anon, public;

-- 3. payment_webhook_events: backend-only, with an explicit deny for app clients.
REVOKE ALL ON TABLE public.payment_webhook_events FROM anon, authenticated;
GRANT ALL ON TABLE public.payment_webhook_events TO service_role;
ALTER TABLE public.payment_webhook_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS payment_webhook_events_no_client_access ON public.payment_webhook_events;
CREATE POLICY payment_webhook_events_no_client_access ON public.payment_webhook_events
FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
