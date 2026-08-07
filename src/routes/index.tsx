import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  Code2,
  Facebook,
  Headphones,
  Megaphone,
  MessageSquareText,
  Palette,
  PlayCircle,
  Quote,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { type ComponentType } from "react";

import certificateImg from "@/assets/certificate.jpg";
import heroImg from "@/assets/hero-learners.jpg";
import mentorImg from "@/assets/mentor.jpg";
import { CourseCard } from "@/components/course/CourseCard";
import { PublicShell } from "@/components/layout/PublicShell";
import {
  CobaltCube,
  Counter,
  Marquee,
  Parallax,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/Motion";
import { KanthaDivider, KanthaMotif } from "@/components/motion/NakshiKantha";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, instructors } from "@/data/courses";
import { events, faqs, posts, stats, testimonials } from "@/data/content";
import { paymentMethods } from "@/data/users";
import { useStore } from "@/lib/store";

const title = "ElevateHub Ltd — Build Your Career With In-Demand Skills";
const description =
  "A mobile-first online learning platform for ambitious learners worldwide. Web development, design, digital marketing, freelancing, and communication skills courses — with real mentor support, trusted by learners in 60+ countries.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "ElevateHub Ltd",
          url: "/",
          description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Global",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Code2,
  Palette,
  Megaphone,
  Briefcase,
  BrainCircuit,
  MessageSquareText,
};

function SectionHead({
  eyebrow,
  title: heading,
  description: desc,
  center = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-accent">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </span>
      <h2 className="mt-4 text-2xl font-extrabold sm:text-4xl">{heading}</h2>
      {desc && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{desc}</p>
      )}
    </Reveal>
  );
}

