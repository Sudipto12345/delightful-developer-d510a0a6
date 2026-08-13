import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, Clock, Loader2, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourseImage } from "@/data/courseImages";
import { useCatalog } from "@/hooks/useCatalog";
import { useAuth } from "@/hooks/useAuth";
import { startCoursePurchase } from "@/lib/payments.functions";
import { usePaidCourses } from "@/hooks/usePaidCourses";

export const Route = createFileRoute("/checkout/$slug")({
  head: ({ params }) => {
    const name = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const title = `Buy ${name} | ElevateHub Ltd`;
    const description = `Secure checkout for ${name}. Pay by card through Airwallex and get instant lifetime access.`;
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

function CheckoutPage() {
  const { slug } = Route.useParams();
  const { courses, instructors, loading: catalogLoading } = useCatalog();
  const course = courses.find((c) => c.slug === slug);
  const { slugs: paidSlugs } = usePaidCourses();
  const { user } = useAuth();
  const navigate = useNavigate();
  const instructor = instructors.find((i) => i.id === course?.instructorId);
  const [loading, setLoading] = useState(false);
  const [guest, setGuest] = useState({ name: "", email: "", password: "" });

  const already = course ? paidSlugs.has(course.slug) : false;

  const buyNow = async () => {
    if (!course) return;
    setLoading(true);
    try {
      if (!user) {
        if (guest.name.trim().length < 2) throw new Error("Please enter your full name.");
        if (!/^\S+@\S+\.\S+$/.test(guest.email.trim())) throw new Error("Please enter a valid email.");
        if (guest.password.length < 8) throw new Error("Password must be at least 8 characters.");

        const { error } = await supabase.auth.signUp({
          email: guest.email.trim(),
          password: guest.password,
          options: { data: { full_name: guest.name.trim() } },
        });
        if (error) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: guest.email.trim(),
            password: guest.password,
          });
          if (signInError)
            throw new Error("That email already has an account — please sign in to continue.");
        }
      }
      const res = await startCoursePurchase({
        data: { slug: course.slug, origin: window.location.origin },
      });
      window.location.href = res.checkoutUrl;
    } catch (err) {
      setLoading(false);
      toast.error(err instanceof Error ? err.message : "Could not start checkout. Please try again.");
    }
  };


  if (!course) {
    return (
      <PublicShell>
        <div className="container-eh py-24 text-center">
          <h1 className="text-2xl font-bold">
            {catalogLoading ? "Loading checkout…" : "Course not found"}
          </h1>
          {!catalogLoading && (
            <Button asChild className="mt-6">
              <Link to="/courses">Browse all courses</Link>
            </Button>
          )}
        </div>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <section className="border-b border-border/60">
        <div className="container-eh grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <Badge className="bg-accent text-accent-foreground">Secure Checkout</Badge>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Buy this course</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Payments are processed by Airwallex over an encrypted connection. The moment your card
              payment is verified, {course.title} unlocks in your dashboard — no waiting for approval.
            </p>

            {already ? (
              <div className="mt-8 max-w-xl rounded-sm border border-success/40 bg-success/10 p-6">
                <p className="text-lg font-bold">You already own this course</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Jump straight into the lessons from your dashboard.
                </p>
                <Button className="mt-4" onClick={() => navigate({ to: "/dashboard" })}>
                  Go to Dashboard
                </Button>
              </div>
            ) : (
              <div className="mt-8 max-w-xl space-y-5 rounded-sm border border-border bg-card p-6">
                <div className="flex items-baseline justify-between border-b border-border pb-4">
                  <span className="text-sm text-muted-foreground">Order total</span>
                  <span className="font-display text-3xl font-extrabold">
                    ${course.price.toLocaleString("en-US")}
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-accent" /> Card details are handled by Airwallex — we
                    never see them.
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent" /> Instant access on successful payment.
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" /> Live orientation with{" "}
                    {instructor?.name ?? "your mentor"}.
                  </li>
                </ul>

                {!user && (
                  <div className="space-y-3 rounded-sm border border-border bg-secondary/40 p-4">
                    <p className="text-sm font-semibold">
                      Create your account — takes 10 seconds, no email verification needed.
                    </p>
                    <div className="space-y-1.5">
                      <Label htmlFor="guest-name">Full name</Label>
                      <Input
                        id="guest-name"
                        value={guest.name}
                        onChange={(e) => setGuest((g) => ({ ...g, name: e.target.value }))}
                        placeholder="Jane Cooper"
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="guest-email">Email</Label>
                      <Input
                        id="guest-email"
                        type="email"
                        value={guest.email}
                        onChange={(e) => setGuest((g) => ({ ...g, email: e.target.value }))}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="guest-password">Password</Label>
                      <Input
                        id="guest-password"
                        type="password"
                        value={guest.password}
                        onChange={(e) => setGuest((g) => ({ ...g, password: e.target.value }))}
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Already have an account?{" "}
                      <Link to="/auth/login" className="font-semibold text-accent">
                        Sign in
                      </Link>
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => void buyNow()}
                  disabled={loading}
                  size="lg"
                  className="h-12 w-full bg-spark text-accent-foreground"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting to Airwallex…
                    </>
                  ) : (
                    <>Buy Now — ${course.price.toLocaleString("en-US")}</>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {user ? "You'll return here automatically after payment." : "Your account is created instantly, then you pay securely with Airwallex."}
                </p>
              </div>
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
                  <span className="text-2xl font-extrabold text-accent">
                    ${course.price.toLocaleString("en-US")}
                  </span>
                  {course.oldPrice && (
                    <span className="pb-1 text-sm text-muted-foreground line-through">
                      ${course.oldPrice.toLocaleString("en-US")}
                    </span>
                  )}
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
                </ul>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/courses">Browse other courses</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PublicShell>
  );
}
