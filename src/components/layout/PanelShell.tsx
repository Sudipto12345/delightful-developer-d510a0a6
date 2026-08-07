import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import logoMark from "@/assets/logo-mark.png";

export type PanelNavItem = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number | undefined;
};

type PanelShellProps = {
  title: string;
  subtitle?: string;
  items: PanelNavItem[];
  active: string;
  onSelect: (id: string) => void;
  onLogout?: () => void;
  children: ReactNode;
};

function NavList({
  items,
  active,
  onSelect,
}: Pick<PanelShellProps, "items" | "active" | "onSelect">) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary/15 text-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="panel-active"
                className="absolute inset-y-1 left-0 w-1 rounded-full bg-accent"
              />
            )}
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 truncate">{item.label}</span>
            {!!item.badge && item.badge > 0 && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

export function PanelShell({
  title,
  subtitle,
  items,
  active,
  onSelect,
  onLogout,
  children,
}: PanelShellProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const header = (
    <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
      <img src={logoMark} alt="ElevateHub Ltd logo" className="h-8 w-8 shrink-0" />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{title}</p>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );

  const footer = (
    <div className="space-y-2 border-t border-sidebar-border p-3">
      {onLogout && (
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      )}
      <Button asChild variant="outline" size="sm" className="w-full">
        <Link to="/">← Back to site</Link>
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        {header}
        <NavList items={items} active={active} onSelect={onSelect} />
        {footer}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="relative">
                {header}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="absolute top-4 right-3 grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-sidebar-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <NavList
                items={items}
                active={active}
                onSelect={(id) => {
                  onSelect(id);
                  setOpen(false);
                }}
              />
              {footer}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Floating mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed bottom-5 left-4 z-30 flex items-center gap-2 rounded-full border border-border bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg md:hidden"
      >
        <Menu className="h-4 w-4" /> Menu
      </button>

      <main className="min-w-0 flex-1 px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-10">{children}</main>
    </div>
  );
}
