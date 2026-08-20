import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { MarkdownBody } from "@/components/markdown-body";
import { hubsForPost } from "@/lib/book-hubs";
import {
  bookCitation,
  bookSummaryFaqs,
  bookSummaryHeadline,
  bookSummaryHeadings,
  bookSummaryVerdict,
} from "@/lib/book-summary";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/site";

function RatingMarks({ value }: { value: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => (
        <span
          key={index}
          className={`h-2 w-2 rounded-full ${index < value ? "bg-green" : "bg-white/15"}`}
        />
      ))}
    </div>
  );
}

export function BookSummaryArticle({
  post,
  related,
}: {
  post: Post
  related: Post[]
}) {
  const book = post.book;
  if (!book) return null;
  const headings = bookSummaryHeadings(post.body);
  const verdict = bookSummaryVerdict(book, post.description);
  const faqs = bookSummaryFaqs(book, post.description);
  const hubs = hubsForPost(post);

  return (
    <>
      <p className="eyebrow mt-6">Book summary</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{bookSummaryHeadline(book)}</h1>
      {book.author ? <p className="mt-3 text-lg text-white/70">by {book.author}</p> : null}
      <p className="mt-4 text-lg leading-8 text-white/80">{verdict}</p>
      <p className="mt-4 text-sm text-ink-muted">
        Notes by Toby Sinclair
        {post.published ? ` · ${formatDate(post.published)}` : ""}
        {post.readingTime ? ` · ${post.readingTime}` : ""}
      </p>
      {hubs.length ? (
        <p className="mt-4 flex flex-wrap gap-2">
          {hubs.map((hub) => (
            <Link
              key={hub.slug}
              href={`/book-summaries/${hub.slug}`}
              className="rounded-full border border-white/10 bg-surface px-3 py-1 text-xs text-ink-muted hover:border-green hover:text-white"
            >
              {hub.title.replace(/ book summaries.*/i, "")}
            </Link>
          ))}
        </p>
      ) : null}

      <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            {book.rating != null ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green">Toby&apos;s rating</p>
                <p className="mt-2 text-4xl font-bold tracking-tight" aria-label={`${book.rating} out of 10`}>
                  {book.rating}/10
                </p>
                <div className="mt-3">
                  <RatingMarks value={book.rating} />
                </div>
              </>
            ) : (
              <p className="text-sm text-ink-muted">A practising leader&apos;s notes on this book.</p>
            )}
            {book.audience ? (
              <p className="mt-4 text-sm leading-7 text-ink-muted">
                Recommended for <span className="text-white">{book.audience}</span>
              </p>
            ) : null}
          </div>
          {book.amazon ? (
            <a href={book.amazon} className="btn-primary shrink-0" rel="noreferrer sponsored">
              Buy on Amazon
            </a>
          ) : null}
        </div>
      </section>

      {post.image ? (
        <CoverImage
          src={post.image}
          alt={`${book.bookTitle}${book.author ? ` by ${book.author}` : ""} book summary`}
          width={1400}
          height={780}
          className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
          priority
        />
      ) : null}

      {headings.length > 1 ? (
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className="rounded-full border border-white/10 bg-surface px-3 py-1 text-xs text-ink-muted hover:border-green hover:text-white"
            >
              {heading.label}
            </a>
          ))}
        </nav>
      ) : null}

      <p className="mt-8 text-sm leading-7 text-ink-muted">
        Written from the seat of a practising organisational leader — not an AI recap of the book.
        Cite as {bookCitation(book)}.
      </p>

      <div className="mt-8">
        <MarkdownBody content={post.body} />
      </div>

      <section id="faq" className="mt-12 rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight">Questions</h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold tracking-tight">{item.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-ink-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {book.amazon ? (
        <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-green/25 bg-green/[0.06] px-6 py-8 md:flex md:items-center md:justify-between md:px-8">
          <p className="max-w-md text-lg font-bold tracking-tight">
            If the ideas landed, read the book.
          </p>
          <a href={book.amazon} className="btn-primary mt-5 md:mt-0" rel="noreferrer sponsored">
            Buy {book.bookTitle} on Amazon
          </a>
        </div>
      ) : null}

      {related.length ? (
        <aside className="mt-16">
          <h2 className="text-xl font-bold tracking-tight">More book summaries</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/post/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40"
              >
                {item.image ? (
                  <CoverImage
                    src={item.image}
                    alt={item.book?.bookTitle || item.title}
                    width={640}
                    height={360}
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : null}
                <span className="block p-4 text-sm font-semibold tracking-tight group-hover:text-green">
                  {item.book?.bookTitle || item.title}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}

      <p className="mt-12 text-sm text-ink-muted">
        <Link href="/book-summaries" className="text-green hover:underline">
          All book summaries
        </Link>
        {hubs.length ? " · " : null}
        {hubs.map((hub, index) => (
          <span key={hub.slug}>
            <Link href={`/book-summaries/${hub.slug}`} className="text-green hover:underline">
              {hub.title}
            </Link>
            {index < hubs.length - 1 ? " · " : null}
          </span>
        ))}
      </p>
    </>
  );
}
