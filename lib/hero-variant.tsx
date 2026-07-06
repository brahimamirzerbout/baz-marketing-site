/**
 * Hero variant resolver. Pure server-side: maps a `?icp=` query param
 * (or another matching signal) to a headline + tagline pair.
 *
 * Voice: Lucifer's supremacy + Don Draper's pitch + the Godfather's offer.
 * Supreme, magnetic, irresistible — and grounded in real proof (60+ brands,
 * senior-only, the guarantee) so every claim is backed, not hype.
 */
import type { ReactNode } from "react";

export type HeroIcp = "saas" | "ecommerce" | "fintech" | "media";

export interface HeroVariant {
  icp: HeroIcp | null;
  icpLabel: string | null;
  /** Headline — line 1, the Draper hook */
  headline: ReactNode;
  /** Tagline — line 2, the Godfather offer + the proof */
  tagline: ReactNode;
  /** Subhead — for meta/OG only — the Lucifer pitch + the mechanism */
  subhead: ReactNode;
}

const DEFAULT_HEADLINE = (
  <>
    I don&rsquo;t sell marketing.{" "}
    I sell <span className="not-italic text-gradient">certainty</span>.
  </>
);

const DEFAULT_TAGLINE = <>60+ brands shipped. Senior-only. Or pay nothing for month four.</>;

const DEFAULT_SUBHEAD = (
  <>
    I&rsquo;m Brahim ZERBOUT. I treat marketing as a business artform — engineered, measurable,
    and tied to revenue, not vanity. No juniors. No decks nobody reads. No retainers for activity.
    I ship revenue, or I don&rsquo;t eat. That&rsquo;s the offer.
  </>
);

const VARIANTS: Record<HeroIcp, Omit<HeroVariant, "icp">> = {
  saas: {
    icpLabel: "B2B SaaS",
    headline: (
      <>
        I make SaaS pipeline a{" "}
        <span className="not-italic text-gradient">forecast</span>.
      </>
    ),
    tagline: <>$200K+ in 90 days. Senior-only. Or you don&rsquo;t pay.</>,
    subhead: (
      <>
        I score your PQLs, route them into sequences, and report attribution on a 60-second loop.
        No juniors. Pipeline you can take to the board — or pay nothing for month four.
      </>
    ),
  },
  ecommerce: {
    icpLabel: "DTC & E-commerce",
    headline: (
      <>
        I cut your CAC. Then I compound your{" "}
        <span className="not-italic text-gradient">LTV</span>.
      </>
    ),
    tagline: <>30–60% CAC cut in two quarters. Senior-only.</>,
    subhead: (
      <>
        Server-side tracking, weekly creative iteration, lifecycle flows that compound. The Hub runs
        the loop so your team owns the brand, not the ops. Revenue, not vanity.
      </>
    ),
  },
  fintech: {
    icpLabel: "FinTech",
    headline: (
      <>
        FinTech growth,{" "}
        <span className="not-italic text-gradient">compliance-grade</span>.
      </>
    ),
    tagline: <>Category-defining. Senior-only. Built to survive scrutiny.</>,
    subhead: (
      <>
        SERPs that define the category, content that passes compliance, attribution that holds under
        regulator review. No hand-off to a junior after the pitch.
      </>
    ),
  },
  media: {
    icpLabel: "Media & Creators",
    headline: (
      <>
        Reach that compounds. Retention that{" "}
        <span className="not-italic text-gradient">holds</span>.
      </>
    ),
    tagline: <>On a 60-second loop. Senior-only.</>,
    subhead: (
      <>
        Lifecycle flows that compound subscribers, partnerships that compound reach, a lead-score loop
        that tells you which creators convert — updated every minute.
      </>
    ),
  },
};

function normaliseIcp(raw: string | null | undefined): HeroIcp | null {
  if (!raw) return null;
  const s = raw.toLowerCase().trim();
  if (s === "saas" || s === "b2b" || s === "b2b-saas") return "saas";
  if (s === "ecommerce" || s === "ecom" || s === "dtc") return "ecommerce";
  if (s === "fintech" || s === "finance") return "fintech";
  if (s === "media" || s === "creator" || s === "publishers") return "media";
  return null;
}

export function resolveHeroVariant(rawIcp: string | null | undefined): HeroVariant {
  const icp = normaliseIcp(rawIcp);
  if (!icp) {
    return {
      icp: null,
      icpLabel: null,
      headline: DEFAULT_HEADLINE,
      tagline: DEFAULT_TAGLINE,
      subhead: DEFAULT_SUBHEAD,
    };
  }
  return {
    icp,
    icpLabel: VARIANTS[icp].icpLabel,
    headline: VARIANTS[icp].headline,
    tagline: VARIANTS[icp].tagline,
    subhead: VARIANTS[icp].subhead,
  };
}