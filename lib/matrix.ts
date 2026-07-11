import type { City, Industry, Service } from "@/types";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { cities } from "@/content/locations";

/**
 * Programmatic SEO matrix (Phase 3.2).
 *
 * Composes unique, non-boilerplate copy for every (industry × service × city)
 * combination from the three source datasets, then gates publication behind a
 * quality threshold + a curated launch subset to avoid thin/doorway penalties.
 *
 * Gating rules:
 *  - Leaf (city×industry×service) and city×industry: only `launch` cities, and
 *    only when the city has >=2 unique local observations and the composed body
 *    clears the word threshold.
 *  - Industry×service (no city): only the top-6 launch services.
 *  - City overview: always publishable.
 * Anything not `publishable` is excluded from generateStaticParams AND forced
 * noindex by the route.
 */

export type MatrixPage = {
  industry: Industry;
  service: Service | null;
  city: City | null;
  title: string;
  description: string;
  h1: string;
  intro: string;
  challenges: string[];
  outcomes: string[];
  process: { step: number; title: string; desc: string }[];
  localProof: string[];
  body: string;
  bodyWords: number;
  publishable: boolean;
};

export type CityPage = {
  city: City;
  title: string;
  description: string;
  h1: string;
  intro: string;
  localProof: string[];
  body: string;
  publishable: boolean;
};

const LAUNCH_SERVICE_SLUGS = new Set(services.slice(0, 6).map((s) => s.slug));
const MIN_BODY_WORDS = 250;

function buildBody({
  industry,
  service,
  city,
}: {
  industry: Industry;
  service?: Service;
  city?: City;
}): string {
  const paragraphs: string[] = [];

  if (city) {
    paragraphs.push(
      `${city.marketBlurb} For ${industry.name} teams specifically, this means ${industry.blurb.toLowerCase()}`
    );

    paragraphs.push(
      `The ${city.region} market in ${city.name} rewards a specific kind of positioning and messaging. For ${industry.name} operators here, local buyer behavior and seasonal dynamics shape everything from channel mix to creative direction. ${city.localProof.join(' ')}`
    );

    paragraphs.push(
      `${industry.name} teams operating in ${city.name} typically face challenges that are locally amplified: ${industry.challenges.join('. ')}.`
    );

    if (service) {
      paragraphs.push(
        `${service.name} is designed to address friction exactly like this. ${service.description} ${service.hero.sub}`
      );

      const processSequence = service.process
        .map((p, i) => {
          if (i === 0) return `we begin with ${p.title} — ${p.desc}`;
          if (i === service.process.length - 1) return `and close with ${p.title} — ${p.desc}`;
          return `then ${p.title} — ${p.desc}`;
        })
        .join('. ');

      paragraphs.push(
        `The engagement follows a clear progression: ${processSequence}.`
      );

      paragraphs.push(
        `Across this engagement, the core deliverables include ${service.deliverables.slice(0, 3).join(', ')}. These map directly back to the ${industry.name} challenges we see in ${city.name}.`
      );
    }

    paragraphs.push(
      `When these challenges are addressed well, the outcomes we target for ${industry.name} teams in ${city.name} are: ${industry.outcomes.join('. ')}.`
    );

    paragraphs.push(
      `Senior-led execution matters here because generic playbooks underperform in markets that move fast and require cultural calibration. In ${city.name}, local buyer behavior and channel dynamics make the difference between pipeline that compounds and spend that burns.`
    );
  } else if (service) {
    paragraphs.push(
      `${service.name} is built for ${industry.name} teams that need pipeline they can forecast. ${service.description} ${service.hero.sub}`
    );

    const processSequence = service.process
      .map((p, i) => {
        if (i === 0) return `we begin with ${p.title} — ${p.desc}`;
        if (i === service.process.length - 1) return `and close with ${p.title} — ${p.desc}`;
        return `then ${p.title} — ${p.desc}`;
      })
      .join('. ');

    paragraphs.push(
      `The engagement follows a clear progression: ${processSequence}.`
    );

    paragraphs.push(
      `Deliverables include ${service.deliverables.slice(0, 3).join(', ')}.`
    );

    paragraphs.push(
      `For ${industry.name} teams, the outcomes we target are: ${industry.outcomes.join('. ')}.`
    );
  }

  return paragraphs.join('\n\n');
}

