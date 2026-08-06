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
import { useStore } from "@/lib/store";

const title = "All Courses — ElevateHub Ltd";
const description =
  "Web development, graphic design, digital marketing, freelancing, data & AI, and spoken English — every course in one place.";

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
        eyebrow="Course Catalog"
        title="Find the right course for you"
        description="Filter easily to find courses that match your level, budget, and interests."
      />

      <section className="container-eh py-8 sm:py-12">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <div className="relative min-w-0">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses..."
                className="h-11 pl-9"
                aria-label="Search courses"
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
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="under3000">Under $3,000</SelectItem>
                <SelectItem value="3000-6000">$3,000 – $6,000</SelectItem>
                <SelectItem value="above6000">Above $6,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} courses found
          </p>
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset Filters
          </Button>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-semibold">No courses found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword or filter.
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
