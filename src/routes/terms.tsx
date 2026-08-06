import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";

const title = "শর্তাবলি — ElevateHub Ltd";
const description =
  "ElevateHub Ltd প্ল্যাটফর্ম ব্যবহারের শর্তাবলি, অ্যাকাউন্ট নীতিমালা ও কোর্স অ্যাক্সেস সংক্রান্ত নিয়ম।";

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
      eyebrow="আইনি"
      title="ব্যবহারের শর্তাবলি"
      updated="সর্বশেষ হালনাগাদ: ১ আগস্ট, ২০২৬"
      sections={[
        {
          heading: "অ্যাকাউন্ট",
          body: [
            "প্ল্যাটফর্মে নিবন্ধনের সময় সঠিক নাম, মোবাইল নম্বর ও ইমেইল দিতে হবে। একটি অ্যাকাউন্ট শুধুমাত্র একজন শিক্ষার্থী ব্যবহার করতে পারবেন।",
            "অ্যাকাউন্টের পাসওয়ার্ড সুরক্ষিত রাখার দায়িত্ব ব্যবহারকারীর। সন্দেহজনক কার্যক্রম দেখলে সাথে সাথে আমাদের জানাতে হবে।",
          ],
        },
        {
          heading: "কোর্স অ্যাক্সেস",
          body: [
            "পেমেন্ট যাচাই সম্পন্ন হলে কোর্সে অ্যাক্সেস চালু হয়। কোর্স কনটেন্ট রেকর্ড, শেয়ার বা পুনর্বিক্রয় সম্পূর্ণ নিষিদ্ধ।",
            "নীতিমালা লঙ্ঘন প্রমাণিত হলে অ্যাকাউন্ট স্থগিত করা হতে পারে এবং সেক্ষেত্রে কোনো ফেরত প্রযোজ্য নয়।",
          ],
        },
        {
          heading: "সার্টিফিকেট",
          body: [
            "কোর্সের ন্যূনতম ৮০% লেসন ও ফাইনাল অ্যাসাইনমেন্ট সম্পন্ন করলে ভেরিফায়েড সার্টিফিকেট ইস্যু করা হয়।",
          ],
        },
        {
          heading: "দায়সীমা",
          body: [
            "আমরা মানসম্পন্ন শিক্ষা ও গাইডলাইন দিতে প্রতিশ্রুতিবদ্ধ, তবে নির্দিষ্ট আয় বা চাকরির নিশ্চয়তা দিই না।",
          ],
        },
      ]}
    />
  ),
});
