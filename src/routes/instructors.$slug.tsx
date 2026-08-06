import { createFileRoute, notFound } from "@tanstack/react-router";
import { Award, Star, Users } from "lucide-react";

import { CourseCard } from "@/components/course/CourseCard";
import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/ui/badge";
import { courses, instructors, type Instructor } from "@/data/courses";
import { bn } from "@/lib/store";

export const Route = createFileRoute("/instructors/$slug")({
  loader: ({ params }) => {
    const instructor = instructors.find((i) => i.slug === params.slug);
    if (!instructor) throw notFound();
    return { instructor };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "মেন্টর পাওয়া যায়নি" }, { name: "robots", content: "noindex" }] };
    const i = loaderData.instructor;
    const t = `${i.name} — ${i.title} | ElevateHub Ltd`;
    return {
      meta: [
        { title: t },
        { name: "description", content: i.bio },
        { property: "og:title", content: t },
        { property: "og:description", content: i.bio },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/instructors/${i.slug}` },
      ],
      links: [{ rel: "canonical", href: `/instructors/${i.slug}` }],
    };
  },
  component: InstructorDetail,
});

function InstructorDetail() {
  const { instructor } = Route.useLoaderData() as { instructor: Instructor };
  const list = courses.filter((c) => c.instructorId === instructor.id && c.published);

  return (
    <PublicShell>
      <PageHero eyebrow="মেন্টর প্রোফাইল" title={instructor.name} description={instructor.title}>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
            <Star className="h-4 w-4 fill-accent text-accent" /> {instructor.rating.toLocaleString("bn-BD")} রেটিং
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
            <Users className="h-4 w-4 text-accent" /> {bn(instructor.students)} শিক্ষার্থী
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
            <Award className="h-4 w-4 text-accent" /> {instructor.experience} অভিজ্ঞতা
          </span>
        </div>
      </PageHero>

      <section className="container-eh py-12">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">পরিচিতি</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{instructor.bio}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {instructor.skills.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {list.length > 0 && (
          <>
            <h2 className="mt-12 text-xl font-bold sm:text-2xl">এই মেন্টরের কোর্স</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </>
        )}
      </section>
    </PublicShell>
  );
}
