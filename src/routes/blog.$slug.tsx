import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost, posts, type BlogPost } from "@/data/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "লেখা পাওয়া যায়নি" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — ElevateHub ব্লগ` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            author: { "@type": "Person", name: p.author },
            publisher: { "@type": "Organization", name: "ElevateHub Ltd" },
          }),
        },
      ],
    };
  },
  component: BlogDetail,
});

function BlogDetail() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PublicShell>
      <article className="container-eh max-w-3xl py-12">
        <Badge variant="secondary">{post.category}</Badge>
        <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {post.author} · {post.date} · {post.readTime} পড়া
        </p>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
          {post.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">শেখা শুরু করতে প্রস্তুত?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            আপনার আগ্রহের কোর্সটি দেখে নিন এবং আজই যাত্রা শুরু করুন।
          </p>
          <Button asChild className="mt-4 bg-spark text-accent-foreground">
            <Link to="/courses">কোর্স দেখুন</Link>
          </Button>
        </div>

        <h2 className="mt-12 text-xl font-bold">আরও পড়ুন</h2>
        <ul className="mt-4 space-y-3">
          {related.map((p) => (
            <li key={p.slug} className="rounded-xl border border-border bg-card p-4">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="font-semibold story-link">
                {p.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      </article>
    </PublicShell>
  );
}
