import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CobaltCube } from "@/components/motion/Motion";
import { useStore } from "@/lib/store";

const title = "Sign In — ElevateHub Ltd";
const description = "Sign in to your ElevateHub account to continue your courses, track progress, and access live cohorts.";

export const Route = createFileRoute("/auth/login")({
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
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    void navigate({ to: "/dashboard" });
  }




  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border/60 bg-surface lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 grid-noise opacity-40" aria-hidden="true" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cobalt opacity-30 blur-3xl" aria-hidden="true" />
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
            "Learning here felt calm, structured, and premium — exactly what I needed to switch careers."
          </p>
          <p className="mt-3 text-sm text-muted-foreground">— An ElevateHub learner</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-14 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="mb-8 inline-block text-xl font-extrabold tracking-tight lg:hidden">
            Elevate<span className="text-accent">Hub</span>
          </Link>
          <h1 className="text-2xl font-extrabold sm:text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to continue your learning journey.</p>

          <div className="mt-7" />


          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/auth/forgot-password" className="text-xs font-medium text-accent hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12 pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="h-12 w-full bg-spark text-accent-foreground" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/auth/register" className="font-medium text-accent hover:underline">
              Create one
            </Link>
          </p>

          <div className="mt-6 rounded-xl border border-border bg-secondary/40 p-4 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Demo credentials</p>
            <p>Learner: <span className="font-mono">learner@demo.com</span> / <span className="font-mono">demo1234</span></p>
            <p>Admin: <span className="font-mono">admin@demo.com</span> / <span className="font-mono">demo1234</span></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
