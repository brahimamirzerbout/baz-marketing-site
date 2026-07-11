import type { CaseStudy } from "@/types";

/**
 * Case studies.
 *
 * IMPORTANT: Replace the empty `caseStudies` array below with signed-client
 * case studies before public launch. Each entry follows the structure:
 *   - Problem / Strategy / Result / Duration / Testimonial
 *
 * Names, metrics, and companies must be real, client-approved material.
 * Do not ship illustrative composites on the production site.
 */

export const caseStudies: CaseStudy[] = [];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
