export const site = {
  name: "BAZventures",
  shortName: "BAZventures",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://baz.agency",
  tagline: "Senior-partner growth agency for technical founders.",
  description:
    "BAZventures builds engineering-grade marketing systems — strategy, CRM/revenue ops, and performance web for SaaS, AI, and security teams across MENA, EU, US.",
  email: "zerboutbrahimamir@gmail.com",
  // Phone is optional. Leave blank if you don't want one shown.
  // The contact page will hide the row entirely when this is empty.
  phone: "",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  // Stats for the trust strip. Read from env when available, otherwise
  // fall back to dev-only defaults. The homepage hides a stat entirely
  // when its value is null — we'd rather show nothing than a fabricated
  // number. Set the env vars in .env.local for production.
  stats: {
    brandsScaled: process.env.NEXT_PUBLIC_BRANDS_SCALED || "60+",
    countriesServed: process.env.NEXT_PUBLIC_COUNTRIES_SERVED || "3",
    seniorOnly: process.env.NEXT_PUBLIC_SENIOR_ONLY || "100%",
    teamSize: process.env.NEXT_PUBLIC_TEAM_SIZE || "6",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/baz-agency",
    twitter: "https://twitter.com/bazagency",
    github: "https://github.com/brahimamirzerbout",
  },
  // Partner tools BAZventures actually uses. Env-overridable for white-label
  // deployments. Default is the public BAZventures stack.
  stack: (process.env.NEXT_PUBLIC_STACK || "Ollama,GitHub,Vercel,Linear,Stripe,Resend")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  /**
   * What "Book a growth call" buttons should link to.
   * - If `bookingUrl` is set (Cal.com, TidyCal, etc.), use it.
   * - Otherwise fall back to a prefilled email so the button is never broken.
   *   The subject is "Growth call" so you can filter it in your inbox.
   */
  get bookOrMailto(): string {
    if (this.bookingUrl) return this.bookingUrl;
    const subject = encodeURIComponent("Growth call — BAZventures website");
    const body = encodeURIComponent(
      "Hi BAZventures,\n\nI'd like to book a 20-minute growth call. A few windows that work for me:\n- \n- \n- \n\nThanks,\n",
    );
    return `mailto:${this.email}?subject=${subject}&body=${body}`;
  },
};

export type Site = typeof site;
