import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CoverImage } from "@/components/cover-image";
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
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-black"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {post.image ? (
                <CoverImage
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={480}
                  priority={index < 8}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full items-end bg-surface p-4">
                  <span className="text-sm font-semibold">{post.title}</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <h2 className="text-sm font-semibold leading-5 tracking-tight text-white line-clamp-2 group-hover:text-green md:text-[15px] md:leading-6">
                  {post.title}
                </h2>
                {post.published ? (
                  <p className="mt-1 text-xs text-white/55">{formatDate(post.published)}</p>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