function compose({
  industry,
  service,
  city,
}: {
  industry: Industry;
  service?: Service;
  city?: City;
}): MatrixPage {
  const locLabel = city ? ` in ${city.name}` : "";
  const title = service
    ? `${service.name} for ${industry.name}${locLabel}`
    : `${industry.name} growth${locLabel}`;
  const tagline = service?.tagline ?? industry.blurb;
  const description = `${tagline} Built for ${industry.name} teams${locLabel}. Senior-led execution that compounds pipeline.`;
  const h1 = title;
  const intro = service
    ? `${industry.blurb} ${service.description} For ${industry.name} teams${locLabel}, we run ${service.name} as a senior-led engagement — ${service.hero.sub}`
    : `${industry.blurb} For ${industry.name} teams${locLabel}, we run a senior-led growth engagement across strategy, acquisition, and lifecycle.`;
  const challenges = industry.challenges;
  const outcomes = service
    ? [...industry.outcomes, ...service.deliverables.slice(0, 3)]
    : industry.outcomes;
  const process = service ? service.process : [];
  const localProof = city?.localProof ?? [];
  const body = buildBody({ industry, service, city });
  const text = [
    title,
    description,
    intro,
    body,
    ...challenges,
    ...outcomes,
    ...process.map((p) => p.desc),
    ...localProof,
  ].join(" ");
  const bodyWords = text.split(/\s+/).filter(Boolean).length;
  return {
    industry,
    service: service ?? null,
    city: city ?? null,
    title,
    description,
    h1,
    intro,
    challenges,
    outcomes,
    process,
    localProof,
    body,
    bodyWords,
    publishable: false,
  };
}

export function matrixLeaves(): MatrixPage[] {
  const out: MatrixPage[] = [];
  for (const city of cities)
    for (const industry of industries)
      for (const service of services) {
        const p = compose({ industry, service, city });
        p.publishable =
          !!city.launch && city.localProof.length >= 2 && p.bodyWords >= MIN_BODY_WORDS;
        out.push(p);
      }
  return out;
}

export function industryServicePages(): MatrixPage[] {
  const out: MatrixPage[] = [];
  for (const industry of industries)
    for (const service of services) {
      const p = compose({ industry, service });
      p.publishable = LAUNCH_SERVICE_SLUGS.has(service.slug);
      out.push(p);
    }
  return out;
}

export function cityIndustryPages(): MatrixPage[] {
  const out: MatrixPage[] = [];
  for (const city of cities)
    for (const industry of industries) {
      const p = compose({ industry, city });
      p.publishable =
        !!city.launch && city.localProof.length >= 2 && p.bodyWords >= MIN_BODY_WORDS;
      out.push(p);
    }
  return out;
}

export function cityPages(): CityPage[] {
  return cities.map((city) => ({
    city,
    title: `${city.name} growth marketing`,
    description: city.marketBlurb,
    h1: `${city.name} growth marketing`,
    intro: city.marketBlurb,
    localProof: city.localProof,
    body: `${city.marketBlurb} For operators in ${city.name}, this means the ${city.region} market demands both speed and sophistication. ${city.localProof.join(' ')} Senior-led execution matters here because generic playbooks underperform in markets that move fast and require cultural calibration. In ${city.name}, local buyer behavior and channel dynamics make the difference between pipeline that compounds and spend that burns.`,
    publishable: true,
  }));
}

export function getMatrixLeaf(
  industrySlug: string,
  serviceSlug: string,
  citySlug: string,
): MatrixPage | undefined {
  return matrixLeaves().find(
    (p) =>
      p.industry.slug === industrySlug &&
      p.service?.slug === serviceSlug &&
      p.city?.slug === citySlug,
  );
}

export function getIndustryServicePage(
  industrySlug: string,
  serviceSlug: string,
): MatrixPage | undefined {
  return industryServicePages().find(
    (p) => p.industry.slug === industrySlug && p.service?.slug === serviceSlug,
  );
}

export function getCityIndustryPage(
  citySlug: string,
  industrySlug: string,
): MatrixPage | undefined {
  return cityIndustryPages().find(
    (p) => p.city?.slug === citySlug && p.industry.slug === industrySlug,
  );
}

export function getCityPage(citySlug: string): CityPage | undefined {
  return cityPages().find((p) => p.city.slug === citySlug);
}
