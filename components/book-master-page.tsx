import Link from "next/link";
import { BookCoverGrid, toBookSummaryCard } from "@/components/book-cover-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import type { BookMaster } from "@/lib/book-masters";
import { getAllPosts, type Post } from "@/lib/content";
import { breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";

function postsBySlug(slugs: string[], posts: Post[]) {
  const index = new Map(posts.map((post) => [post.slug, post]));
  return slugs.map((slug) => index.get(slug)).filter((post): post is Post => Boolean(post));
}

export function BookMasterPage({ master }: { master: BookMaster }) {
  const all = getAllPosts();
  const featured = postsBySlug(
    [...new Set([...master.startHere, ...master.sections.flatMap((section) => section.slugs)])],
    all,
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <JsonLd
        data={[
          collectionJsonLd({
            name: master.title,
            description: master.description,
            path: `/${master.slug}`,
            posts: featured,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book Summaries", path: "/book-summaries" },
            { name: master.title, path: `/${master.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Book Summaries", href: "/book-summaries" },
          { name: master.title },
        ]}
      />
      <p className="eyebrow mt-6">Master list</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{master.headline}</h1>
      {master.intro.map((paragraph) => (
        <p key={paragraph} className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
          {paragraph}
        </p>
      ))}

      <section className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">Start here</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
          If you only read three, read these. Then use the levels.
        </p>
        <BookCoverGrid posts={postsBySlug(master.startHere, all).map(toBookSummaryCard)} className="mt-6" />
      </section>

      {master.sections.map((section) => {
        const posts = postsBySlug(section.slugs, all);
        if (!posts.length) return null;
        return (
          <section key={section.title} className="mt-16">
            <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">{section.body}</p>
            <BookCoverGrid posts={posts.map(toBookSummaryCard)} className="mt-6" />
          </section>
        );
      })}

      {master.also.length ? (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight">Also worth buying</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
            I recommend these. I have not written a full summary yet.
          </p>
          <ul className="mt-6 space-y-2 text-sm leading-7 text-ink-muted">
            {master.also.map((book) => (
              <li key={book.title}>
                <span className="text-white">{book.title}</span> — {book.author}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-16 text-sm text-ink-muted">
        <Link href={master.hub.href} className="text-green hover:underline">
          {master.hub.label} →
        </Link>
        {" · "}
        <Link href="/book-summaries" className="text-green hover:underline">
          Full library
        </Link>
      </p>
    </div>
  );
}
