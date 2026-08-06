import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/content";

const title = "Blog & Career Guides — ElevateHub Ltd";
const description =
  "Practical guides and tips on freelancing, web development, design, and digital marketing.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const cats = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? posts : posts.filter((p) => p.category === cat);

  return (
    <PublicShell>
      <PageHero
        eyebrow="Blog"
        title="Writing that helps you along the way"
        description="New guides every week — on careers, skills, and freelancing."
      />
      <section className="container-eh py-12">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {cats.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={c === cat ? "default" : "outline"}
              className="shrink-0"
              onClick={() => setCat(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <StaggerItem key={p.slug} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary-soft/60">
                <Badge variant="secondary" className="w-fit">
                  {p.category}
                </Badge>
                <h2 className="mt-3 text-lg leading-snug font-bold">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="story-link">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  {p.author} · {p.date} · {p.readTime}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </PublicShell>
  );
}
