import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { instructors } from "@/data/courses";
import { bn } from "@/lib/store";

const title = "মেন্টর ও ইন্সট্রাক্টর — ElevateHub Ltd";
const description =
  "ইন্ডাস্ট্রি অভিজ্ঞ বাংলাদেশি মেন্টরদের কাছ থেকে শিখুন। ওয়েব, ডিজাইন, মার্কেটিং, ডেটা ও এআই বিশেষজ্ঞ টিম।";

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
  return (
    <PublicShell>
      <PageHero
        eyebrow="আমাদের মেন্টর"
        title="যাদের কাছ থেকে শিখবেন"
        description="প্রত্যেক মেন্টর ইন্ডাস্ট্রিতে সক্রিয়ভাবে কাজ করছেন — তাই শেখা হয় বাস্তবমুখী।"
      />
      <section className="container-eh py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((i) => (
            <StaggerItem key={i.id} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary-soft/60">
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cobalt text-lg font-bold">
                    {i.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{i.name}</h2>
                    <p className="truncate text-sm text-muted-foreground">{i.title}</p>
                  </div>
                </div>
                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{i.bio}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {i.skills.slice(0, 4).map((s) => (
                    <Badge key={s} variant="secondary" className="text-[11px]">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {i.rating.toLocaleString("bn-BD")}
                  </span>
                  <span>{bn(i.students)} শিক্ষার্থী</span>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link to="/instructors/$slug" params={{ slug: i.slug }}>
                    প্রোফাইল দেখুন
                  </Link>
                </Button>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </PublicShell>
  );
}
