import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Clock3, ShieldCheck, Sparkles } from "lucide-react";

import { PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryImage } from "@/data/courseImages";
import { useCatalog } from "@/hooks/useCatalog";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const name = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const title = `${name} — ElevateHub Ltd Services`;
    const description = `${name} delivered by the ElevateHub studio: fixed scope, senior review before delivery, clear turnaround, and a written handover.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <PublicShell>
      <div className="container-eh py-24 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Button asChild className="mt-6">
          <Link to="/services">Back to all services</Link>
        </Button>
      </div>
    </PublicShell>
  ),
  errorComponent: () => (
    <PublicShell>
      <div className="container-eh py-24 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <Button asChild className="mt-6">
          <Link to="/services">Back to all services</Link>
        </Button>
      </div>
    </PublicShell>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { services, serviceCategories } = useCatalog();
  const service = services.find((s) => s.slug === slug);

  if (services.length > 0 && !service) throw notFound();
  if (!service) {
    return (
      <PublicShell>
        <div className="container-eh py-24">
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </PublicShell>
    );
  }

  const category = serviceCategories.find((c) => c.slug === service.categorySlug);
  const related = services
    .filter((s) => s.categorySlug === service.categorySlug && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <PublicShell>
      <section className="relative overflow-hidden border-b border-border/60">
        <img
          src={getCategoryImage(service.categorySlug)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        <div className="container-eh relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            {category && (
              <Badge variant="secondary" className="text-[11px]">
                {category.name}
              </Badge>
            )}
            <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {service.description}
            </p>

            <h2 className="mt-10 text-xl font-bold">What you get</h2>
            <Stagger className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <StaggerItem key={d}>
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm">{d}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <h2 className="mt-10 text-xl font-bold">How we work</h2>
            <ol className="mt-4 space-y-4">
              {[
                ["Discovery", "A short call to lock the goal, audience, and success measure."],
                ["Proposal", "Fixed scope, fixed price, and a delivery date in writing."],
                ["Production", "Weekly checkpoints so nothing arrives as a surprise."],
                ["Handover", "Source files, documentation, and thirty days of follow-up support."],
              ].map(([step, text], i) => (
                <li key={step} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-sm font-bold">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">{step}</p>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-4xl font-extrabold text-accent">
                ${service.startingPrice.toLocaleString("en-US")}
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" /> Turnaround: {service.turnaround}
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Senior review before delivery
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> 30 days of follow-up support
                </p>
              </div>
              <Button asChild className="mt-6 w-full">
                <Link to="/consultation">Request this service</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link to="/contact">Talk to the team</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-eh py-14">
          <h2 className="text-2xl font-bold">Related services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/services/$slug"
                params={{ slug: r.slug }}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary-soft/60"
              >
                <p className="font-semibold">{r.name}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.tagline}</p>
                <span className="mt-4 inline-flex items-center text-sm text-primary-soft">
                  View <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PublicShell>
  );
}
