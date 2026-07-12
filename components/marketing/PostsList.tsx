// @ts-nocheck
import Link from "next/link";
import { posts } from "@/content/posts";
import { Badge } from "@/components/ui/Badge";

const categoryLabel: Record<
  string,
  { name: string; tone: "accent" | "info" | "success" | "warning" }
> = {
  strategy: { name: "Strategy", tone: "accent" },
  seo: { name: "SEO", tone: "info" },
  paid: { name: "Paid", tone: "warning" },
  analytics: { name: "Analytics", tone: "success" },
  content: { name: "Content", tone: "accent" },
  ai: { name: "AI", tone: "info" },
};

// Map each post category to the service it maps to, so a reader of an
// SEO post is invited to start an SEO & Organic Growth engagement, etc.
const categoryService: Record<string, { slug: string; name: string }> = {
  strategy: { slug: "strategy-consulting", name: "Strategy & Growth Consulting" },
  seo: { slug: "seo-organic", name: "SEO & Organic Growth" },
  paid: { slug: "performance-marketing", name: "Performance Marketing" },
  analytics: { slug: "analytics-attribution", name: "Analytics, Tracking & Attribution" },
  content: { slug: "content-engine", name: "Content & Editorial Engine" },
  ai: { slug: "ai-search-optimization", name: "AI Search Optimization" },
};

export function PostsList({
  slugs,
  exclude,
  limit,
}: { slugs?: string[]; exclude?: string; limit?: number } = {}) {
  let list = posts;
  if (slugs) list = list.filter((p) => slugs.includes(p.slug));
  if (exclude) list = list.filter((p) => p.slug !== exclude);
  if (limit) list = list.slice(0, limit);
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {list.map((p, i) => {
        const cat = categoryLabel[p.category];
        const svc = categoryService[p.category];
        return (
          <li key={p.slug}>
            <article
              className="reveal group block bg-card rounded-2xl p-6 md:p-7 border border-border hover:border-foreground hover:-translate-y-1 hover:shadow-lift transition-all duration-200 h-full flex flex-col"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <Badge variant={cat.tone}>{cat.name}</Badge>
                <span className="text-xs text-muted-foreground/60 font-mono">
                  {p.readingMin} min read
                </span>
              </div>
              <Link
                href={`/insights/${p.slug}`}
                className="block font-display text-2xl font-medium tracking-[-0.02em] leading-tight text-foreground group-hover:text-accent transition-colors"
              >
                {p.title}
              </Link>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{p.author}</span>
                <span className="text-muted-foreground/60 font-mono text-xs">
                  {new Date(p.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {svc && (
                <Link
                  href={`/services/${svc.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  Start a {svc.name} engagement
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
