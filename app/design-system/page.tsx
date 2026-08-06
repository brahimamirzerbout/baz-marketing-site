import { DesignSystemShowcase } from "@/components/DesignSystemShowcase";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Design System — BAZventures",
  description:
    "The BAZventures design system: every Æther + Gold Stitch component and every brand asset, rendered live in the stitch-gold theme.",
  path: "/design-system",
});

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}