import { useQuery } from "@tanstack/react-query";

import { fetchCatalog } from "@/lib/catalog.functions";
import {
  categories as seedCategories,
  courses as seedCourses,
  instructors as seedInstructors,
  type Category,
  type Course,
  type Instructor,
  type Level,
  type Module,
} from "@/data/courses";

export type Service = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  tagline: string;
  description: string;
  startingPrice: number;
  turnaround: string;
  deliverables: string[];
};

export type ServiceCategory = Category & { kind: "course" | "service" };

export type Catalog = {
  courses: Course[];
  instructors: Instructor[];
  categories: Category[];
  serviceCategories: ServiceCategory[];
  services: Service[];
};

type Row = Record<string, unknown>;

const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const num = (v: unknown, fallback = 0) => (v == null ? fallback : Number(v));
const list = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

function mapCategory(r: Row): ServiceCategory {
  return {
    slug: str(r["slug"]),
    name: str(r["name"]),
    tagline: str(r["tagline"]),
    icon: str(r["icon"], "Sparkles"),
    color: str(r["color"]),
    kind: str(r["kind"], "course") === "service" ? "service" : "course",
    imageUrl: str(r["image_url"]) || undefined,
  };
}

function mapInstructor(r: Row): Instructor {
  return {
    id: str(r["slug"]),
    slug: str(r["slug"]),
    name: str(r["name"]),
    title: str(r["title"]),
    bio: str(r["bio"]),
    experience: str(r["experience"]),
    students: num(r["students"]),
    courses: num(r["courses_count"]),
    rating: num(r["rating"], 4.8),
    skills: list(r["skills"]),
    approved: r["approved"] !== false,
    avatarUrl: str(r["avatar_url"]) || undefined,
  };
}

function mapCourse(r: Row): Course {
  const modules = Array.isArray(r["modules"]) ? (r["modules"] as Module[]) : [];
  return {
    id: str(r["id"]),
    slug: str(r["slug"]),
    title: str(r["title"]),
    subtitle: str(r["subtitle"]),
    category: str(r["category_slug"]),
    level: str(r["level"], "beginner") as Level,
    language: str(r["language"], "english") === "bilingual" ? "bilingual" : "english",
    price: num(r["price"]),
    oldPrice: r["old_price"] == null ? undefined : num(r["old_price"]),
    durationHours: num(r["duration_hours"]),
    lessonsCount: num(r["lessons_count"]),
    rating: num(r["rating"], 4.8),
    reviewsCount: num(r["reviews_count"]),
    students: num(r["students"]),
    instructorId: str(r["instructor_slug"]),
    badge: r["badge"] == null ? undefined : str(r["badge"]),
    published: r["published"] !== false,
    outcomes: list(r["outcomes"]),
    requirements: list(r["requirements"]),
    description: str(r["description"]),
    modules,
    nextBatch: str(r["next_batch"]),
    imageKey: str(r["image_key"], str(r["category_slug"])),
    imageUrl: str(r["image_url"]) || undefined,
    videoUrl: str(r["video_url"]) || undefined,
  };
}

function mapService(r: Row): Service {
  return {
    id: str(r["id"]),
    slug: str(r["slug"]),
    name: str(r["name"]),
    categorySlug: str(r["category_slug"]),
    tagline: str(r["tagline"]),
    description: str(r["description"]),
    startingPrice: num(r["starting_price"]),
    turnaround: str(r["turnaround"]),
    deliverables: list(r["deliverables"]),
  };
}

export const seedCatalog: Catalog = {
  courses: seedCourses,
  instructors: seedInstructors,
  categories: seedCategories,
  serviceCategories: [],
  services: [],
};

export function useCatalog(): Catalog {
  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: () => fetchCatalog(),
    staleTime: 5 * 60 * 1000,
  });

  if (!data) return seedCatalog;

  const categories = (data.categories as Row[]).map(mapCategory);
  const courses = (data.courses as Row[]).map(mapCourse);
  const instructors = (data.instructors as Row[]).map(mapInstructor);

  return {
    courses: courses.length ? courses : seedCourses,
    instructors: instructors.length ? instructors : seedInstructors,
    categories: categories.filter((c) => c.kind === "course").length
      ? categories.filter((c) => c.kind === "course")
      : seedCategories,
    serviceCategories: categories.filter((c) => c.kind === "service"),
    services: (data.services as Row[]).map(mapService),
  };
}
