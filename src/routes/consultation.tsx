import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
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

const title = "Free Career Consultation — ElevateHub Ltd";
const description =
  "Not sure which skill is right for you? Book a free 15-minute career consultation with one of our mentors.";

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
  name: z.string().trim().min(2, "Please enter your name").max(60),
  phone: z.string().trim().min(11, "Please enter a valid phone number").max(15),
  interest: z.string().min(1, "Please select a topic of interest"),
  slot: z.string().min(1, "Please select a time slot"),
  note: z.string().trim().max(400).optional(),
});

const slots = [
  "11:00 AM – 11:15 AM",
  "2:00 PM – 2:15 PM",
  "5:00 PM – 5:15 PM",
  "8:30 PM – 8:45 PM",
];

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
    toast.success("Consultation booked! We'll call to confirm.");
  };

  return (
    <PublicShell>
      <PageHero
        eyebrow="Free Session"
        title="Career direction in 15 minutes"
        description="Which skill, how long it takes, how to earn — talk to a mentor and leave with a clear plan."
      />
      <section className="container-eh max-w-2xl py-12">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-success/40 bg-card p-8 text-center"
            >
              <h2 className="text-xl font-bold text-success">Booking Confirmed</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Our mentor will call {form.phone} during the {form.slot} slot.
              </p>
              <Button className="mt-6" variant="outline" onClick={() => setDone(false)}>
                Book Another Session
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-card p-6"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="c-name">Name</Label>
                  <Input
                    id="c-name"
                    className="mt-1.5 h-11"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors["name"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="c-phone">Phone</Label>
                  <Input
                    id="c-phone"
                    className="mt-1.5 h-11"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (415) 555-0100"
                  />
                  {errors["phone"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Area of Interest</Label>
                  <Select
                    value={form.interest}
                    onValueChange={(v) => setForm({ ...form, interest: v })}
                  >
                    <SelectTrigger className="mt-1.5 h-11">
                      <SelectValue placeholder="Select an option" />
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
                  <Label>Preferred Time</Label>
                  <Select value={form.slot} onValueChange={(v) => setForm({ ...form, slot: v })}>
                    <SelectTrigger className="mt-1.5 h-11">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {slots.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors["slot"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["slot"]}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="c-note">Brief Note (optional)</Label>
                <Textarea
                  id="c-note"
                  className="mt-1.5 min-h-24"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Your current situation and goals"
                />
              </div>

              <Button type="submit" className="mt-6 h-12 w-full bg-spark text-accent-foreground">
                Book Free Session
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </PublicShell>
  );
}
