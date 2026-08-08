import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, CalendarClock, CheckCircle2, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PublicShell } from "@/components/layout/PublicShell";
import { Reveal } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourseImage } from "@/data/courseImages";
import { getCourse, getInstructor, type Course } from "@/data/courses";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Enrollment" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.course;
    const title = `Enroll — ${c.title} | ElevateHub Ltd`;
    const description = `Reserve your seat in ${c.title}. Free demo enrollment with a scheduled orientation session and instant access after approval.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: CheckoutPage,
});

function nextSessionDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  d.setHours(18, 30, 0, 0);
  return d;
}

function CheckoutPage() {
  const { course } = Route.useLoaderData() as { course: Course };
  const { session, submitEnrollment, enrolled } = useStore();
  const navigate = useNavigate();
  const instructor = getInstructor(course.instructorId);

  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [submitted, setSubmitted] = useState(false);

  const scheduled = nextSessionDate();
  const already = enrolled.includes(course.id);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please add your name and email to reserve a seat.");
      return;
    }
    submitEnrollment({
      userName: name.trim(),
      phone: email.trim(),
      courseId: course.id,
      courseTitle: course.title,
      method: "free",
      trxId: `DEMO-${Date.now().toString().slice(-6)}`,
      amount: 0,
      scheduledFor: scheduled.toISOString(),
    });
    setSubmitted(true);
    toast.success("Seat reserved — approval lands within one hour.");
  };

  return (
    <PublicShell>
      <section className="border-b border-border/60">
        <div className="container-eh grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <Badge className="bg-accent text-accent-foreground">Demo Enrollment — No Payment</Badge>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Reserve Your Seat</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              During the evaluation period every course is free to join. Confirm your details, pick up
              your orientation schedule, and an administrator reviews the request. If nobody reviews it
              within one hour, the system approves it automatically.
            </p>

            {submitted || already ? (
              <Reveal className="mt-8 rounded-sm border border-success/40 bg-success/10 p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <p className="text-lg font-bold">Enrollment request received</p>
                </div>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <dt className="text-xs text-muted-foreground">Orientation session</dt>
                    <dd className="mt-1 font-semibold">
                      {scheduled.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <dt className="text-xs text-muted-foreground">Approval window</dt>
                    <dd className="mt-1 font-semibold">Auto-approved within 60 minutes</dd>
                  </div>
                </dl>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button onClick={() => navigate({ to: "/dashboard" })}>Go to Dashboard</Button>
                  <Button variant="outline" asChild>
                    <Link to="/courses">Browse more courses</Link>
                  </Button>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-5 rounded-sm border border-border bg-card p-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Miles" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>

                <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                  <p className="flex items-center gap-2 font-semibold">
                    <CalendarClock className="h-4 w-4 text-accent" /> Your orientation schedule
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {scheduled.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })} · Live on
                    ElevateHub Studio with {instructor?.name ?? "your mentor"}.
                  </p>
                </div>

                <Button type="submit" size="lg" className="h-12 w-full bg-spark text-accent-foreground">
                  Confirm Free Enrollment
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  No card required. Cancel anytime from your dashboard.
                </p>
              </form>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-sm border border-border bg-card soft-shadow">
              <img
                src={getCourseImage(course.slug, course.imageKey, course.imageUrl)}
                alt={`${course.title} cover`}
                width={1024}
                height={640}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="space-y-4 p-5">
                <p className="font-bold leading-snug">{course.title}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-extrabold text-success">Free</span>
                  <span className="pb-1 text-sm text-muted-foreground line-through">
                    ${course.price.toLocaleString("en-US")}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" /> {course.durationHours} hours ·{" "}
                    {course.lessonsCount} lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" /> Trial video unlocked instantly
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-accent" /> Verified certificate
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent" /> Admin review or auto-approval in 1 hour
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PublicShell>
  );
}
