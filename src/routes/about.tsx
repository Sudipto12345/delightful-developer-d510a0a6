import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartHandshake, Rocket, ShieldCheck } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion/Motion";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/content";
import { instructors } from "@/data/courses";
import { bn } from "@/lib/store";

const title = "আমাদের সম্পর্কে — ElevateHub Ltd";
const description =
  "ElevateHub Ltd বাংলাদেশের তরুণদের জন্য মোবাইল-ফার্স্ট স্কিল প্ল্যাটফর্ম। আমাদের মিশন, ভিশন ও টিম সম্পর্কে জানুন।";

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
    title: "বাংলায় স্পষ্ট শিক্ষা",
    text: "জটিল বিষয়ও সহজ বাংলায়, উদাহরণসহ — যাতে যেকোনো জেলার শিক্ষার্থী বুঝতে পারে।",
  },
  {
    icon: Rocket,
    title: "ফলাফলভিত্তিক শেখা",
    text: "প্রতিটি কোর্স শেষে থাকে পোর্টফোলিও প্রজেক্ট, যা চাকরি বা ক্লায়েন্ট পেতে কাজে লাগে।",
  },
  {
    icon: HeartHandshake,
    title: "মেন্টর সাপোর্ট",
    text: "প্রশ্ন করলে উত্তর পাবেন — লাইভ সেশন ও কমিউনিটি গ্রুপে সক্রিয় মেন্টর টিম।",
  },
  {
    icon: ShieldCheck,
    title: "স্বচ্ছ পেমেন্ট",
    text: "বিকাশ, নগদ, রকেট বা ব্যাংক — ম্যানুয়াল ভেরিফিকেশনে নিরাপদ ও স্বচ্ছ প্রক্রিয়া।",
  },
];

const milestones = [
  { year: "২০২২", text: "৩ জন মেন্টর নিয়ে ছোট একটি ব্যাচ দিয়ে যাত্রা শুরু।" },
  { year: "২০২৩", text: "প্রথম ৫,০০০ শিক্ষার্থী ও সম্পূর্ণ বাংলা কারিকুলাম চালু।" },
  { year: "২০২৪", text: "মোবাইল-ফার্স্ট প্ল্যাটফর্ম ও লাইভ মেন্টরশিপ প্রোগ্রাম।" },
  { year: "২০২৬", text: "৪২,০০০+ শিক্ষার্থী, ৬৪ জেলায় লার্নার কমিউনিটি।" },
];

function AboutPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="আমাদের গল্প"
        title="দক্ষতা হোক প্রতিটি তরুণের হাতের নাগালে"
        description="আমরা বিশ্বাস করি ভাষা যেন শেখার পথে বাধা না হয়। তাই ElevateHub-এর প্রতিটি কোর্স বাংলায়, মোবাইলে, সাশ্রয়ী দামে।"
      />

      <section className="container-eh py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center">
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
          <h2 className="text-2xl font-bold">আমাদের মূল্যবোধ</h2>
        </Reveal>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <v.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-eh pb-12">
        <h2 className="text-2xl font-bold">আমাদের যাত্রা</h2>
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
        <h2 className="text-2xl font-bold">টিম ও মেন্টর</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {bn(instructors.length)} জন ইন্ডাস্ট্রি বিশেষজ্ঞ নিয়মিত ক্লাস ও মেন্টরিং করেন।
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
          <Link to="/courses">কোর্স দেখুন</Link>
        </Button>
      </section>
    </PublicShell>
  );
}
