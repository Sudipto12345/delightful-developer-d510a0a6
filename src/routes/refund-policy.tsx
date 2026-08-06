import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";

const title = "রিফান্ড নীতি — ElevateHub Ltd";
const description =
  "কোর্স ফেরত ও রিফান্ডের শর্ত, সময়সীমা এবং আবেদন প্রক্রিয়া সম্পর্কে বিস্তারিত জানুন।";

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
      eyebrow="আইনি"
      title="রিফান্ড নীতি"
      updated="সর্বশেষ হালনাগাদ: ১ আগস্ট, ২০২৬"
      sections={[
        {
          heading: "৭ দিনের নিশ্চয়তা",
          body: [
            "কোর্স শুরুর ৭ দিনের মধ্যে যদি ২০%-এর কম কনটেন্ট দেখে থাকেন, তাহলে সম্পূর্ণ ফি ফেরতের আবেদন করতে পারবেন।",
          ],
        },
        {
          heading: "যেসব ক্ষেত্রে রিফান্ড প্রযোজ্য নয়",
          body: [
            "২০%-এর বেশি কনটেন্ট সম্পন্ন করলে, সার্টিফিকেট ইস্যু হলে, অথবা নীতিমালা লঙ্ঘনের কারণে অ্যাকাউন্ট স্থগিত হলে রিফান্ড প্রযোজ্য নয়।",
            "ফ্রি ওয়েবিনার ও ডিসকাউন্ট বান্ডেলের ক্ষেত্রে আলাদা শর্ত প্রযোজ্য হতে পারে।",
          ],
        },
        {
          heading: "আবেদন প্রক্রিয়া",
          body: [
            "support@elevatehubltd.com ঠিকানায় আপনার নাম, মোবাইল নম্বর ও ট্রানজেকশন আইডি পাঠান।",
            "আবেদন যাচাইয়ের পর ৭–১০ কর্মদিবসের মধ্যে একই বিকাশ/নগদ/ব্যাংক অ্যাকাউন্টে টাকা ফেরত দেওয়া হয়।",
          ],
        },
      ]}
    />
  ),
});
