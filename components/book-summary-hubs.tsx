import Link from "next/link";
import { bookHubs, summariesForHub, type BookHub } from "@/lib/book-hubs";
import type { Post } from "@/lib/content";

export function BookSummaryHubNav({
  posts,
  active,
}: {
  posts: Post[]
  active?: string
}) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bookHubs.map((hub) => {
        const count = summariesForHub(posts, hub).length;
        const current = hub.slug === active;
        return (
          <Link
            key={hub.slug}
            href={`/book-summaries/${hub.slug}`}
            className={`rounded-2xl border p-5 transition-colors ${
              current
                ? "border-green bg-green/10"
                : "border-white/10 bg-[#0c0c14] hover:border-green"
            }`}
          >
            <p className="text-sm font-semibold tracking-tight">{hub.headline}</p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{count} summaries</p>
          </Link>
        );
      })}
    </div>
  );
}

export function BookHubCollections({ hub }: { hub: BookHub }) {
  if (!hub.collections.length) return null;
  return (
    <p className="mt-6 text-sm leading-7 text-ink-muted">
      Also see{" "}
      {hub.collections.map((item, index) => (
        <span key={item.href}>
          <Link href={item.href} className="text-green hover:underline">
            {item.label}
          </Link>
          {index < hub.collections.length - 1 ? ", " : "."}
        </span>
      ))}
    </p>
  );
}
