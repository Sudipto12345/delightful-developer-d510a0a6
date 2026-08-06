import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { CourseCard } from "@/components/course/CourseCard";
import { PageHero, PublicShell } from "@/components/layout/PublicShell";
import { Stagger, StaggerItem } from "@/components/motion/Motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/courses";
import { bn, useStore } from "@/lib/store";

const title = "সব কোর্স — ElevateHub Ltd";
const description =
  "ওয়েব ডেভেলপমেন্ট, গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং, ফ্রিল্যান্সিং, ডেটা ও এআই এবং স্পোকেন ইংলিশ — বাংলায় সব কোর্স এক জায়গায়।";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { courses } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [level, setLevel] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = courses.filter((c) => c.published);
    if (q.trim())
      list = list.filter(
        (c) => c.title.includes(q.trim()) || c.subtitle.includes(q.trim()),
      );
    if (cat !== "all") list = list.filter((c) => c.category === cat);
    if (level !== "all") list = list.filter((c) => c.level === level);
    if (price === "under3000") list = list.filter((c) => c.price < 3000);
    if (price === "3000-6000") list = list.filter((c) => c.price >= 3000 && c.price <= 6000);
    if (price === "above6000") list = list.filter((c) => c.price > 6000);

    const sorted = [...list];
    if (sort === "popular") sorted.sort((a, b) => b.students - a.students);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [courses, q, cat, level, price, sort]);

  const reset = () => {
    setQ("");
    setCat("all");
    setLevel("all");
    setPrice("all");
    setSort("popular");
  };

  return (
    <PublicShell>
      <PageHero
        eyebrow="কোর্স ক্যাটালগ"
        title="আপনার জন্য সঠিক কোর্সটি খুঁজে নিন"
        description="ফিল্টার করে সহজেই খুঁজে নিন আপনার লেভেল, বাজেট ও আগ্রহ অনুযায়ী কোর্স।"
      />

      <section className="container-eh py-8 sm:py-12">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <div className="relative min-w-0">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="কোর্স খুঁজুন..."
                className="h-11 pl-9"
                aria-label="কোর্স খুঁজুন"
              />
            </div>
            <Button
              variant="outline"
              className="h-11 shrink-0 lg:hidden"
              onClick={() => setShowFilters((v) => !v)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className={`${showFilters ? "grid" : "hidden"} gap-2 sm:grid-cols-2 lg:grid lg:grid-cols-4`}>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="ক্যাটাগরি" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="লেভেল" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব লেভেল</SelectItem>
                <SelectItem value="beginner">বিগিনার</SelectItem>
                <SelectItem value="intermediate">ইন্টারমিডিয়েট</SelectItem>
                <SelectItem value="advanced">অ্যাডভান্সড</SelectItem>
              </SelectContent>
            </Select>

            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="বাজেট" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব বাজেট</SelectItem>
                <SelectItem value="under3000">৩,০০০ টাকার নিচে</SelectItem>
                <SelectItem value="3000-6000">৩,০০০ – ৬,০০০ টাকা</SelectItem>
                <SelectItem value="above6000">৬,০০০ টাকার উপরে</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="সাজান" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">জনপ্রিয়তা</SelectItem>
                <SelectItem value="rating">রেটিং</SelectItem>
                <SelectItem value="price-low">দাম: কম থেকে বেশি</SelectItem>
                <SelectItem value="price-high">দাম: বেশি থেকে কম</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {bn(filtered.length)} টি কোর্স পাওয়া গেছে
          </p>
          <Button variant="ghost" size="sm" onClick={reset}>
            ফিল্টার রিসেট
          </Button>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-semibold">কোনো কোর্স পাওয়া যায়নি</p>
            <p className="mt-2 text-sm text-muted-foreground">
              অন্য কীওয়ার্ড বা ফিল্টার দিয়ে চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <StaggerItem key={c.id} className="h-full">
                <CourseCard course={c} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>
    </PublicShell>
  );
}
