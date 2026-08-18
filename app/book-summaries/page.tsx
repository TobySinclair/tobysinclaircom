import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getBookSummaries } from "@/lib/content";
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata } from "@/lib/seo";
import { formatDate, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.seo.bookTitle,
  description: site.seo.bookDescription,
  path: "/book-summaries",
});

export default function BookSummariesPage() {
  const posts = getBookSummaries();

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16">
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
      <ol className="mt-12 divide-y divide-white/10 rounded-2xl border border-white/10">
        {posts.map((post) => (
          <li key={post.slug} className="px-5 py-5">
            <Link href={`/post/${post.slug}`} className="group block">
              <h2 className="font-semibold tracking-tight group-hover:text-green">{post.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">{formatDate(post.published)}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
