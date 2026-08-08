import { createFileRoute, notFound } from "@tanstack/react-router";

import { CourseCard } from "@/components/course/CourseCard";
import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { useCatalog } from "@/hooks/useCatalog";
import { useStore } from "@/lib/store";

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const Route = createFileRoute("/categories/$slug")({
  head: ({ params }) => {
    const name = titleCase(params.slug);
    const t = `${name} Courses — ElevateHub Ltd`;
    const d = `Learn ${name} with industry mentors, real projects, graded feedback, and verified certificates at ElevateHub Ltd.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/categories/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/categories/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <PublicShell>
      <div className="container-eh py-24 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
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
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { categories } = useCatalog();
  const category = categories.find((c) => c.slug === slug);
  const { courses } = useStore();

  if (categories.length > 0 && !category) throw notFound();
  const list = courses.filter((c) => c.published && c.category === slug);

  return (
    <PublicShell>
      <PageHero
        eyebrow="Category"
        title={`${category?.name ?? titleCase(slug)} Courses`}
        description={category?.tagline ?? ""}
      />

      <section className="container-eh py-12">
        <p className="text-sm text-muted-foreground">{list.length} courses</p>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <StaggerItem key={c.id} className="h-full">
              <CourseCard course={c} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </PublicShell>
  );
}
