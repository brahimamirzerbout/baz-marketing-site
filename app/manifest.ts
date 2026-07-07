import type { MetadataRoute } from "next";

// BAZventures — Midnight Terminal web app manifest.
// PWA-ready: deep-midnight theme + signature cyan mark icons (SVG scalable + raster 192/512).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BAZventures",
    short_name: "BAZventures",
    description:
      "Senior-partner growth agency. Marketing that behaves like a strategy team that actually ships.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["business", "marketing", "productivity"],
  };
}