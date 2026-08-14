import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { useAuth } from "@/hooks/useAuth";
import { listMyProgress, toggleLessonProgress } from "@/lib/progress.functions";

/**
 * Server-verified lesson completion. Progress and certificate eligibility are
 * read from the `lesson_progress` table, never from browser storage.
 */
export function useLessonProgress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fetchProgress = useServerFn(listMyProgress);
  const toggle = useServerFn(toggleLessonProgress);

  const query = useQuery({
    queryKey: ["lesson-progress", user?.id ?? "anon"],
    queryFn: () => fetchProgress(),
    enabled: Boolean(user),
    staleTime: 15_000,
  });

  const mutation = useMutation({
    mutationFn: (vars: { courseSlug: string; lessonId: string; completed: boolean }) =>
      toggle({ data: vars }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["lesson-progress"] });
    },
  });

  const byCourse = query.data?.byCourse ?? {};

  return {
    completedLessons: (courseSlug: string) => byCourse[courseSlug] ?? [],
    percent: (courseSlug: string, totalLessons: number) =>
      totalLessons ? Math.round(((byCourse[courseSlug] ?? []).length / totalLessons) * 100) : 0,
    toggleLesson: (courseSlug: string, lessonId: string, completed: boolean) =>
      mutation.mutate({ courseSlug, lessonId, completed }),
    loading: query.isPending && Boolean(user),
  };
}
