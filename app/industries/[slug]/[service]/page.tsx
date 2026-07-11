import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MatrixView } from "@/components/marketing/MatrixView";
import { industryServicePages, getIndustryServicePage } from "@/lib/matrix";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string; service: string };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return industryServicePages()
    .filter((p) => p.publishable)
    .map((p) => ({ slug: p.industry.slug, service: p.service!.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const page = getIndustryServicePage(params.slug, params.service);
  if (!page || !page.publishable)
    return buildMetadata({
      title: "Not found",
      path: `/industries/${params.slug}/${params.service}`,
      noindex: true,
    });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/industries/${params.slug}/${params.service}`,
  });
}

export default function IndustryServicePage({ params }: { params: Params }) {
  const page = getIndustryServicePage(params.slug, params.service);
  if (!page || !page.publishable) notFound();
  const path = `/industries/${params.slug}/${params.service}`;
  return (
    <MatrixView
      page={page}
      path={path}
      breadcrumb={[
        { label: "Industries", href: "/industries" },
        { label: page.industry.name, href: `/industries/${page.industry.slug}` },
        { label: page.service!.name },
      ]}
    />
  );
}
