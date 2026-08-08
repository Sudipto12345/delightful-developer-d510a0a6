import { Link } from "@tanstack/react-router";
import { Clock, Star, Users } from "lucide-react";

import { getCourseImage } from "@/data/courseImages";
import { type Course } from "@/data/courses";
import { useCatalog } from "@/hooks/useCatalog";

const levelLabel: Record<Course["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function CourseCard({
  course,
  featured = false,
}: {
  course: Course;
  featured?: boolean;
}) {
  const { instructors } = useCatalog();
  const instructor = instructors.find(
    (i) => i.id === course.instructorId || i.slug === course.instructorId,
  );

  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-500 hover:border-accent/50 hover:soft-shadow"
    >
      <div
        className={`relative overflow-hidden bg-surface-2 ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        <img
          src={getCourseImage(course.slug, course.imageKey, course.imageUrl)}
          alt={`${course.title} — taught by ${instructor?.name ?? "an ElevateHub mentor"}`}
          loading="lazy"
          width={1024}
          height={768}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        <div className="absolute top-3 left-0 flex flex-col items-start gap-1.5">
          {course.badge && (
            <span className="rule-badge text-accent">{course.badge}</span>
          )}
          <span className="rule-badge text-foreground/80">{levelLabel[course.level]}</span>
        </div>

        <h3
          className={`absolute right-4 bottom-3 left-4 font-display leading-tight font-bold text-foreground drop-shadow ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {course.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <p className={`text-sm text-muted-foreground ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
          {course.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {course.rating.toLocaleString("en-US")} ({course.reviewsCount.toLocaleString("en-US")})
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {course.students.toLocaleString("en-US")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.durationHours.toLocaleString("en-US")} hrs
          </span>
        </div>

        <div className="mt-auto border-t border-border pt-3">
          <div className="flex items-end justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              {instructor?.avatarUrl ? (
                <img
                  src={instructor.avatarUrl}
                  alt={instructor.name}
                  loading="lazy"
                  className="h-8 w-8 shrink-0 rounded-sm object-cover"
                />
              ) : null}
              <span className="truncate text-xs text-muted-foreground">{instructor?.name}</span>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-display text-lg font-bold">
                ${course.price.toLocaleString("en-US")}
              </span>
              {course.oldPrice && (
                <span className="ml-2 text-xs text-muted-foreground line-through">
                  ${course.oldPrice.toLocaleString("en-US")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CourseCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
      <div className={`skeleton w-full ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`} />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="skeleton h-4 w-4/5 rounded-sm" />
        <div className="skeleton h-4 w-3/5 rounded-sm" />
        <div className="skeleton mt-auto h-8 w-full rounded-sm" />
      </div>
    </div>
  );
}
