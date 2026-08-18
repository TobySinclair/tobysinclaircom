import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { RtsCover } from "@/components/rts-cover";
import type { Post } from "@/lib/content";
import { isRtsPost } from "@/lib/rts-cover";
import { categoryLabel, formatDate } from "@/lib/site";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const rts = isRtsPost(post);
  const showCover = rts || Boolean(post.image);

  return (
    <article className={featured ? "grid gap-8 md:grid-cols-2 md:items-center" : "flex flex-col"}>
      {showCover ? (
        <Link
          href={`/post/${post.slug}`}
          aria-label={post.title}
          className="relative block overflow-hidden rounded-2xl bg-black"
        >
          {rts ? (
            <RtsCover
              post={post}
              size={featured ? "lg" : "sm"}
              className="aspect-[16/10] w-full transition-transform duration-300 hover:scale-[1.02]"
            />
          ) : (
            <CoverImage
              src={post.image!}
              alt={post.title}
              width={featured ? 1200 : 800}
              height={featured ? 720 : 480}
              className="aspect-[16/10] w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          )}
        </Link>
      ) : null}
      <div className={featured ? "" : "mt-4"}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {post.published ? <time dateTime={post.published}>{formatDate(post.published)}</time> : null}
          {post.categories[0] ? <span className="text-green">{categoryLabel(post.categories[0])}</span> : null}
          {post.readingTime ? <span>{post.readingTime}</span> : null}
        </div>
        <h2 className={`mt-2 font-bold tracking-tight ${featured ? "text-3xl" : "text-xl"}`}>
          <Link href={`/post/${post.slug}`} className="hover:text-green">
            {post.title}
          </Link>
        </h2>
        {post.description ? (
          <p className="mt-3 text-[15px] leading-7 text-ink-muted line-clamp-3">{post.description}</p>
        ) : null}
      </div>
    </article>
  );
}
