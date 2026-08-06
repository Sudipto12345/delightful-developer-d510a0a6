import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { taka } from "@/lib/store";

const title = "প্রাইসিং ও প্যাকেজ — ElevateHub Ltd";
const description =
  "একক কোর্স, ক্যারিয়ার ট্র্যাক ও প্রিমিয়াম মেন্টরশিপ — আপনার বাজেট অনুযায়ী শেখার প্ল্যান বেছে নিন।";

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
    name: "স্টার্টার",
    price: 2500,
    tag: "একক কোর্স",
    features: [
      "যেকোনো একটি কোর্সে লাইফটাইম অ্যাক্সেস",
      "কমিউনিটি গ্রুপ সাপোর্ট",
      "কোর্স সার্টিফিকেট",
      "মোবাইল ও ডেস্কটপে দেখা",
    ],
  },
  {
    name: "ক্যারিয়ার ট্র্যাক",
    price: 8900,
    tag: "সবচেয়ে জনপ্রিয়",
    popular: true,
    features: [
      "৩টি সম্পর্কিত কোর্স একসাথে",
      "সাপ্তাহিক লাইভ মেন্টর সেশন",
      "পোর্টফোলিও ও সিভি রিভিউ",
      "জব প্লেসমেন্ট গাইডলাইন",
      "প্রিমিয়াম সার্টিফিকেট",
    ],
  },
  {
    name: "প্রিমিয়াম মেন্টরশিপ",
    price: 15900,
    tag: "১-অন-১",
    features: [
      "সব কোর্সে ১ বছর অ্যাক্সেস",
      "মাসে ৪টি ১-অন-১ সেশন",
      "ফ্রিল্যান্স প্রোফাইল সেটআপ",
      "রিয়েল ক্লায়েন্ট প্রজেক্ট গাইড",
      "প্রায়োরিটি সাপোর্ট",
    ],
  },
];

function PricingPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="প্রাইসিং"
        title="সাশ্রয়ী দামে মানসম্পন্ন শেখা"
        description="সব প্ল্যানে বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফারে ম্যানুয়াল পেমেন্ট সুবিধা।"
      />
      <section className="container-eh py-12">
        <Stagger className="grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <div
                className={`flex h-full flex-col rounded-2xl border p-6 ${
                  p.popular ? "border-accent bg-card soft-shadow" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{p.name}</h2>
                  <Badge variant={p.popular ? "default" : "secondary"}>{p.tag}</Badge>
                </div>
                <p className="mt-4 text-3xl font-extrabold text-accent">{taka(p.price)}</p>
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
                  <Link to="/courses">কোর্স বাছাই করুন</Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">শিক্ষার্থী ও দলগত ছাড়</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            বৈধ শিক্ষার্থী আইডি দেখালে ২০% ছাড়। ৫ জনের বেশি একসাথে ভর্তি হলে ৩০% পর্যন্ত কর্পোরেট ছাড়
            প্রযোজ্য।
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/corporate">কর্পোরেট ট্রেনিং</Link>
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
