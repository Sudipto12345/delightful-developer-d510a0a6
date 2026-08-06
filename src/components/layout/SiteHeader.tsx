import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  Menu,
  Moon,
  Phone,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";

const navItems = [
  { to: "/", label: "হোম" },
  { to: "/courses", label: "কোর্সসমূহ" },
  { to: "/instructors", label: "মেন্টর" },
  { to: "/events", label: "ইভেন্ট" },
  { to: "/blog", label: "ব্লগ" },
  { to: "/corporate", label: "কর্পোরেট" },
  { to: "/about", label: "আমাদের সম্পর্কে" },
  { to: "/contact", label: "যোগাযোগ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session } = useStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-eh grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-spark soft-shadow">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base leading-tight font-bold">ElevateHub</span>
            <span className="block text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Limited
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন"}
            title={theme === "dark" ? "লাইট মোড" : "ডার্ক মোড"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to={session ? "/dashboard" : "/auth/login"}>
              {session ? "ড্যাশবোর্ড" : "লগইন"}
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden bg-spark text-accent-foreground sm:inline-flex">
            <Link to="/courses">
              <Sparkles className="mr-1 h-4 w-4" /> শেখা শুরু করুন
            </Link>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="মেনু"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border/60 lg:hidden"
          >
            <div className="container-eh grid gap-1 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-foreground" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link to="/auth/login" onClick={() => setOpen(false)}>
                    লগইন
                  </Link>
                </Button>
                <Button asChild className="bg-spark text-accent-foreground">
                  <Link to="/auth/register" onClick={() => setOpen(false)}>
                    রেজিস্ট্রেশন
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const mobileTabs = [
  { to: "/", label: "হোম", icon: Home },
  { to: "/courses", label: "কোর্স", icon: BookOpen },
  { to: "/dashboard", label: "আমার", icon: LayoutDashboard },
  { to: "/contact", label: "যোগাযোগ", icon: Phone },
] as const;

export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
      <ul className="grid grid-cols-4">
        {mobileTabs.map((tab) => {
          const active = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                className="flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px]"
              >
                <tab.icon
                  className={`h-5 w-5 ${active ? "text-accent" : "text-muted-foreground"}`}
                />
                <span className={active ? "text-foreground" : "text-muted-foreground"}>
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
