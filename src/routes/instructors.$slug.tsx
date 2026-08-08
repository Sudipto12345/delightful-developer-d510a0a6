import { createFileRoute, notFound } from "@tanstack/react-router";
import { Award, Star, Users } from "lucide-react";

import { CourseCard } from "@/components/course/CourseCard";
import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/ui/badge";
import { type Instructor } from "@/data/courses";
import { useCatalog } from "@/hooks/useCatalog";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Motion";

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const Route = createFileRoute("/instructors/$slug")({
  head: ({ params }) => {
    const name = titleCase(params.slug);
    const t = `${name} — Mentor at ElevateHub Ltd`;
    const description = `${name} teaches at ElevateHub Ltd. See their background, skills, ratings, and the courses they mentor.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: description },
        { property: "og:title", content: t },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/instructors/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/instructors/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <PublicShell>
      <div className="container-eh py-24 text-center">
        <h1 className="text-2xl font-bold">Mentor not found</h1>
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
  component: InstructorDetail,
});

function InstructorDetail() {
  const { slug } = Route.useParams();
  const { instructors, courses } = useCatalog();
  const instructor = instructors.find((i) => i.slug === slug) as Instructor | undefined;

  if (instructors.length > 0 && !instructor) throw notFound();
  if (!instructor) {
    return (
      <PublicShell>
        <div className="container-eh py-24">
          <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </PublicShell>
    );
  }

  const list = courses.filter(
    (c) => (c.instructorId === instructor.id || c.instructorId === instructor.slug) && c.published,
  );


  return (
    <PublicShell>
      <PageHero eyebrow="Mentor Profile" title={instructor.name} description={instructor.title}>
        <div className="mt-6 grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
          {instructor.avatarUrl ? (
            <img
              src={instructor.avatarUrl}
              alt={`${instructor.name}, ${instructor.title}`}
              className="h-40 w-40 rounded-sm object-cover soft-shadow"
            />
          ) : null}
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />{" "}
              {instructor.rating.toLocaleString("en-US")} rating
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5">
              <Users className="h-4 w-4 text-accent" />{" "}
              {instructor.students.toLocaleString("en-US")} students
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5">
              <Award className="h-4 w-4 text-accent" /> {instructor.experience} experience
            </span>
          </div>
        </div>

      </PageHero>

      <section className="container-eh py-12">
        <Reveal>
          <div className="rounded-sm border border-border bg-card p-6">
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
