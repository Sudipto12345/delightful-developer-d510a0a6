import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, LineChart, Users2, Workflow } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Button } from "@/components/ui/button";

const title = "কর্পোরেট ট্রেনিং — ElevateHub Ltd";
const description =
  "আপনার টিমের জন্য কাস্টমাইজড স্কিল ট্রেনিং। ব্যাচভিত্তিক ক্লাস, প্রোগ্রেস রিপোর্ট ও ইন-হাউস ওয়ার্কশপ।";

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
  { icon: Users2, title: "টিম ব্যাচ", text: "১০–২০০ জনের ব্যাচে কাস্টম কারিকুলাম ও নির্ধারিত সময়সূচি।" },
  { icon: Workflow, title: "ইন-হাউস ওয়ার্কশপ", text: "আপনার অফিসে সরাসরি হাতে-কলমে ওয়ার্কশপ, ঢাকার ভেতরে ও বাইরে।" },
  { icon: LineChart, title: "প্রোগ্রেস রিপোর্ট", text: "প্রতি সপ্তাহে এইচআর ড্যাশবোর্ডে অংশগ্রহণ ও ফলাফল রিপোর্ট।" },
  { icon: Building2, title: "ইন্ডাস্ট্রি কেস", text: "আপনার ব্যবসার বাস্তব কেস স্টাডি দিয়ে অ্যাসাইনমেন্ট তৈরি।" },
];

function CorporatePage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="বিজনেস সলিউশন"
        title="আপনার টিমকে দক্ষ করে তুলুন"
        description="সরকারি-বেসরকারি প্রতিষ্ঠান, স্টার্টআপ ও এজেন্সির জন্য কাস্টমাইজড ট্রেনিং প্রোগ্রাম।"
      />
      <section className="container-eh py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {offerings.map((o) => (
            <StaggerItem key={o.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <o.icon className="h-6 w-6 text-accent" />
                <h2 className="mt-3 font-semibold">{o.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">কীভাবে শুরু করবেন</h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>১. প্রয়োজন জানিয়ে আমাদের সাথে যোগাযোগ করুন।</li>
            <li>২. আমরা স্কিল গ্যাপ অ্যাসেসমেন্ট করে প্রস্তাবনা দেব।</li>
            <li>৩. কারিকুলাম ও সময়সূচি চূড়ান্ত করে ব্যাচ শুরু।</li>
            <li>৪. প্রোগ্রাম শেষে রিপোর্ট ও সার্টিফিকেট হস্তান্তর।</li>
          </ol>
          <Button asChild className="mt-6 bg-spark text-accent-foreground">
            <Link to="/contact">প্রস্তাবনা চান</Link>
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
