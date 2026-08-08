import { Link } from "@tanstack/react-router";
import { Clock, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getCourseImage } from "@/data/courseImages";
import { type Course } from "@/data/courses";
import { useCatalog } from "@/hooks/useCatalog";


const levelLabel: Record<Course["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function CourseCard({ course }: { course: Course }) {
  const { instructors } = useCatalog();
  const instructor = instructors.find(
    (i) => i.id === course.instructorId || i.slug === course.instructorId,
  );

  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-soft/60 hover:glow"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-cobalt">
        <img
          src={getCourseImage(course.slug, course.imageKey)}
          alt={`${course.title} course cover`}
          loading="lazy"
          width={1024}
          height={640}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
        <div className="absolute inset-0 grid-noise opacity-20" />
        <div className="absolute -right-6 -bottom-8 h-28 w-28 rounded-full bg-spark opacity-40 blur-2xl transition-transform duration-500 group-hover:scale-125" />

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
            {course.rating.toLocaleString("en-US")} ({course.reviewsCount.toLocaleString("en-US")})
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {course.students.toLocaleString("en-US")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.durationHours.toLocaleString("en-US")} hrs
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Mentor: {instructor?.name}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-accent">${course.price.toLocaleString("en-US")}</span>
            {course.oldPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${course.oldPrice.toLocaleString("en-US")}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-primary-soft group-hover:underline">
            Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
