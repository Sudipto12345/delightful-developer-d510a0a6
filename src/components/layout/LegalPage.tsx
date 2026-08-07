import type { ReactNode } from "react";

import { PageHero, PublicShell } from "./PublicShell";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Motion";

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
  children?: ReactNode;
}) {
  return (
    <PublicShell>
      <PageHero eyebrow={eyebrow} title={title} description={updated} />
      <section className="container-eh max-w-3xl py-12">
        <Stagger className="space-y-8">
          {sections.map((s) => (
            <StaggerItem key={s.heading}>
              <h2 className="text-xl font-bold">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        {children && <Reveal delay={0.1}>{children}</Reveal>}
      </section>
    </PublicShell>
  );
}
