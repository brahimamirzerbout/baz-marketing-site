import type { MetadataRoute } from "next";

// BAZventures — Æther + Gold web app manifest.
// PWA-ready: near-black theme + signature gold mark icons (SVG scalable + raster 192/512).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BAZventures",
    short_name: "BAZventures",
    description:
      "Senior-partner growth agency. Marketing that behaves like a strategy team that actually ships.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["business", "marketing", "productivity"],
  };
}