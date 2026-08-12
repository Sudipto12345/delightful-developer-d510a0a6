import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, Globe2, Users } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const title = "Live Events, Webinars & Bootcamps — ElevateHub Ltd";
const description =
  "Join free live webinars, hands-on bootcamps and mentor AMAs from ElevateHub Ltd. Reserve your seat and learn with practitioners in real time.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/events" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

type EventItem = {
  id: string;
  kind: "Webinar" | "Bootcamp" | "AMA" | "Workshop";
  title: string;
  summary: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  format: "Online — Zoom" | "Online — YouTube Live" | "Hybrid — New York";
  seats: string;
  price: string;
};

const events: EventItem[] = [
  {
    id: "ev-1",
    kind: "Webinar",
    title: "Shipping Your First AI Product Feature",
    summary:
      "A walkthrough of scoping, prototyping and evaluating an AI feature end to end, with a live Q&A on model selection and guardrails.",
    date: "Thursday, 4 September",
    time: "6:00 PM ET",
    duration: "75 minutes",
    host: "Product & AI faculty",
    format: "Online — Zoom",
    seats: "300 seats",
    price: "Free",
  },
  {
    id: "ev-2",
    kind: "Bootcamp",
    title: "Weekend Full-Stack Sprint",
    summary:
      "Two intensive days building and deploying a production-ready React and Node application with code review from senior mentors.",
    date: "Saturday–Sunday, 13–14 September",
    time: "10:00 AM ET",
    duration: "2 days",
    host: "Engineering faculty",
    format: "Hybrid — New York",
    seats: "40 seats",
    price: "Included with any course",
  },
  {
    id: "ev-3",
    kind: "AMA",
    title: "Career Switch AMA: Design to Product",
    summary:
      "Three alumni share how they moved from design roles into product, and answer live questions about portfolios, interviews and salary bands.",
    date: "Tuesday, 23 September",
    time: "1:00 PM ET",
    duration: "60 minutes",
    host: "Alumni panel",
    format: "Online — YouTube Live",
    seats: "Unlimited",
    price: "Free",
  },
  {
    id: "ev-4",
    kind: "Workshop",
    title: "Analytics Clinic: Dashboards That Get Read",
    summary:
      "Bring your own dataset and leave with a dashboard your stakeholders actually use. Hands-on with SQL, modelling and visual hierarchy.",
    date: "Thursday, 2 October",
    time: "7:00 PM ET",
    duration: "2 hours",
    host: "Data faculty",
    format: "Online — Zoom",
    seats: "120 seats",
    price: "Free",
  },
  {
    id: "ev-5",
    kind: "Webinar",
    title: "Cloud Cost Architecture for Growing Teams",
    summary:
      "How to design infrastructure that scales without runaway bills — reference architectures, budgets and the traps teams fall into.",
    date: "Wednesday, 15 October",
    time: "5:30 PM ET",
    duration: "90 minutes",
    host: "Cloud faculty",
    format: "Online — Zoom",
    seats: "250 seats",
    price: "Free",
  },
  {
    id: "ev-6",
    kind: "Bootcamp",
    title: "Growth Marketing Lab: Paid, Organic, Lifecycle",
    summary:
      "Build a full-funnel campaign in one day: creative testing frameworks, channel budgets and a measurement plan you can defend.",
    date: "Saturday, 25 October",
    time: "11:00 AM ET",
    duration: "1 day",
    host: "Marketing faculty",
    format: "Online — Zoom",
    seats: "80 seats",
    price: "$49",
  },
];

function EventsPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Community"
        title="Live events, webinars and bootcamps"
        description="Learn alongside practitioners in real time. Every session is recorded and shared with attendees, so you never lose the material."
      />

      <section className="border-b border-border/60 py-12 sm:py-16">
        <div className="container-eh">
          <Stagger className="grid gap-6 md:grid-cols-2">
            {events.map((ev) => (
              <StaggerItem key={ev.id}>
                <article className="flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-colors hover:border-accent/60">
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="bg-accent text-accent-foreground">{ev.kind}</Badge>
                    <span className="text-sm font-semibold text-accent">{ev.price}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold leading-snug">{ev.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{ev.summary}</p>

                  <dl className="mt-5 grid gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-accent" />
                      <dd>{ev.date}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <dd>
                        {ev.time} · {ev.duration}
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe2 className="h-4 w-4 text-accent" />
                      <dd>{ev.format}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-accent" />
                      <dd>
                        {ev.host} · {ev.seats}
                      </dd>
                    </div>
                  </dl>

                  <Button asChild className="mt-5 w-full">
                    <Link to="/consultation">
                      Reserve a seat <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-eh">
          <Reveal>
            <div className="rounded-sm border border-border bg-card p-8 text-center">
              <h2 className="text-2xl font-extrabold">Want a private session for your team?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                We run closed-door workshops for engineering, design and marketing teams, tailored to
                your stack and your roadmap.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link to="/corporate">Explore team training</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicShell>
  );
}
