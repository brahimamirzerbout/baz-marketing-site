import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI search & answer-engine crawlers that ground citations from a live index.
 * Explicitly allowed (in addition to the blanket `*` allow) so a future
 * CDN/WAF toggle or a more specific rule cannot silently remove us from
 * ChatGPT Search, Perplexity, Claude, Copilot or Google AI Overviews.
 * (Research ref — BAZ GEO/AEO, July 2026: each engine has its own crawler;
 * blocking the search bot is a binary visibility gate independent of the
 * training-bot opt-out.)
 */
const AI_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "Bingbot",
  "Googlebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/portal/",
          "/book",
          "/login",
          "/signup",
          "/dashboard",
          "/console",
        ],
      },
      // Explicit allow for AI answer engines (citations without training).
      // Training crawlers (GPTBot/ClaudeBot/Google-Extended) are NOT blocked
      // here — block them separately only if you want to opt out of training
      // while keeping citation visibility (the switches are independent).
      ...AI_SEARCH_BOTS.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}