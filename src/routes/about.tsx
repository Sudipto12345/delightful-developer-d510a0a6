import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartHandshake, Rocket, ShieldCheck } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion/Motion";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/content";
import { useCatalog } from "@/hooks/useCatalog";

const title = "About Us — ElevateHub Ltd";
const description =
  "ElevateHub Ltd is a mobile-first skills platform for ambitious learners worldwide. Learn about our mission, vision, and team.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Compass,
    title: "Clear, Plain-Language Teaching",
    text: "Even complex topics are explained clearly with examples — so learners anywhere can follow along.",
  },
  {
    icon: Rocket,
    title: "Outcome-Focused Learning",
    text: "Every course ends with a portfolio project that helps you land a job or win clients.",
  },
  {
    icon: HeartHandshake,
    title: "Mentor Support",
    text: "Ask a question, get an answer — our active mentor team runs live sessions and community groups.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Payments",
    text: "Bank Transfer, PayPal, or Wise — with manual verification for a safe, transparent process.",
  },
];

const milestones = [
  { year: "2022", text: "Started with a small cohort and just 3 mentors." },
  { year: "2023", text: "Reached our first 5,000 students and launched a full curriculum." },
  { year: "2024", text: "Launched a mobile-first platform and live mentorship program." },
  { year: "2026", text: "42,000+ students, with a learner community across 64 regions." },
];

function AboutPage() {
  const { instructors } = useCatalog();
  return (
    <PublicShell>
      <PageHero
        eyebrow="Our Story"
        title="Making skills accessible to every ambitious learner"
        description="We believe language and geography shouldn't stand in the way of learning. Every ElevateHub course is clear, mobile-friendly, and affordable."
      />

      <section className="container-eh py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-sm border border-border bg-card p-5 text-center">
              <p className="text-3xl font-extrabold text-accent">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-eh pb-12">
        <Reveal>
          <h2 className="text-2xl font-bold">Our Values</h2>
        </Reveal>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="h-full rounded-sm border border-border bg-card p-5">
                <v.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-eh pb-12">
        <h2 className="text-2xl font-bold">Our Journey</h2>
        <ol className="mt-6 space-y-4 border-l border-border pl-6">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full bg-accent" />
              <p className="font-semibold text-accent">{m.year}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-eh pb-16">
        <h2 className="text-2xl font-bold">Team & Mentors</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {instructors.length} industry experts run regular classes and mentoring sessions.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {instructors.map((i) => (
            <Link
              key={i.id}
              to="/instructors/$slug"
              params={{ slug: i.slug }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary-soft"
            >
              {i.name}
            </Link>
          ))}
        </div>
        <Button asChild className="mt-8 bg-spark text-accent-foreground">
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </section>
    </PublicShell>
  );
}
