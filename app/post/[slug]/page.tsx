import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookSummaryArticle } from "@/components/book-summary-article";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CoverImage } from "@/components/cover-image";
import { JsonLd } from "@/components/json-ld";
import { MarkdownBody } from "@/components/markdown-body";
import { RtsCover } from "@/components/rts-cover";
import { RtsCta } from "@/components/rts-cta";
import { getAllPosts, getPost, relatedBookSummaries, relatedPosts } from "@/lib/content";
import { isRtsPost } from "@/lib/rts-cover";
import { blogPostingJsonLd, bookReviewJsonLd, breadcrumbJsonLd, postMetadata } from "@/lib/seo";
import { categoryLabel, formatDate } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return postMetadata(post);
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const isSummary = Boolean(post.book);
  const related = isSummary ? relatedBookSummaries(post) : relatedPosts(post);
  const primaryCategory = post.categories[0];
  const crumbTitle = post.book?.bookTitle || post.title;

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16">
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          ...bookReviewJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            ...(isSummary
              ? [{ name: "Book Summaries", path: "/book-summaries" }]
              : [
                  { name: "Articles", path: "/blog" },
                  ...(primaryCategory
                    ? [{ name: categoryLabel(primaryCategory), path: `/blog/categories/${primaryCategory}` }]
                    : []),
                ]),
            { name: crumbTitle, path: `/post/${post.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={
          isSummary
            ? [
                { name: "Home", href: "/" },
                { name: "Book Summaries", href: "/book-summaries" },
                { name: crumbTitle },
              ]
            : [
                { name: "Home", href: "/" },
                { name: "Articles", href: "/blog" },
                ...(primaryCategory
                  ? [{ name: categoryLabel(primaryCategory), href: `/blog/categories/${primaryCategory}` }]
                  : []),
                { name: post.title },
              ]
        }
      />
      {isSummary ? (
        <BookSummaryArticle post={post} related={related} />
      ) : (
        <>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {post.categories.map((category) => (
              <Link key={category} href={`/blog/categories/${category}`} className="hover:text-green">
                {categoryLabel(category)}
              </Link>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            {formatDate(post.published)}
            {post.readingTime ? ` · ${post.readingTime}` : ""}
          </p>
          {isRtsPost(post) ? (
            <RtsCover post={post} size="lg" className="mt-8 aspect-[16/9] w-full rounded-2xl" />
          ) : post.image ? (
            <CoverImage
              src={post.image}
              alt={post.title}
              width={1400}
              height={780}
              className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
              priority
            />
          ) : null}
          <div className="mt-10">
            <MarkdownBody content={post.body} />
          </div>
          {related.length ? (
            <aside className="mt-16 border-t border-white/10 pt-10">
              <h2 className="text-xl font-bold tracking-tight">More articles</h2>
              <div className="mt-5 grid gap-4">
                {related.map((item) => (
                  <Link key={item.slug} href={`/post/${item.slug}`} className="text-green hover:underline">
                    {item.title}
                  </Link>
                ))}
              </div>
            </aside>
          ) : null}
        </>
      )}
      <div className="mt-16">
        <RtsCta />
      </div>
    </article>
  );
}
