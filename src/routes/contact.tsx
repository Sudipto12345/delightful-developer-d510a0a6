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
import { Reveal } from "@/components/motion/Motion";

const title = "Contact Us — ElevateHub Ltd";
const description =
  "Have a question about enrollment, courses, or payments? Get in touch with us. New York office, hotline, and chat support.";

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
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(60),
  phone: z.string().trim().min(11, "Please enter a valid phone number").max(15),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(800),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "phone" | "email" | "message", string>>
  >({});

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
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <PublicShell>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Course selection, payments, or career advice — send us a message about anything."
      />

      <section className="container-eh grid gap-6 py-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Reveal>
          <form
            onSubmit={submit}
            className="rounded-2xl border border-border bg-card p-6"
            noValidate
          >
            <h2 className="text-lg font-bold">Send a Message</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 h-11"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1.5 h-11"
                  placeholder="+1 (386) 296-1378"
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5 min-h-32"
                placeholder="How can we help?"
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button
              type="submit"
              className="mt-5 h-12 w-full bg-spark text-accent-foreground sm:w-auto"
            >
              Send Message
            </Button>
          </form>
        </Reveal>

        <aside>
          <Reveal delay={0.12} className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold">Direct Contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-accent" /> Hotline: +1 (386) 296-1378
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="h-4 w-4 shrink-0 text-accent" /> WhatsApp: +1 (386) 296-1378
                </li>
                <li className="flex gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-accent" /> support@elevatehubltd.com
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" /> 76-30 46th Ave, Elmhurst, NY 11374
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold">Support Hours</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mon – Fri: 10:00 AM – 9:00 PM
                <br />
                Saturday: 4:00 PM – 9:00 PM
              </p>
            </div>
          </Reveal>
        </aside>
      </section>
    </PublicShell>
  );
}
