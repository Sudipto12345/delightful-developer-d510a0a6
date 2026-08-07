import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, GraduationCap, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { toast } from "sonner";

import { categories } from "@/data/courses";
import { KanthaDivider, KanthaMotif } from "@/components/motion/NakshiKantha";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed — welcome to the ElevateHub newsletter!");
    setEmail("");
  }

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60 bg-surface/40">
      <KanthaMotif
        size={220}
        className="pointer-events-none absolute -top-16 -right-16 opacity-[0.06]"
      />

      {/* Newsletter band — diagonal-cut edge for sports/youth energy */}
      <div className="relative border-b border-border/60">
        <div
          className="absolute inset-0 bg-cobalt opacity-90"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 78%)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 grid-noise opacity-20" aria-hidden="true" />
        <div className="container-eh relative flex flex-col items-start gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <h3 className="text-xl font-extrabold text-white sm:text-2xl">
              Get new courses &amp; batch alerts
            </h3>
            <p className="mt-1.5 text-sm text-white/80">
              One useful email a week. No spam, unsubscribe anytime.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-sm gap-2 sm:w-auto"
            noValidate
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.03] active:scale-95"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="container-eh relative">
        <KanthaDivider className="pt-8" segments={18} />
      </div>

      <div className="container-eh relative grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl bg-spark"
              style={{ clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)" }}
            >
              <GraduationCap className="h-5 w-5 text-accent-foreground" />
            </span>
            <span className="text-lg font-bold">ElevateHub Ltd</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A skills-first online learning platform for ambitious people worldwide. Learn, get
            certified, and grow your career.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border transition-colors hover:border-accent/60 hover:bg-secondary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border transition-colors hover:border-accent/60 hover:bg-secondary"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Categories</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="transition-colors hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors hover:text-foreground">
                About us
              </Link>
            </li>
            <li>
              <Link to="/instructors" className="transition-colors hover:text-foreground">
                Our mentors
              </Link>
            </li>
            <li>
              <Link to="/corporate" className="transition-colors hover:text-foreground">
                Corporate training
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="transition-colors hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-foreground">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/consultation" className="transition-colors hover:text-foreground">
                Free consultation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>20 Fenchurch Street, London EC3M 3BY, United Kingdom</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="tel:+14155550100" className="transition-colors hover:text-foreground">
                +1 (415) 555-0100
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a
                href="mailto:hello@elevatehubltd.com"
                className="transition-colors hover:text-foreground"
              >
                hello@elevatehubltd.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border/60">
        <div className="container-eh flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ElevateHub Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className="transition-colors hover:text-foreground">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="h-16 lg:hidden" />
    </footer>
  );
}
