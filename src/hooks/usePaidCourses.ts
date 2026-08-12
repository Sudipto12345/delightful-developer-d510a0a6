import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { useAuth } from "@/hooks/useAuth";
import { listMyPaidCourses } from "@/lib/payments.functions";

/**
 * Server-verified course entitlements. Enrollment state is never trusted from
 * local storage — it is read from the `enrollments` table for the signed-in
 * user on every load.
 */
export function usePaidCourses() {
  const { user } = useAuth();
  const fetchPaid = useServerFn(listMyPaidCourses);

  const query = useQuery({
    queryKey: ["paid-courses", user?.id ?? "anon"],
    queryFn: () => fetchPaid(),
    enabled: Boolean(user),
    staleTime: 30_000,
  });

  return {
    slugs: new Set<string>(query.data?.slugs ?? []),
    loading: query.isPending && Boolean(user),
    refetch: query.refetch,
  };
}
