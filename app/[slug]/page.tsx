import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { MarkdownBody } from "@/components/markdown-body";
import { masterPageSlugs } from "@/lib/book-masters";
import { getLandingPage, getLandingPages } from "@/lib/content";
import { breadcrumbJsonLd, landingMetadata, webPageJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getLandingPages()
    .filter((page) => !masterPageSlugs.includes(page.slug))
    .map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return landingMetadata(page);
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: page.title,
            description: page.description,
            path: `/${page.slug}`,
            image: page.image,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.title, path: `/${page.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.title }]} />
      <h1 className="mt-6 text-4xl font-bold tracking-tight">{page.title}</h1>
      {page.description ? <p className="mt-4 text-lg leading-8 text-ink-muted">{page.description}</p> : null}
      <div className="mt-10">
        <MarkdownBody content={page.body} />
      </div>
    </article>
  );
}
