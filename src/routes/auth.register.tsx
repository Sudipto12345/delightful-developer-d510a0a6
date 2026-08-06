import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lock, Mail, MailCheck, User } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CobaltCube } from "@/components/motion/Motion";

const title = "Create Account — ElevateHub Ltd";
const description = "Create your free ElevateHub account to enroll in courses, join live cohorts, and track your learning progress.";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.4-1.65 4.1-5.27 4.1a5.78 5.78 0 0 1 0-11.56c1.64 0 2.75.7 3.38 1.3l2.3-2.22C16.42 4.2 14.5 3.3 12.18 3.3a8.7 8.7 0 1 0 0 17.4c5 0 8.34-3.52 8.34-8.48 0-.57-.06-1-.17-1.12Z"
      />
    </svg>
  );
}

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSubmitted(true);
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    try {
      const { lovable } = await import("@/integrations/lovable/index");
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Google sign-in failed");
        setGoogleLoading(false);
        return;
      }
      if (result.redirected) return;
      setGoogleLoading(false);
    } catch {
      toast.error("Google sign-in is not available right now.");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border/60 bg-surface lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 grid-noise opacity-40" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cobalt opacity-30 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 p-10">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            Elevate<span className="text-accent">Hub</span>
          </Link>
        </div>
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <CobaltCube />
        </div>
        <div className="relative z-10 p-10">
          <p className="max-w-sm text-lg font-semibold leading-relaxed text-foreground">
            Join thousands of learners building real, in-demand skills with expert-led courses.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-14 sm:px-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="w-full max-w-sm text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                <MailCheck className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-extrabold">Check your email</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We've sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. Click it to
                activate your account before signing in.
              </p>
              <Button asChild className="mt-7 h-12 w-full">
                <Link to="/auth/login">Back to Sign In</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm"
            >
              <Link to="/" className="mb-8 inline-block text-xl font-extrabold tracking-tight lg:hidden">
                Elevate<span className="text-accent">Hub</span>
              </Link>
              <h1 className="text-2xl font-extrabold sm:text-3xl">Create your account</h1>
              <p className="mt-2 text-sm text-muted-foreground">Start learning in less than a minute.</p>

              <Button
                type="button"
                variant="outline"
                className="mt-7 h-12 w-full gap-2"
                onClick={handleGoogle}
                disabled={googleLoading}
              >
                {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
                Continue with Google
              </Button>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full name</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="fullName"
                      required
                      placeholder="Jordan Smith"
                      className="h-12 pl-9"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="h-12 pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="At least 6 characters"
                      className="h-12 pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="h-12 w-full bg-spark text-accent-foreground" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/auth/login" className="font-medium text-accent hover:underline">
                  Sign in
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
