import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";

const title = "Privacy Policy — ElevateHub Ltd";
const description =
  "How ElevateHub Ltd collects, uses, and protects your information — our privacy policy.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="Last updated: August 1, 2026"
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "We store your name, phone number, email, region, and course progress information.",
            "For manual payments, we only store the transaction ID and amount; we never ask for your PIN or OTP.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "We use your information to activate course access, provide support, share batch updates, and improve your learning experience.",
            "We never sell your information to any third party.",
          ],
        },
        {
          heading: "Security",
          body: [
            "Data is exchanged over encrypted connections, and only authorized team members can access the information they need.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            "You may request to correct your information or delete your account at any time — write to support@elevatehubltd.com.",
          ],
        },
      ]}
    />
  ),
});
