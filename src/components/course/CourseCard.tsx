import { Link } from "@tanstack/react-router";
import { Clock, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getInstructor, type Course } from "@/data/courses";
import { bn, taka } from "@/lib/store";

const levelLabel: Record<Course["level"], string> = {
  beginner: "বিগিনার",
  intermediate: "ইন্টারমিডিয়েট",
  advanced: "অ্যাডভান্সড",
};

export function CourseCard({ course }: { course: Course }) {
  const instructor = getInstructor(course.instructorId);
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-soft/60 hover:glow"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-cobalt">
        <div className="absolute inset-0 grid-noise opacity-30" />
        <div className="absolute -right-6 -bottom-8 h-28 w-28 rounded-full bg-spark opacity-50 blur-2xl transition-transform duration-500 group-hover:scale-125" />
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-center gap-2">
            {course.badge && (
              <Badge className="bg-accent text-accent-foreground">{course.badge}</Badge>
            )}
            <Badge variant="secondary" className="bg-background/40 backdrop-blur">
              {levelLabel[course.level]}
            </Badge>
          </div>
          <p className="text-lg leading-snug font-bold text-white drop-shadow">{course.title}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.subtitle}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {course.rating.toLocaleString("bn-BD")} ({bn(course.reviewsCount)})
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {bn(course.students)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {bn(course.durationHours)} ঘণ্টা
          </span>
        </div>
        <p className="text-xs text-muted-foreground">মেন্টর: {instructor?.name}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-accent">{taka(course.price)}</span>
            {course.oldPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {taka(course.oldPrice)}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-primary-soft group-hover:underline">
            বিস্তারিত →
          </span>
        </div>
      </div>
    </Link>
  );
}
