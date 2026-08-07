import { createFileRoute } from "@tanstack/react-router";

const title = "Dashboard — ElevateHub Ltd";
const description = "Your learning dashboard: track enrolled courses, lesson progress, and certificates.";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <p className="mt-3 text-muted-foreground">Your courses and progress will appear here.</p>
    </main>
  );
}
