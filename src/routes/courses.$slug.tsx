import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  Clock,
  Globe,
  Heart,
  PlayCircle,
  Signal,
  Star,
  Users,
} from "lucide-react";

import { CourseCard } from "@/components/course/CourseCard";
import { PublicShell } from "@/components/layout/PublicShell";
import { Reveal } from "@/components/motion/Motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCourseImage } from "@/data/courseImages";
import { getCourseVideo } from "@/data/courseMedia";

import type { Course } from "@/data/courses";

import { useCatalog } from "@/hooks/useCatalog";
import { useStore } from "@/lib/store";

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => {
    const name = titleCase(params.slug);
    const description = `${name} at ElevateHub Ltd — mentor-led lessons, graded projects, written feedback, and a verified certificate.`;
    return {
      meta: [
        { title: `${name} — ElevateHub Ltd` },
        { name: "description", content: description },
        { property: "og:title", content: name },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/courses/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/courses/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name,
            description,
            provider: { "@type": "Organization", name: "ElevateHub Ltd" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PublicShell>
      <div className="container-eh py-24 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </div>
    </PublicShell>
  ),
  errorComponent: () => (
    <PublicShell>
      <div className="container-eh py-24 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
      </div>
    </PublicShell>
  ),
  component: CourseDetail,
});

const levelLabel: Record<Course["level"], string> = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

function CourseDetail() {
  const { slug } = Route.useParams();
  const { wishlist, toggleWishlist, courses: allCourses } = useStore();
  const { instructors } = useCatalog();
  const course = allCourses.find((c) => c.slug === slug) as Course | undefined;

  if (allCourses.length > 0 && !course) throw notFound();
  if (!course) {
    return (
      <PublicShell>
        <div className="container-eh py-24">
          <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </PublicShell>
    );
  }

  const instructor = instructors.find(
    (i) => i.id === course.instructorId || i.slug === course.instructorId,
  );
  const related = allCourses.filter((c) => c.category === course.category && c.id !== course.id);
  const liked = wishlist.includes(course.id);


  return (
    <PublicShell>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-noise opacity-30" aria-hidden="true" />
        <div
          className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-cobalt opacity-30 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-eh relative grid gap-8 py-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {course.badge && <Badge className="bg-accent text-accent-foreground">{course.badge}</Badge>}
              <Badge variant="secondary">{levelLabel[course.level]}</Badge>
              <Badge variant="secondary">
                {course.language === "english" ? "Fully in English" : "Bilingual"}
              </Badge>
            </div>
            <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">{course.title}</h1>
            <p className="mt-3 text-base text-muted-foreground">{course.subtitle}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {course.rating.toLocaleString("en-US")} ({course.reviewsCount.toLocaleString("en-US")} reviews)
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {course.students.toLocaleString("en-US")} students
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {course.durationHours.toLocaleString("en-US")} hours
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {course.lessonsCount.toLocaleString("en-US")} lessons
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">{course.description}</p>

            <Reveal className="mt-8">
              <h2 className="text-xl font-bold">What you'll be able to do</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex gap-2 rounded-xl border border-border bg-card p-3 text-sm">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="text-xl font-bold">Curriculum</h2>
              <Accordion
                type="single"
                collapsible
                defaultValue="m-0"
                className="mt-4 rounded-sm border border-border bg-card px-4"
              >
                {course.modules.map((m, i) => (
                  <AccordionItem key={m.title} value={`m-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-semibold">
                      Module {i + 1}: {m.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {m.lessons.map((l) => (
                          <li
                            key={l.title}
                            className="flex items-center justify-between gap-3 rounded-lg bg-secondary/40 px-3 py-2 text-sm"
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <PlayCircle className="h-4 w-4 shrink-0 text-primary-soft" />
                              <span className="truncate">{l.title}</span>
                              {l.free && (
                                <Badge variant="secondary" className="shrink-0 text-[10px]">
                                  Free
                                </Badge>
                              )}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">{l.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="text-xl font-bold">Requirements</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {course.requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <Signal className="h-4 w-4 text-accent" /> {r}
                  </li>
                ))}
              </ul>
            </Reveal>

            {instructor && (
              <Reveal className="mt-10">
                <h2 className="text-xl font-bold">Mentor</h2>
                <div className="mt-4 rounded-sm border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cobalt font-bold">
                      {instructor.name.slice(0, 1)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{instructor.name}</p>
                      <p className="truncate text-sm text-muted-foreground">{instructor.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{instructor.bio}</p>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link to="/instructors/$slug" params={{ slug: instructor.slug }}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sticky enroll card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-sm border border-border bg-card soft-shadow">
              <div className="relative aspect-[16/9] overflow-hidden bg-cobalt">
                <video
                  src={getCourseVideo(course.slug, course.videoUrl)}
                  poster={getCourseImage(course.slug, course.imageKey, course.imageUrl)}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute top-2 left-2 rounded-full bg-background/80 px-2 py-1 text-[10px] font-semibold tracking-wide text-accent uppercase">
                  Free trial lesson
                </span>
              </div>

              <div className="p-5">
              <div className="flex items-end gap-2">

                <span className="text-3xl font-extrabold text-accent">${course.price.toLocaleString("en-US")}</span>
                {course.oldPrice && (
                  <span className="pb-1 text-sm text-muted-foreground line-through">
                    ${course.oldPrice.toLocaleString("en-US")}
                  </span>
                )}
              </div>
              {course.oldPrice && (
                <p className="mt-1 text-xs text-success">
                  {Math.round((1 - course.price / course.oldPrice) * 100)}% off — for a limited time
                </p>
              )}
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">Next batch: {course.nextBatch}</p>
                <Progress value={72} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">72% of seats filled</p>
              </div>
              <Button asChild size="lg" className="mt-5 h-12 w-full bg-spark text-accent-foreground">
                <Link to="/checkout/$slug" params={{ slug: course.slug }}>
                  Buy Now — ${course.price.toLocaleString("en-US")}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="mt-2 w-full"
                onClick={() => toggleWishlist(course.id)}
              >
                <Heart className={`mr-1 h-4 w-4 ${liked ? "fill-accent text-accent" : ""}`} />
                {liked ? "In Wishlist" : "Add to Wishlist"}
              </Button>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-accent" /> Lifetime access
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-accent" /> Verified certificate
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" /> Mentor support group
                </li>
              </ul>
              </div>
            </div>

          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-eh py-14">
          <h2 className="text-xl font-bold sm:text-2xl">Related Courses</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      )}
    </PublicShell>
  );
}
