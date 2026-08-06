import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const title = "যোগাযোগ — ElevateHub Ltd";
const description =
  "ভর্তি, কোর্স বা পেমেন্ট সংক্রান্ত যেকোনো প্রশ্নে আমাদের সাথে যোগাযোগ করুন। ঢাকা অফিস, হটলাইন ও হোয়াটসঅ্যাপ সাপোর্ট।";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে").max(60),
  phone: z.string().trim().min(11, "সঠিক মোবাইল নম্বর দিন").max(15),
  email: z.string().trim().email("সঠিক ইমেইল দিন").max(120),
  message: z.string().trim().min(10, "বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে").max(800),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "email" | "message", string>>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const next: Record<string, string> = {};
      for (const issue of res.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setForm({ name: "", phone: "", email: "", message: "" });
    toast.success("বার্তা পাঠানো হয়েছে! ২৪ ঘণ্টার মধ্যে আমরা যোগাযোগ করব।");
  };

  return (
    <PublicShell>
      <PageHero
        eyebrow="যোগাযোগ"
        title="আমরা শুনতে প্রস্তুত"
        description="কোর্স বাছাই, পেমেন্ট বা ক্যারিয়ার পরামর্শ — যেকোনো বিষয়ে জানতে বার্তা পাঠান।"
      />

      <section className="container-eh grid gap-6 py-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6" noValidate>
          <h2 className="text-lg font-bold">বার্তা পাঠান</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">পুরো নাম</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 h-11"
                placeholder="আপনার নাম"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="phone">মোবাইল</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1.5 h-11"
                placeholder="01XXXXXXXXX"
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="email">ইমেইল</Label>
            <Input
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 h-11"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="mt-4">
            <Label htmlFor="message">আপনার বার্তা</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 min-h-32"
              placeholder="কীভাবে সাহায্য করতে পারি?"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <Button type="submit" className="mt-5 h-12 w-full bg-spark text-accent-foreground sm:w-auto">
            বার্তা পাঠান
          </Button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold">সরাসরি যোগাযোগ</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" /> হটলাইন: ০৯৬১০-০০০০০০
              </li>
              <li className="flex gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-accent" /> হোয়াটসঅ্যাপ: ০১৭০০-০০০০০০
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" /> support@elevatehubltd.com
              </li>
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent" /> ধানমন্ডি ২৭, ঢাকা ১২০৯
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold">সাপোর্ট সময়</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              শনি – বৃহস্পতি: সকাল ১০টা – রাত ৯টা
              <br />
              শুক্রবার: বিকাল ৪টা – রাত ৯টা
            </p>
          </div>
        </aside>
      </section>
    </PublicShell>
  );
}
