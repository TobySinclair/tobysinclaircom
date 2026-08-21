import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCoverGrid, toBookSummaryCard } from "@/components/book-cover-grid";
import { BookHubCollections, BookSummaryHubNav } from "@/components/book-summary-hubs";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionCta } from "@/components/conversion-cta";
import { JsonLd } from "@/components/json-ld";
import { bookHubs, getBookHub, summariesForHub } from "@/lib/book-hubs";
import { conversionIntentForHub, conversionOfferFor } from "@/lib/conversion";
import { getBookSummaries } from "@/lib/content";
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ hub: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return bookHubs.map((hub) => ({ hub: hub.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hub: slug } = await params;
  const hub = getBookHub(slug);
  if (!hub) return {};
  return pageMetadata({
    title: hub.title,
    description: hub.description,
    path: `/book-summaries/${hub.slug}`,
  });
}

export default async function BookSummaryHubPage({ params }: Props) {
  const { hub: slug } = await params;
  const hub = getBookHub(slug);
  if (!hub) notFound();

  const all = getBookSummaries();
  const posts = summariesForHub(all, hub);
  if (!posts.length) notFound();
  const intent = conversionIntentForHub(hub.slug);
  const offer = intent ? conversionOfferFor(intent) : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <JsonLd
        data={[
          collectionJsonLd({
            name: hub.title,
            description: hub.description,
            path: `/book-summaries/${hub.slug}`,
            posts,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book Summaries", path: "/book-summaries" },
            { name: hub.title, path: `/book-summaries/${hub.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Book Summaries", href: "/book-summaries" },
          { name: hub.title },
        ]}
      />
      <p className="eyebrow mt-6">Book summaries</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{hub.headline}</h1>
      {hub.intro.map((paragraph) => (
        <p key={paragraph} className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
          {paragraph}
        </p>
      ))}
      <BookHubCollections hub={hub} />
      <p className="mt-8 text-sm text-ink-muted">{posts.length} summaries</p>
      <BookCoverGrid posts={posts.map(toBookSummaryCard)} className="mt-6" />
      {offer ? (
        <div className="mt-12">
          <ConversionCta offer={offer} />
        </div>
      ) : null}
      <p className="mt-12 text-sm text-ink-muted">
        <Link href="/book-summaries" className="text-green hover:underline">
          Browse the full library
        </Link>
      </p>
      <h2 className="mt-16 text-xl font-bold tracking-tight">Other topics</h2>
      <BookSummaryHubNav posts={all} active={hub.slug} />
    </div>
  );
}
