import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Completed lesson ids for the signed-in learner, keyed by course slug. */
export const listMyProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("lesson_progress")
      .select("course_slug, lesson_id")
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);

    const byCourse: Record<string, string[]> = {};
    for (const row of data ?? []) {
      (byCourse[row.course_slug] ??= []).push(row.lesson_id);
    }
    return { byCourse };
  });

/**
 * Marks/unmarks a lesson complete. Only lessons of courses the learner has
 * actually paid for (approved enrollment) can be recorded — completion state
 * is never trusted from the browser.
 */
export const toggleLessonProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { courseSlug: string; lessonId: string; completed: boolean }) => {
    if (!input?.courseSlug || typeof input.courseSlug !== "string") throw new Error("Course is required");
    if (!input?.lessonId || typeof input.lessonId !== "string") throw new Error("Lesson is required");
    return {
      courseSlug: input.courseSlug.slice(0, 120),
      lessonId: input.lessonId.slice(0, 64),
      completed: Boolean(input.completed),
    };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: entitled, error: entError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("course_slug", data.courseSlug)
      .eq("status", "approved")
      .limit(1)
      .maybeSingle();
    if (entError) throw new Error(entError.message);
    if (!entitled) throw new Error("You do not have access to this course");

    if (data.completed) {
      const { error } = await supabase.from("lesson_progress").insert({
        user_id: userId,
        course_slug: data.courseSlug,
        lesson_id: data.lessonId,
      });
      if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", userId)
        .eq("course_slug", data.courseSlug)
        .eq("lesson_id", data.lessonId);
      if (error) throw new Error(error.message);
    }

    return { ok: true };
  });
