import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { formatDate } from "@/lib/site";

export type BookSummaryCard = {
  slug: string
  title: string
  description: string
  image: string | null
  published: string | null
  categories: string[]
  rating: number | null
  bookTitle: string
};

export function toBookSummaryCard(post: {
  slug: string
  title: string
  description: string
  image: string | null
  published: string | null
  categories: string[]
  book: { rating: number | null; bookTitle: string } | null
}): BookSummaryCard {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    image: post.image,
    published: post.published,
    categories: post.categories,
    rating: post.book?.rating ?? null,
    bookTitle: post.book?.bookTitle || post.title,
  };
}

export function BookCoverGrid({
  posts,
  className = "",
}: {
  posts: BookSummaryCard[]
  className?: string
}) {
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 ${className}`}>
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
                {post.bookTitle}
              </h2>
              <p className="mt-1 text-xs text-white/55">
                {post.rating != null ? `${post.rating}/10` : null}
                {post.rating != null && post.published ? " · " : null}
                {post.published ? formatDate(post.published) : null}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
