import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/content";

const title = "Frequently Asked Questions (FAQ) — ElevateHub Ltd";
const description =
  "Answers to the most common questions about courses, payments, certificates, and mentor support.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Can't find an answer? Get in touch with us — we respond quickly."
      />
      <section className="container-eh max-w-3xl py-12">
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-4">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="font-semibold">Still have questions?</p>
          <Button asChild className="mt-4 bg-spark text-accent-foreground">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
