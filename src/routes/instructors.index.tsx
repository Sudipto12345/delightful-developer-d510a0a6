import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/hooks/useCatalog";

const title = "Mentors & Instructors — ElevateHub Ltd";
const description =
  "Learn from industry-experienced mentors. A team of experts in web, design, marketing, data, and AI.";

export const Route = createFileRoute("/instructors/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/instructors" },
    ],
    links: [{ rel: "canonical", href: "/instructors" }],
  }),
  component: InstructorsPage,
});

function InstructorsPage() {
  const { instructors } = useCatalog();
  return (
    <PublicShell>
      <PageHero
        eyebrow="Our Mentors"
        title="Learn from the best"
        description="Every mentor is actively working in the industry — so learning stays practical and real-world."
      />
      <section className="container-eh py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((i) => (
            <StaggerItem key={i.id} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-accent/50">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                  {i.avatarUrl ? (
                    <img
                      src={i.avatarUrl}
                      alt={`${i.name}, ${i.title}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center bg-cobalt text-3xl font-bold">
                      {i.name.slice(0, 1)}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute right-4 bottom-3 left-4">
                    <h2 className="truncate font-display font-bold">{i.name}</h2>
                    <p className="truncate text-xs text-muted-foreground">{i.title}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="line-clamp-3 text-sm text-muted-foreground">{i.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {i.skills.slice(0, 4).map((s) => (
                      <Badge key={s} variant="secondary" className="rounded-sm text-[11px]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {i.rating.toLocaleString("en-US")}
                    </span>
                    <span>{i.students.toLocaleString("en-US")} students</span>
                  </div>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link to="/instructors/$slug" params={{ slug: i.slug }}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </article>

            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </PublicShell>
  );
}
