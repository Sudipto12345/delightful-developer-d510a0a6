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
import type { Course } from "@/data/courses";
import { courses, getCourse, getInstructor } from "@/data/courses";
import { bn, taka, useStore } from "@/lib/store";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "কোর্স পাওয়া যায়নি" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.course;
    return {
      meta: [
        { title: `${c.title} — ElevateHub Ltd` },
        { name: "description", content: c.subtitle },
        { property: "og:title", content: c.title },
        { property: "og:description", content: c.subtitle },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/courses/${c.slug}` },
      ],
      links: [{ rel: "canonical", href: `/courses/${c.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: c.title,
            description: c.description,
            provider: { "@type": "Organization", name: "ElevateHub Ltd" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: c.rating,
              reviewCount: c.reviewsCount,
            },
          }),
        },
      ],
    };
  },
  component: CourseDetail,
});

const levelLabel: Record<Course["level"], string> = { beginner: "বিগিনার", intermediate: "ইন্টারমিডিয়েট", advanced: "অ্যাডভান্সড" };

function CourseDetail() {
  const { course } = Route.useLoaderData() as { course: Course };
  const { wishlist, toggleWishlist } = useStore();
  const instructor = getInstructor(course.instructorId);
  const related = courses.filter((c) => c.category === course.category && c.id !== course.id);
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
                {course.language === "bangla" ? "সম্পূর্ণ বাংলা" : "বাংলিশ"}
              </Badge>
            </div>
            <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">{course.title}</h1>
            <p className="mt-3 text-base text-muted-foreground">{course.subtitle}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {course.rating.toLocaleString("bn-BD")} ({bn(course.reviewsCount)} রিভিউ)
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {bn(course.students)} শিক্ষার্থী
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {bn(course.durationHours)} ঘণ্টা
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {bn(course.lessonsCount)} লেসন
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">{course.description}</p>

            <Reveal className="mt-8">
              <h2 className="text-xl font-bold">কোর্স শেষে যা পারবেন</h2>
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
              <h2 className="text-xl font-bold">কারিকুলাম</h2>
              <Accordion
                type="single"
                collapsible
                defaultValue="m-0"
                className="mt-4 rounded-2xl border border-border bg-card px-4"
              >
                {course.modules.map((m, i) => (
                  <AccordionItem key={m.title} value={`m-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-semibold">
                      মডিউল {bn(i + 1)}: {m.title}
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
                                  ফ্রি
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
              <h2 className="text-xl font-bold">প্রয়োজনীয়তা</h2>
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
                <h2 className="text-xl font-bold">মেন্টর</h2>
                <div className="mt-4 rounded-2xl border border-border bg-card p-5">
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
                      প্রোফাইল দেখুন
                    </Link>
                  </Button>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sticky enroll card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 soft-shadow">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-accent">{taka(course.price)}</span>
                {course.oldPrice && (
                  <span className="pb-1 text-sm text-muted-foreground line-through">
                    {taka(course.oldPrice)}
                  </span>
                )}
              </div>
              {course.oldPrice && (
                <p className="mt-1 text-xs text-success">
                  ছাড় {bn(Math.round((1 - course.price / course.oldPrice) * 100))}% — সীমিত সময়ের জন্য
                </p>
              )}
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">পরবর্তী ব্যাচ: {course.nextBatch}</p>
                <Progress value={72} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">৭২% আসন পূর্ণ</p>
              </div>
              <Button asChild size="lg" className="mt-5 h-12 w-full bg-spark text-accent-foreground">
                <Link to="/checkout/$slug" params={{ slug: course.slug }}>
                  এখনই এনরোল করুন
                </Link>
              </Button>
              <Button
                variant="outline"
                className="mt-2 w-full"
                onClick={() => toggleWishlist(course.id)}
              >
                <Heart className={`mr-1 h-4 w-4 ${liked ? "fill-accent text-accent" : ""}`} />
                {liked ? "উইশলিস্টে আছে" : "উইশলিস্টে রাখুন"}
              </Button>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-accent" /> লাইফটাইম অ্যাক্সেস
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-accent" /> ভেরিফায়েড সার্টিফিকেট
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" /> মেন্টর সাপোর্ট গ্রুপ
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-eh py-14">
          <h2 className="text-xl font-bold sm:text-2xl">সম্পর্কিত কোর্স</h2>
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
