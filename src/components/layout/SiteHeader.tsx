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
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/lib/store";

type NavChild = { to: string; label: string; desc: string };
type NavItem = { to: string; label: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/courses",
    label: "Learn",
    children: [
      { to: "/courses", label: "All Courses", desc: "Browse the full catalog by skill and level" },
      { to: "/categories/web-development", label: "Web Development", desc: "Full-stack, React, APIs" },
      { to: "/categories/graphic-design", label: "Design", desc: "Brand, UI/UX and visual craft" },
      { to: "/categories/digital-marketing", label: "Marketing", desc: "Growth, ads and analytics" },
      { to: "/categories/data-ai", label: "Data & AI", desc: "Python, analytics, AI at work" },
      { to: "/pricing", label: "Pricing", desc: "Plans, bundles and refunds" },
    ],
  },
  {
    to: "/instructors",
    label: "Community",
    children: [
      { to: "/instructors", label: "Mentors", desc: "Meet the industry practitioners" },
      { to: "/events", label: "Events", desc: "Live webinars and bootcamps" },
      { to: "/blog", label: "Blog", desc: "Guides, playbooks and career tips" },
      { to: "/consultation", label: "Free Consultation", desc: "Talk to an advisor in 15 minutes" },
    ],
  },
  {
    to: "/corporate",
    label: "Company",
    children: [
      { to: "/corporate", label: "For Teams", desc: "Upskill your whole organization" },
      { to: "/about", label: "About Us", desc: "Our story, mission and standards" },
      { to: "/faq", label: "FAQ", desc: "Answers to the common questions" },
      { to: "/contact", label: "Contact", desc: "Talk to our support team" },
    ],
  },
];

const mobileNav: { to: string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/instructors", label: "Mentors" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/pricing", label: "Pricing" },
  { to: "/corporate", label: "For Teams" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const { session: storeSession } = useStore();
  const isLoggedIn = Boolean(session || storeSession);
  const { theme, toggleTheme } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      {/* Speed-line accent strip — youth/sports energy, diagonal cut */}
      <div className="relative h-[3px] overflow-hidden bg-spark">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, transparent 0 18px, color-mix(in oklab, white 55%, transparent) 18px 20px)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-eh grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5">
          <span
            className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-spark soft-shadow transition-transform duration-300 group-hover:-rotate-6"
            style={{ clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)" }}
          >
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base leading-tight font-bold">ElevateHub</span>
            <span className="block text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Limited
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-x-1.5 -bottom-[1px] h-[2px] rounded-full bg-spark"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {isLoggedIn && (
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/admin">Admin</Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to={isLoggedIn ? "/dashboard" : "/auth/login"}>
              {isLoggedIn ? "Dashboard" : "Log in"}
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="hidden bg-spark text-accent-foreground sm:inline-flex"
          >
            <Link to="/courses">
              <Sparkles className="mr-1 h-4 w-4" /> Start learning
            </Link>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border lg:hidden"
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
              {navItems.map((item, i) => {
                const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary hover:text-foreground ${
                        active ? "bg-secondary text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link to="/auth/login" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button asChild className="bg-spark text-accent-foreground">
                  <Link to="/auth/register" onClick={() => setOpen(false)}>
                    Sign up
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
  { to: "/", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/dashboard", label: "My hub", icon: LayoutDashboard },
  { to: "/contact", label: "Contact", icon: Phone },
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
                className="relative flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px]"
              >
                {active && (
                  <motion.span
                    layoutId="tab-active-dash"
                    className="absolute top-0 h-[2px] w-8 rounded-full bg-spark"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
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
