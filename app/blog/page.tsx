import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { getAllPosts, getCategories, paginate } from "@/lib/content";
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata } from "@/lib/seo";
import { categoryLabel, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.seo.blogTitle,
  description: site.seo.blogDescription,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const { items, page, totalPages } = paginate(posts, 1);
  const categories = getCategories();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <JsonLd
        data={[
          collectionJsonLd({
            name: site.seo.blogTitle,
            description: site.seo.blogDescription,
            path: "/blog",
            posts,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/blog" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Articles" }]} />
      <p className="eyebrow mt-6">Library</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Articles</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-muted">
        Essays and notes on coaching, leadership, and the conversations that shape teams.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/categories/${category.slug}`}
            className="rounded-full border border-white/10 bg-surface px-3 py-1 text-xs text-ink-muted hover:border-green hover:text-white"
          >
            {categoryLabel(category.slug)}
          </Link>
        ))}
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {items.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}
