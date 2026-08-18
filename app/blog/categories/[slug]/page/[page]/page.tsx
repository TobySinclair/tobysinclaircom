import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { getCategories, getPostsByCategory, paginate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { categoryLabel, POSTS_PER_PAGE } from "@/lib/site";

type Props = { params: Promise<{ slug: string; page: string }> };

export function generateStaticParams() {
  return getCategories().flatMap((category) => {
    const totalPages = Math.ceil(getPostsByCategory(category.slug).length / POSTS_PER_PAGE);
    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
      slug: category.slug,
      page: String(index + 2),
    }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page } = await params;
  const label = categoryLabel(slug);
  return pageMetadata({
    title: `${label} · Page ${page}`,
    description: `Articles on ${label.toLowerCase()} by Toby Sinclair.`,
    path: `/blog/categories/${slug}/page/${page}`,
  });
}

export default async function CategoryPaged({ params }: Props) {
  const { slug, page: pageParam } = await params;
  const pageNumber = Number(pageParam);
  const posts = getPostsByCategory(slug);
  if (!posts.length || !Number.isInteger(pageNumber) || pageNumber < 2) notFound();
  const { items, page, totalPages } = paginate(posts, pageNumber);
  if (pageNumber > totalPages) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{categoryLabel(slug)}</h1>
      <p className="mt-3 text-ink-muted">Page {page}</p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {items.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} basePath={`/blog/categories/${slug}`} />
    </div>
  );
}
