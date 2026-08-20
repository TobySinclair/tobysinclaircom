"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { categoryLabel, formatDate } from "@/lib/site";

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

const TOPIC_SKIP = new Set(["book-summaries", "book-collections"]);

function topicCounts(posts: BookSummaryCard[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const category of post.categories) {
      if (TOPIC_SKIP.has(category)) continue;
      counts.set(category, (counts.get(category) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

function yearCounts(posts: BookSummaryCard[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const year = post.published?.slice(0, 4);
    if (!year) continue;
    counts.set(year, (counts.get(year) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-green bg-green/10 text-white"
          : "border-white/10 bg-surface text-ink-muted hover:border-green hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

const ratingFilters = [
  { id: null, label: "All ratings" },
  { id: 9, label: "9+" },
  { id: 8, label: "8+" },
  { id: 7, label: "7+" },
] as const;

export function BookSummaryGallery({ posts }: { posts: BookSummaryCard[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);

  const topics = useMemo(() => topicCounts(posts), [posts]);
  const years = useMemo(() => yearCounts(posts), [posts]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (topic && !post.categories.includes(topic)) return false;
      if (year && post.published?.slice(0, 4) !== year) return false;
      if (minRating != null && (post.rating == null || post.rating < minRating)) return false;
      if (!needle) return true;
      return (
        post.title.toLowerCase().includes(needle) ||
        post.bookTitle.toLowerCase().includes(needle) ||
        post.description.toLowerCase().includes(needle)
      );
    });
  }, [posts, query, topic, year, minRating]);

  return (
    <div className="mt-10">
      <label className="sr-only" htmlFor="book-search">
        Search book summaries
      </label>
      <input
        id="book-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title or idea…"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-ink-muted focus:border-green focus:outline-none"
      />

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Topic</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip active={topic === null} onClick={() => setTopic(null)}>
            All {posts.length}
          </Chip>
          {topics.map((item) => (
            <Chip
              key={item.slug}
              active={topic === item.slug}
              onClick={() => setTopic(topic === item.slug ? null : item.slug)}
            >
              {categoryLabel(item.slug)} {item.count}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Rating</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ratingFilters.map((item) => (
            <Chip
              key={item.label}
              active={minRating === item.id}
              onClick={() => setMinRating(item.id)}
            >
              {item.label}
              {item.id != null
                ? ` ${posts.filter((post) => post.rating != null && post.rating >= item.id).length}`
                : ""}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Year</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip active={year === null} onClick={() => setYear(null)}>
            All years
          </Chip>
          {years.map((item) => (
            <Chip
              key={item.year}
              active={year === item.year}
              onClick={() => setYear(year === item.year ? null : item.year)}
            >
              {item.year} {item.count}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-muted">
        {filtered.length === posts.length
          ? `${posts.length} summaries`
          : `${filtered.length} of ${posts.length} summaries`}
      </p>

      {filtered.length ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {filtered.map((post, index) => (
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
      ) : (
        <p className="mt-10 text-ink-muted">No summaries match those filters.</p>
      )}
    </div>
  );
}
