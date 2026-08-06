import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";

const title = "গোপনীয়তা নীতি — ElevateHub Ltd";
const description =
  "আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখা হয় — ElevateHub Ltd-এর গোপনীয়তা নীতি।";

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
      eyebrow="আইনি"
      title="গোপনীয়তা নীতি"
      updated="সর্বশেষ হালনাগাদ: ১ আগস্ট, ২০২৬"
      sections={[
        {
          heading: "কী তথ্য সংগ্রহ করি",
          body: [
            "নাম, মোবাইল নম্বর, ইমেইল, জেলা এবং কোর্স অগ্রগতি সংক্রান্ত তথ্য আমরা সংরক্ষণ করি।",
            "ম্যানুয়াল পেমেন্টের ক্ষেত্রে শুধুমাত্র ট্রানজেকশন আইডি ও পরিমাণ সংরক্ষণ করা হয়; কোনো পিন বা ওটিপি কখনোই চাওয়া হয় না।",
          ],
        },
        {
          heading: "তথ্যের ব্যবহার",
          body: [
            "কোর্স অ্যাক্সেস চালু করা, সাপোর্ট দেওয়া, ব্যাচের আপডেট জানানো এবং শেখার অভিজ্ঞতা উন্নত করতে তথ্য ব্যবহৃত হয়।",
            "আপনার তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি করা হয় না।",
          ],
        },
        {
          heading: "নিরাপত্তা",
          body: [
            "ডেটা এনক্রিপ্টেড সংযোগে আদান-প্রদান হয় এবং কেবল অনুমোদিত টিম সদস্যরাই প্রয়োজনীয় তথ্য দেখতে পারেন।",
          ],
        },
        {
          heading: "আপনার অধিকার",
          body: [
            "যেকোনো সময় আপনার তথ্য সংশোধন বা অ্যাকাউন্ট মুছে ফেলার অনুরোধ করতে পারেন — support@elevatehubltd.com ঠিকানায় লিখুন।",
          ],
        },
      ]}
    />
  ),
});
