import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";

const title = "Terms of Service — ElevateHub Ltd";
const description =
  "Terms of use for the ElevateHub Ltd platform, including account policies and course access rules.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="Last updated: August 1, 2026"
      sections={[
        {
          heading: "Accounts",
          body: [
            "You must provide an accurate name, phone number, and email address when registering on the platform. Each account may only be used by a single student.",
            "You are responsible for keeping your account password secure. Report any suspicious activity to us immediately.",
          ],
        },
        {
          heading: "Course Access",
          body: [
            "Course access is activated once payment is verified. Recording, sharing, or reselling course content is strictly prohibited.",
            "Accounts found in violation of these policies may be suspended, and no refund will apply in such cases.",
          ],
        },
        {
          heading: "Certificates",
          body: [
            "A verified certificate is issued once you complete at least 80% of a course's lessons along with the final assignment.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "We are committed to providing quality education and guidance, but we do not guarantee any specific income or job outcome.",
          ],
        },
      ]}
    />
  ),
});
