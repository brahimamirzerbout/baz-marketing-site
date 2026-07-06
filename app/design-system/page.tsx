import { DesignSystemShowcase } from "@/components/DesignSystemShowcase";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Design System — BAZventures",
  description:
    "The BAZventures design system: every Midnight Terminal Stitch component and every brand asset, rendered live in the electric-cyan theme.",
  path: "/design-system",
});

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}