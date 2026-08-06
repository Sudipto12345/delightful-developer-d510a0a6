import { createFileRoute, notFound } from "@tanstack/react-router";

import { CourseCard } from "@/components/course/CourseCard";
import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { getCategory } from "@/data/courses";
import { bn, useStore } from "@/lib/store";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "ক্যাটাগরি পাওয়া যায়নি" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.category;
    const t = `${c.name} কোর্স — ElevateHub Ltd`;
    const d = `${c.name} শিখুন বাংলায়। ${c.tagline}. ইন্ডাস্ট্রি মেন্টর, রিয়েল প্রজেক্ট ও ভেরিফায়েড সার্টিফিকেট।`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/categories/${c.slug}` },
      ],
      links: [{ rel: "canonical", href: `/categories/${c.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { courses } = useStore();
  const list = courses.filter((c) => c.published && c.category === category.slug);

  return (
    <PublicShell>
      <PageHero eyebrow="ক্যাটাগরি" title={`${category.name} কোর্স`} description={category.tagline} />
      <section className="container-eh py-12">
        <p className="text-sm text-muted-foreground">{bn(list.length)} টি কোর্স</p>
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
