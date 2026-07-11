import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MatrixView } from "@/components/marketing/MatrixView";
import { cityIndustryPages, getCityIndustryPage } from "@/lib/matrix";
import { buildMetadata } from "@/lib/seo";

type Params = { city: string; industry: string };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return cityIndustryPages()
    .filter((p) => p.publishable)
    .map((p) => ({ city: p.city!.slug, industry: p.industry.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const page = getCityIndustryPage(params.city, params.industry);
  if (!page || !page.publishable)
    return buildMetadata({
      title: "Not found",
      path: `/locations/${params.city}/${params.industry}`,
      noindex: true,
    });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/locations/${params.city}/${params.industry}`,
  });
}

export default function CityIndustryPage({ params }: { params: Params }) {
  const page = getCityIndustryPage(params.city, params.industry);
  if (!page || !page.publishable) notFound();
  const path = `/locations/${params.city}/${params.industry}`;
  return (
    <MatrixView
      page={page}
      path={path}
      breadcrumb={[
        { label: "Locations", href: "/locations" },
        { label: page.city!.name, href: `/locations/${page.city!.slug}` },
        { label: page.industry.name },
      ]}
      areaServed={[page.city!.name, page.city!.region]}
    />
  );
}
