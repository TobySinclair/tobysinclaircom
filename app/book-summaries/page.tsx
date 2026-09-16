import type { Metadata } from "next";
import { BookSummaryHubNav } from "@/components/book-summary-hubs";
import { BookThemeGroups } from "@/components/book-theme-groups";
import { ContextCta } from "@/components/context-cta";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getBookSummaries } from "@/lib/content";
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.seo.bookTitle,
  description: site.seo.bookDescription,
  path: "/book-summaries",
});

export default function BookSummariesPage() {
  const posts = getBookSummaries();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <JsonLd
        data={[
          collectionJsonLd({
            name: site.seo.bookTitle,
            description: site.seo.bookDescription,
            path: "/book-summaries",
            posts,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book Summaries", path: "/book-summaries" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Book Summaries" }]} />
      <p className="eyebrow mt-6">Archive</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Book summaries for leaders</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
        {posts.length}+ summaries written from the experience of a practising organisational leader. The big ideas
        and key takeaways in five minutes or less — with notes on how they show up at work.
      </p>
      <div className="mt-10">
        <NewsletterCta id="newsletter-library" />
      </div>
      <h2 className="mt-12 text-xl font-bold tracking-tight">Browse by topic</h2>
      <BookSummaryHubNav posts={posts} />
      <BookThemeGroups posts={posts} />
      <div className="mt-16">
        <ContextCta
          variant="services"
          heading="Want these ideas in your leadership programme?"
          body="I train and coach HR, L&D and leadership teams on the conversations and change these books describe."
          href="/work-with-me"
          buttonLabel="Work with me"
        />
      </div>
    </div>
  );
}
