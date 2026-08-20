import type { Metadata } from "next";
import { BookSummaryGallery } from "@/components/book-summary-gallery";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getBookSummaries } from "@/lib/content";
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.seo.bookTitle,
  description: site.seo.bookDescription,
  path: "/book-summaries",
});

export default function BookSummariesPage() {
  const posts = getBookSummaries();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <JsonLd
        data={[
          collectionJsonLd({
            name: site.seo.bookTitle,
            description: site.seo.bookDescription,
            path: "/book-summaries",
            posts,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book Summaries", path: "/book-summaries" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Book Summaries" }]} />
      <p className="eyebrow mt-6">Archive</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Book summaries for leaders</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
        {posts.length}+ summaries written from the experience of a practising organisational leader. The big ideas
        and key takeaways in five minutes or less — with notes on how they show up at work.
      </p>
      <BookSummaryGallery
        posts={posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          image: post.image,
          published: post.published,
          categories: post.categories,
          rating: post.book?.rating ?? null,
          bookTitle: post.book?.bookTitle || post.title,
        }))}
      />
    </div>
  );
}
