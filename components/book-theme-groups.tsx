import { BookCoverGrid, toBookSummaryCard } from "@/components/book-cover-grid";
import { bookThemes, summariesForTheme } from "@/lib/book-themes";
import type { Post } from "@/lib/content";

export function BookThemeGroups({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-16 space-y-16">
      {bookThemes.map((theme) => {
        const grouped = summariesForTheme(posts, theme);
        if (!grouped.length) return null;
        return (
          <section key={theme.slug}>
            <h2 className="text-xl font-bold tracking-tight">{theme.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">{theme.intro}</p>
            <BookCoverGrid posts={grouped.map(toBookSummaryCard)} className="mt-6" />
          </section>
        );
      })}
    </div>
  );
}
