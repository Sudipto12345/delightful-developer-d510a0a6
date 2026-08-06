import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";

const title = "Refund Policy — ElevateHub Ltd";
const description =
  "Learn the terms, timelines, and process for course refunds in detail.";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      updated="Last updated: August 1, 2026"
      sections={[
        {
          heading: "7-Day Guarantee",
          body: [
            "If you have viewed less than 20% of a course's content within 7 days of starting, you may request a full refund.",
          ],
        },
        {
          heading: "When Refunds Do Not Apply",
          body: [
            "Refunds do not apply once more than 20% of the content has been completed, once a certificate has been issued, or if an account is suspended for a policy violation.",
            "Separate terms may apply to free webinars and discounted bundles.",
          ],
        },
        {
          heading: "How to Apply",
          body: [
            "Send your name, phone number, and transaction ID to support@elevatehubltd.com.",
            "Once your request is verified, the refund is issued to the original Bank Transfer, PayPal, or Wise account within 7–10 business days.",
          ],
        },
      ]}
    />
  ),
});
