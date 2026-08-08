import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const fetchCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [categories, instructors, courses, services] = await Promise.all([
    supabase.from("catalog_categories").select("*").order("sort_order"),
    supabase.from("instructors").select("*").order("sort_order"),
    supabase.from("courses").select("*").eq("published", true).order("sort_order"),
    supabase.from("services").select("*").eq("published", true).order("sort_order"),
  ]);

  return {
    categories: categories.data ?? [],
    instructors: instructors.data ?? [],
    courses: courses.data ?? [],
    services: services.data ?? [],
  };
});
