import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, LineChart, Users2, Workflow } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Button } from "@/components/ui/button";

const title = "Corporate Training — ElevateHub Ltd";
const description =
  "Customized skills training for your team. Batch-based classes, progress reports, and in-house workshops.";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/corporate" },
    ],
    links: [{ rel: "canonical", href: "/corporate" }],
  }),
  component: CorporatePage,
});

const offerings = [
  { icon: Users2, title: "Team Batches", text: "Custom curriculum and scheduling for groups of 10–200 people." },
  { icon: Workflow, title: "In-House Workshops", text: "Hands-on workshops delivered directly at your office, anywhere in the world." },
  { icon: LineChart, title: "Progress Reports", text: "Weekly participation and results reports on your HR dashboard." },
  { icon: Building2, title: "Industry Case Studies", text: "Assignments built around real case studies from your business." },
];

function CorporatePage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Business Solutions"
        title="Upskill your team"
        description="Customized training programs for enterprises, government bodies, startups, and agencies."
      />
      <section className="container-eh py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {offerings.map((o) => (
            <StaggerItem key={o.title}>
              <div className="h-full rounded-sm border border-border bg-card p-5">
                <o.icon className="h-6 w-6 text-accent" />
                <h2 className="mt-3 font-semibold">{o.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 rounded-sm border border-border bg-card p-6">
          <h2 className="text-lg font-bold">How to Get Started</h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>1. Contact us and tell us what you need.</li>
            <li>2. We run a skills gap assessment and share a proposal.</li>
            <li>3. We finalize the curriculum and schedule, then kick off the batch.</li>
            <li>4. At the end of the program, we hand over reports and certificates.</li>
          </ol>
          <Button asChild className="mt-6 bg-spark text-accent-foreground">
            <Link to="/contact">Request a Proposal</Link>
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
