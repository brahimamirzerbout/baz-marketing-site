import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { posts } from "@/content/posts";
import { cacPost } from "@/content/posts-cac";
import { industries } from "@/content/industries";
import {
  cityPages,
  cityIndustryPages,
  matrixLeaves,
  industryServicePages,
} from "@/lib/matrix";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/services",
    "/case-studies",
    "/insights",
    "/industries",
    "/contact",
    "/privacy",
    "/terms",
    "/methodology",
    "/our-story",
    "/stance",
    "/vs-others",
    "/loop",
    "/pulse",
    "/marketing-hub",
    "/brandbook",
    "/become-an-operator",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1 : 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const cacRoute: MetadataRoute.Sitemap = [
    {
      url: `${base}/insights/${cacPost.slug}`,
      lastModified: new Date(cacPost.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Phase 3 programmatic matrix — only publishable pages (gated in lib/matrix.ts).
  const cityRoutes: MetadataRoute.Sitemap = cityPages()
    .filter((p) => p.publishable)
    .map((p) => ({
      url: `${base}/locations/${p.city.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const cityIndustryRoutes: MetadataRoute.Sitemap = cityIndustryPages()
    .filter((p) => p.publishable)
    .map((p) => ({
      url: `${base}/locations/${p.city!.slug}/${p.industry.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const matrixLeafRoutes: MetadataRoute.Sitemap = matrixLeaves()
    .filter((p) => p.publishable)
    .map((p) => ({
      url: `${base}/locations/${p.city!.slug}/${p.industry.slug}/${p.service!.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const industryServiceRoutes: MetadataRoute.Sitemap = industryServicePages()
    .filter((p) => p.publishable)
    .map((p) => ({
      url: `${base}/industries/${p.industry.slug}/${p.service!.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...caseRoutes,
    ...postRoutes,
    ...cacRoute,
    ...industryRoutes,
    ...cityRoutes,
    ...cityIndustryRoutes,
    ...matrixLeafRoutes,
    ...industryServiceRoutes,
    { url: `${base}/admin/canva`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
    {
      url: `${base}/admin/analytics`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    { url: `${base}/admin/monitors`, lastModified: now, changeFrequency: "always", priority: 0.1 },
  ];
}
