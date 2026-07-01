import type { TeamMember } from "@/types";

/**
 * BAZ team members.
 *
 * Brahim ZERBOUT is the founder. Other entries are role definitions
 * showing the senior-partner structure BAZ operates with. As the team
 * grows, replace each entry with the actual partner filling that role.
 */
export const team: TeamMember[] = [
  {
    name: "Brahim ZERBOUT",
    role: "Founder · Strategy",
    bio: "Sets the bar on growth strategy and the senior-team model. Has shipped plans for 60+ brands across MENA, EU, and the US.",
    initials: "BZ",
    color: "#ff3b2f",
  },
  {
    name: "Partner · SEO & Content",
    role: "Senior Partner · SEO & Content",
    bio: "Editorial SEO and topical authority for category-defining SERPs. Owns the content engine end-to-end.",
    initials: "SE",
    color: "#4f7cff",
  },
  {
    name: "Partner · Paid & Lifecycle",
    role: "Senior Partner · Paid & Lifecycle",
    bio: "Paid media and lifecycle marketing. Believes tracking is the moat. Ships server-side + CAPI on every account.",
    initials: "PL",
    color: "#7a3cff",
  },
  {
    name: "Partner · Brand & Creative",
    role: "Senior Partner · Brand & Creative",
    bio: "Brand systems and creative direction tied to the metric they own. From naming to launch toolkit.",
    initials: "BC",
    color: "#f9a01f",
  },
  {
    name: "Partner · Analytics",
    role: "Senior Partner · Analytics",
    bio: "Tracking, attribution, and dashboards that execs actually open. GA4, server-side GTM, MMM.",
    initials: "AN",
    color: "#3ddc97",
  },
  {
    name: "Partner · Web",
    role: "Senior Partner · Web",
    bio: "Performance-first web builds on Next.js and headless CMS. Sub-1.5s LCP is the floor, not the ceiling.",
    initials: "WB",
    color: "#0e0e10",
  },
];
