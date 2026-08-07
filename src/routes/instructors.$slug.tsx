import { createFileRoute, notFound } from "@tanstack/react-router";
import { Award, Star, Users } from "lucide-react";

import { CourseCard } from "@/components/course/CourseCard";
import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/ui/badge";
import { courses, instructors, type Instructor } from "@/data/courses";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Motion";

export const Route = createFileRoute("/instructors/$slug")({
  loader: ({ params }) => {
    const instructor = instructors.find((i) => i.slug === params.slug);
    if (!instructor) throw notFound();
    return { instructor };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Mentor Not Found" }, { name: "robots", content: "noindex" }] };
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
      <PageHero eyebrow="Mentor Profile" title={instructor.name} description={instructor.title}>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
            <Star className="h-4 w-4 fill-accent text-accent" />{" "}
            {instructor.rating.toLocaleString("en-US")} rating
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
            <Users className="h-4 w-4 text-accent" /> {instructor.students.toLocaleString("en-US")}{" "}
            students
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
            <Award className="h-4 w-4 text-accent" /> {instructor.experience} experience
          </span>
        </div>
      </PageHero>

      <section className="container-eh py-12">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">About</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{instructor.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {instructor.skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>

        {list.length > 0 && (
          <>
            <h2 className="mt-12 text-xl font-bold sm:text-2xl">Courses by this mentor</h2>
            <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <StaggerItem key={c.id}>
                  <CourseCard course={c} />
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}
      </section>
    </PublicShell>
  );
}