function HomePage() {
  const { courses } = useStore();
  const published = courses.filter((c) => c.published);
  const featured = published.slice(0, 6);

  return (
    <PublicShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
          src={heroLoop.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background"
          aria-hidden="true"
        />
        <div className="absolute inset-0 grid-noise opacity-40" aria-hidden="true" />

        <div
          className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-cobalt opacity-40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute top-20 -right-24 h-80 w-80 rounded-full bg-spark opacity-20 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-eh relative grid gap-10 py-12 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              New Cohort Now Enrolling — Limited Seats
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl leading-[1.1] font-extrabold sm:text-6xl"
            >
              Learn Smart,
              <br />
              <span className="text-gradient">Level Up Your Skills</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Learn web development, design, marketing, and freelancing — anytime, anywhere, right
              from your phone. Industry mentors, live support, and real projects, all on one
              platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg" className="h-12 bg-spark text-accent-foreground">
                <Link to="/courses">
                  Browse Courses <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12">
                <Link to="/consultation">
                  <PlayCircle className="mr-1 h-4 w-4" /> Free Consultation
                </Link>
              </Button>
            </motion.div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card/60 p-3">
                  <p className="text-xl font-extrabold text-accent sm:text-2xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl border border-border glow"
            >
              <img
                src={heroImg}
                alt="Learners studying online from around the world"
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
              />
            </motion.div>
            <CobaltCube className="absolute -top-10 -left-8 hidden lg:block" />
            <KanthaMotif
              size={110}
              className="absolute -top-6 -right-6 opacity-25 hidden md:block"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 left-4 rounded-2xl border border-border bg-card/90 p-3 backdrop-blur soft-shadow"
            >
              <p className="flex items-center gap-2 text-xs font-medium">
                <BadgeCheck className="h-4 w-4 text-success" /> 42,000+ learners and growing
              </p>
            </motion.div>
          </div>
        </div>

        <div className="border-y border-border/60 bg-surface/40">
          <div className="container-eh">
            <Marquee
              items={[
                "Learn From Anywhere",
                "Lifetime Access",
                "Secure Global Payments",
                "Verified Certificates",
                "Live Mentor Support",
                "Mobile Friendly",
                "Real Projects",
              ]}
            />
          </div>
        </div>
        <KanthaDivider className="mt-1" segments={22} />
      </section>

      {/* CATEGORIES */}
      <section className="container-eh py-16 sm:py-24">
        <SectionHead
          eyebrow="Categories"
          title="Choose Your Field of Interest"
          description="Every category comes with a step-by-step learning path and industry mentors."
        />
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <StaggerItem key={cat.slug}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: cat.slug }}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary-soft/60 sm:p-6"
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${cat.color}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="text-base font-bold sm:text-lg">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">{cat.tagline}</p>
                  <span className="mt-auto text-xs font-medium text-primary-soft group-hover:underline">
                    Browse Courses →
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* FEATURED COURSES */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 grid-noise opacity-20" aria-hidden="true" />
        <div className="container-eh relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHead
              center={false}
              eyebrow="Popular Courses"
              title="The Courses Driving the Most Career Wins"
            />
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <StaggerItem key={c.id} className="h-full">
                <CourseCard course={c} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* WHY US */}
      <section className="container-eh py-16 sm:py-24">
        <SectionHead
          eyebrow="Why ElevateHub"
          title="We Don't Just Stream Videos — We Build Skills"
          description="Designed for real life — low bandwidth, mobile devices, and busy schedules, wherever you are."
        />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Smartphone,
              t: "Mobile First",
              d: "Smooth video even on low data, offline notes, and a design built for small screens.",
            },
            {
              icon: Users,
              t: "Live Mentor Support",
              d: "Live Q&A twice a week plus cohort-based support groups.",
            },
            {
              icon: Wallet,
              t: "Easy Global Payments",
              d: "Cards, PayPal, and popular digital wallets — verified in under 2 hours.",
            },
            {
              icon: Trophy,
              t: "Real Projects",
              d: "Portfolio-ready projects and code reviews in every course.",
            },
            {
              icon: ShieldCheck,
              t: "Verified Certificates",
              d: "Digital certificates with a unique ID you can verify anywhere.",
            },
            {
              icon: Headphones,
              t: "Career Guidance",
              d: "Resume reviews, interview practice, and freelancing guides.",
            },
          ].map((f) => (
            <StaggerItem key={f.t}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary-soft/50">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary">
                  <f.icon className="h-5 w-5 text-accent" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* LEARNING PATH */}
      <section className="relative overflow-hidden border-y border-border/60 bg-surface/30 py-16 sm:py-24">
        <div className="container-eh">
          <SectionHead
            eyebrow="Learning Path"
            title="Zero to Career — 5 Steps"
            description="Every step has clear goals, assignments, and mentor checkpoints."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-5">
            {[
              {
                n: "01",
                t: "Pick Your Skill",
                d: "Find the right course for you in a free counseling session.",
              },
              {
                n: "02",
                t: "Foundation",
                d: "Master the basics in clear, simple lessons — just 30 minutes a day.",
              },
              {
                n: "03",
                t: "Practice",
                d: "Prove your skills hands-on with assignments and quizzes.",
              },
              { n: "04", t: "Real Project", d: "Build a full project for your portfolio." },
              {
                n: "05",
                t: "Career",
                d: "Get ready with your resume, interviews, and marketplace profile.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-5">
                  <span className="text-3xl font-extrabold text-gradient">{step.n}</span>
                  <h3 className="mt-3 text-base font-bold">{step.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORS */}
      <section className="container-eh py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Parallax amount={30}>
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={mentorImg}
                alt="Industry mentor teaching a live class"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </Parallax>
          <div>
            <SectionHead
              center={false}
              eyebrow="Mentor Panel"
              title="Taught by People Working in the Industry"
              description="Every mentor brings at least 5 years of real-world experience."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {instructors.slice(0, 4).map((m, i) => (
                <Reveal key={m.id} delay={i * 0.06}>
                  <Link
                    to="/instructors/$slug"
                    params={{ slug: m.slug }}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary-soft/60"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cobalt text-sm font-bold">
                      {m.name.slice(0, 1)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{m.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {m.title}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/instructors">View All Mentors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden border-y border-border/60 bg-surface/30 py-16 sm:py-24">
        <div className="container-eh">
          <SectionHead
            eyebrow="Success Stories"
            title="Their Stories Are Our Proof"
            description="Learners in 60+ countries are transforming their careers with us."
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                  <Quote className="h-6 w-6 text-accent" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t.text}
                  </p>
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                    <Badge className="mt-2 bg-success/15 text-success">{t.result}</Badge>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PAYMENT */}
      <section className="container-eh py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead
              center={false}
              eyebrow="Easy Payments"
              title="Card, PayPal, or Bank Transfer — Whatever Works for You"
              description="Complete your payment and submit your transaction ID. Our team verifies it and unlocks your course within 2 hours."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <span
                      className="inline-block h-2 w-10 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <p className="mt-3 text-sm font-bold">{p.name}</p>
                    <p className="mt-1 text-xs break-all text-muted-foreground">{p.number}</p>
                    <p className="text-xs text-muted-foreground">{p.type}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                "No hidden charges",
                "7-day refund policy",
                "Digital receipt for every payment",
              ].map((li) => (
                <li key={li} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {li}
                </li>
              ))}
            </ul>
          </div>
          <Parallax amount={26}>
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={certificateImg}
                alt="Verified certificate of course completion"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </Parallax>
        </div>
      </section>

      {/* EVENTS */}
      <section className="border-y border-border/60 bg-surface/30 py-16 sm:py-24">
        <div className="container-eh">
          <SectionHead
            eyebrow="Upcoming Events"
            title="Free Webinars & Bootcamps"
            description="Free sessions online and in person every month — seats are limited."
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
            {events.map((e) => (
              <StaggerItem key={e.title}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                  <CalendarClock className="h-5 w-5 text-accent" />
                  <h3 className="mt-3 text-base font-bold">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {e.date} · {e.time}
                  </p>
                  <p className="text-sm text-muted-foreground">{e.mode}</p>
                  <p className="mt-3 text-xs text-accent">{e.seats} seats left</p>
                  <Button asChild size="sm" className="mt-4 w-full">
                    <Link to="/events">Register Now</Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* BLOG */}
      <section className="container-eh py-16 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead center={false} eyebrow="Blog" title="Learning Resources & Guides" />
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/blog">View All Posts</Link>
          </Button>
        </div>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary-soft/60"
              >
                <Badge variant="secondary" className="w-fit">
                  {p.category}
                </Badge>
                <h3 className="mt-3 text-base font-bold">{p.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {p.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {p.date} · {p.readTime}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="container-eh pb-16 sm:pb-24">
        <SectionHead eyebrow="FAQ" title="Common Questions, Answered" />
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-card px-4"
          >
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`i-${i}`}>
                <AccordionTrigger className="text-left text-sm font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-eh pb-20">
        <KanthaDivider className="mb-8 text-accent/40" segments={22} />
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-cobalt p-8 text-center sm:p-14">
            <div className="absolute inset-0 grid-noise opacity-30" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-2xl font-extrabold sm:text-4xl">Start Learning Today</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Create a free account and preview a class. Enroll only when you're ready.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 bg-accent text-accent-foreground">
                  <Link to="/auth/register">Sign Up Free</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/30 bg-white/10 text-white"
                >
                  <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <Facebook className="mr-1 h-4 w-4" /> Join Our Community
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </PublicShell>
  );
}
