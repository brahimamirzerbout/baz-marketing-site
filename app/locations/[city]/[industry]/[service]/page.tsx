import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MatrixView } from "@/components/marketing/MatrixView";
import { matrixLeaves, getMatrixLeaf } from "@/lib/matrix";
import { buildMetadata } from "@/lib/seo";

type Params = { city: string; industry: string; service: string };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return matrixLeaves()
    .filter((p) => p.publishable)
    .map((p) => ({ city: p.city!.slug, industry: p.industry.slug, service: p.service!.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const page = getMatrixLeaf(params.industry, params.service, params.city);
  if (!page || !page.publishable)
    return buildMetadata({
      title: "Not found",
      path: `/locations/${params.city}/${params.industry}/${params.service}`,
      noindex: true,
    });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/locations/${params.city}/${params.industry}/${params.service}`,
  });
}

export default function MatrixLeafPage({ params }: { params: Params }) {
  const page = getMatrixLeaf(params.industry, params.service, params.city);
  if (!page || !page.publishable) notFound();
  const path = `/locations/${params.city}/${params.industry}/${params.service}`;
  return (
    <MatrixView
      page={page}
      path={path}
      breadcrumb={[
        { label: "Locations", href: "/locations" },
        { label: page.city!.name, href: `/locations/${page.city!.slug}` },
        { label: page.industry.name, href: `/locations/${page.city!.slug}/${page.industry.slug}` },
        { label: page.service!.name },
      ]}
      areaServed={[page.city!.name, page.city!.region]}
    />
  );
}
