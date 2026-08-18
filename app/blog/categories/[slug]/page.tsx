import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { getCategories, getPostsByCategory, paginate } from "@/lib/content";
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata } from "@/lib/seo";
import { categoryLabel } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = categoryLabel(slug);
  return pageMetadata({
    title: label,
    description: `Articles on ${label.toLowerCase()} by Toby Sinclair.`,
    path: `/blog/categories/${slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  if (!posts.length) notFound();
  const { items, page, totalPages } = paginate(posts, 1);
  const label = categoryLabel(slug);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <JsonLd
        data={[
          collectionJsonLd({
            name: label,
            description: `Articles on ${label.toLowerCase()} by Toby Sinclair.`,
            path: `/blog/categories/${slug}`,
            posts,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/blog" },
            { name: label, path: `/blog/categories/${slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Articles", href: "/blog" },
          { name: label },
        ]}
      />
      <p className="eyebrow mt-6">Articles</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{label}</h1>
      <p className="mt-3 text-ink-muted">
        {posts.length} {posts.length === 1 ? "article" : "articles"}
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {items.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} basePath={`/blog/categories/${slug}`} />
    </div>
  );
}
