import type { ReactNode } from "react";

import { MobileTabBar, SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-noise opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-cobalt opacity-30 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-eh relative py-14 sm:py-20">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
