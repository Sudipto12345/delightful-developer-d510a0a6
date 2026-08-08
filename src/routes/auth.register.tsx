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

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
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
    if (data.session) {
      toast.success("Account created. Welcome!");
      void navigate({ to: "/dashboard" });
      return;
    }
    setSubmitted(true);
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

              <div className="mt-7" />


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
