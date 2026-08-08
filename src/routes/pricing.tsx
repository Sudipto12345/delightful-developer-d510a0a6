import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const title = "Pricing & Plans — ElevateHub Ltd";
const description =
  "Single courses, career tracks, and premium mentorship — choose a learning plan that fits your budget.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Starter",
    price: 25,
    tag: "Single Course",
    features: [
      "Lifetime access to any one course",
      "Community group support",
      "Course certificate",
      "Watch on mobile and desktop",
    ],
  },
  {
    name: "Career Track",
    price: 89,
    tag: "Most Popular",
    popular: true,
    features: [
      "3 related courses bundled together",
      "Weekly live mentor sessions",
      "Portfolio and resume review",
      "Job placement guidelines",
      "Premium certificate",
    ],
  },
  {
    name: "Premium Mentorship",
    price: 159,
    tag: "1-on-1",
    features: [
      "1-year access to all courses",
      "4 one-on-one sessions per month",
      "Freelance profile setup",
      "Real client project guidance",
      "Priority support",
    ],
  },
];

function PricingPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Pricing"
        title="Quality learning at an affordable price"
        description="All plans support payment via Bank Transfer, PayPal, or Wise with manual verification."
      />
      <section className="container-eh py-12">
        <Stagger className="grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <div
                className={`flex h-full flex-col rounded-sm border p-6 ${
                  p.popular ? "border-accent bg-card soft-shadow" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{p.name}</h2>
                  <Badge variant={p.popular ? "default" : "secondary"}>{p.tag}</Badge>
                </div>
                <p className="mt-4 text-3xl font-extrabold text-accent">${p.price}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-6 h-12 w-full ${p.popular ? "bg-spark text-accent-foreground" : ""}`}
                  variant={p.popular ? "default" : "outline"}
                >
                  <Link to="/courses">Choose a Course</Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 rounded-sm border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Student & Group Discounts</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            20% off with a valid student ID. Up to 30% corporate discount for groups enrolling
            5 or more people at once.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/corporate">Corporate Training</Link>
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
