import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/courses";

const title = "ফ্রি ক্যারিয়ার কনসালটেশন — ElevateHub Ltd";
const description =
  "কোন স্কিল আপনার জন্য সঠিক? বিনামূল্যে ১৫ মিনিটের ক্যারিয়ার কনসালটেশন বুক করুন আমাদের মেন্টরদের সাথে।";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/consultation" },
    ],
    links: [{ rel: "canonical", href: "/consultation" }],
  }),
  component: ConsultationPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "নাম লিখুন").max(60),
  phone: z.string().trim().min(11, "সঠিক মোবাইল নম্বর দিন").max(15),
  interest: z.string().min(1, "আগ্রহের বিষয় বাছাই করুন"),
  slot: z.string().min(1, "সময় বাছাই করুন"),
  note: z.string().trim().max(400).optional(),
});

const slots = ["সকাল ১১:০০ – ১১:১৫", "দুপুর ২:০০ – ২:১৫", "বিকাল ৫:০০ – ৫:১৫", "রাত ৮:৩০ – ৮:৪৫"];

function ConsultationPage() {
  const [form, setForm] = useState({ name: "", phone: "", interest: "", slot: "", note: "" });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const next: Record<string, string> = {};
      for (const i of res.error.issues) next[String(i.path[0])] = i.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setDone(true);
    toast.success("কনসালটেশন বুক হয়েছে! আমরা ফোনে কনফার্ম করব।");
  };

  return (
    <PublicShell>
      <PageHero
        eyebrow="ফ্রি সেশন"
        title="১৫ মিনিটে ক্যারিয়ার দিকনির্দেশনা"
        description="কোন স্কিল, কত সময়, কীভাবে আয় — মেন্টরের সাথে কথা বলে পরিষ্কার পরিকল্পনা নিন।"
      />
      <section className="container-eh max-w-2xl py-12">
        {done ? (
          <div className="rounded-2xl border border-success/40 bg-card p-8 text-center">
            <h2 className="text-xl font-bold text-success">বুকিং কনফার্ম হয়েছে</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {form.slot} সময়ে আমাদের মেন্টর {form.phone} নম্বরে কল করবেন।
            </p>
            <Button className="mt-6" variant="outline" onClick={() => setDone(false)}>
              আরেকটি বুকিং
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="c-name">নাম</Label>
                <Input
                  id="c-name"
                  className="mt-1.5 h-11"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
              </div>
              <div>
                <Label htmlFor="c-phone">মোবাইল</Label>
                <Input
                  id="c-phone"
                  className="mt-1.5 h-11"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                />
                {errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label>আগ্রহের বিষয়</Label>
                <Select value={form.interest} onValueChange={(v) => setForm({ ...form, interest: v })}>
                  <SelectTrigger className="mt-1.5 h-11">
                    <SelectValue placeholder="বাছাই করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.slug} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors["interest"] && (
                  <p className="mt-1 text-xs text-destructive">{errors["interest"]}</p>
                )}
              </div>
              <div>
                <Label>পছন্দের সময়</Label>
                <Select value={form.slot} onValueChange={(v) => setForm({ ...form, slot: v })}>
                  <SelectTrigger className="mt-1.5 h-11">
                    <SelectValue placeholder="সময় বাছাই" />
                  </SelectTrigger>
                  <SelectContent>
                    {slots.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors["slot"] && <p className="mt-1 text-xs text-destructive">{errors["slot"]}</p>}
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="c-note">সংক্ষিপ্ত নোট (ঐচ্ছিক)</Label>
              <Textarea
                id="c-note"
                className="mt-1.5 min-h-24"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="আপনার বর্তমান অবস্থা ও লক্ষ্য"
              />
            </div>

            <Button type="submit" className="mt-6 h-12 w-full bg-spark text-accent-foreground">
              ফ্রি সেশন বুক করুন
            </Button>
          </form>
        )}
      </section>
    </PublicShell>
  );
}
