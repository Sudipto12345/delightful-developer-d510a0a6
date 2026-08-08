import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock3, Search } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategoryImage } from "@/data/courseImages";
import { useCatalog } from "@/hooks/useCatalog";

const title = "Services — Design, Web, SEO & Growth | ElevateHub Ltd";
const description =
  "Forty production-ready services across brand design, website development, SEO, digital marketing, team training, and business automation. Fixed scope, senior review, clear turnaround.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { services, serviceCategories } = useCatalog();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          (cat === "all" || s.categorySlug === cat) &&
          (q.trim() === "" ||
            s.name.toLowerCase().includes(q.toLowerCase()) ||
            s.tagline.toLowerCase().includes(q.toLowerCase())),
      ),
    [services, cat, q],
  );

  return (
    <PublicShell>
      <PageHero
        eyebrow="Studio Services"
        title="Work delivered, not just taught"
        description="Alongside our courses, the ElevateHub studio ships the same work for clients — brand systems, websites, search visibility, growth campaigns, and the operations behind them."
      >
        <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search services — logo, landing page, technical SEO…"
              className="h-12 pl-9"
              aria-label="Search services"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {services.length} services
          </p>
        </div>
      </PageHero>

      <section className="container-eh py-10">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={cat === "all" ? "default" : "outline"}
            onClick={() => setCat("all")}
          >
            All work
          </Button>
          {serviceCategories.map((c) => (
            <Button
              key={c.slug}
              size="sm"
              variant={cat === c.slug ? "default" : "outline"}
              onClick={() => setCat(c.slug)}
            >
              {c.name}
            </Button>
          ))}
        </div>

        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s, idx) => (
            <StaggerItem key={s.id || s.slug} className="h-full">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-soft/60"
              >
                {idx % 5 === 0 && (
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <img
                      src={getCategoryImage(s.categorySlug)}
                      alt={`${s.name} service`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Badge variant="secondary" className="w-fit text-[11px]">
                    {serviceCategories.find((c) => c.slug === s.categorySlug)?.name ?? "Service"}
                  </Badge>
                  <h2 className="text-lg leading-snug font-semibold">{s.name}</h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{s.tagline}</p>
                  <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <span className="text-xs text-muted-foreground">From</span>
                      <p className="text-xl font-bold text-accent">
                        ${s.startingPrice.toLocaleString("en-US")}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" /> {s.turnaround}
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No services match that search yet.
          </p>
        )}

        <div className="mt-14 rounded-lg border border-border bg-card p-8 sm:p-10">
          <h2 className="text-2xl font-bold">Not sure which service you need?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Book a free consultation. We map your goal to the shortest path — sometimes that is a
            project, sometimes it is a course for your own team.
          </p>
          <Button asChild className="mt-6">
            <Link to="/consultation">
              Book a consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
