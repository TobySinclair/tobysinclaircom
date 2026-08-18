import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { getAllPosts, paginate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { POSTS_PER_PAGE, site } from "@/lib/site";

type Props = { params: Promise<{ page: string }> };

export function generateStaticParams() {
  const totalPages = Math.ceil(getAllPosts().length / POSTS_PER_PAGE);
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata({
    title: `${site.seo.blogTitle} · Page ${page}`,
    description: site.seo.blogDescription,
    path: `/blog/page/${page}`,
  });
}

export default async function BlogPaged({ params }: Props) {
  const { page: pageParam } = await params;
  const pageNumber = Number(pageParam);
  if (!Number.isInteger(pageNumber) || pageNumber < 2) notFound();

  const { items, page, totalPages } = paginate(getAllPosts(), pageNumber);
  if (pageNumber > totalPages) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Articles</h1>
      <p className="mt-3 text-ink-muted">Page {page}</p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {items.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}
