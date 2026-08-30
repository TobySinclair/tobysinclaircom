import type { Metadata } from "next";
import { articleFaqsFor } from "@/lib/article-faqs";
import { bookSummaryDescription, bookSummaryFaqs, bookSummaryPageTitle } from "@/lib/book-summary";
import type { LandingPage, Post } from "@/lib/content";
import { isRtsPost, rtsCoverImagePath } from "@/lib/rts-cover";
import { categoryLabel, site } from "@/lib/site";

export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: site.seo.homeTitle,
};

export const personId = `${site.url}/#person`;
export const orgId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "/" : clean}`;
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.author,
    url: site.url,
    image: absoluteUrl("/toby.png"),
    jobTitle: "Founder, Coach and Trainer",
    description: site.seo.homeDescription,
    worksFor: {
      "@type": "Organization",
      name: "Real Talk Studio",
      url: site.realTalk,
    },
    sameAs: Object.values(site.social),
  };
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon-512.png"),
    founder: { "@id": personId },
    sameAs: Object.values(site.social),
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: site.seo.homeDescription,
    inLanguage: "en-GB",
    publisher: { "@id": orgId },
    author: { "@id": personId },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingJsonLd(post: Post) {
  const book = post.book;
  return {
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/post/${post.slug}#article`),
    headline: book ? bookSummaryPageTitle(book) : post.title,
    description: book ? bookSummaryDescription(post.description, book) : post.description,
    image: isRtsPost(post)
      ? [absoluteUrl(rtsCoverImagePath(post.slug))]
      : post.image
        ? [absoluteUrl(post.image)]
        : [absoluteUrl(rtsCoverImagePath(post.slug))],
    datePublished: post.published,
    dateModified: post.modified || post.published,
    author: { "@id": personId },
    publisher: { "@id": orgId },
    mainEntityOfPage: absoluteUrl(`/post/${post.slug}`),
    url: absoluteUrl(`/post/${post.slug}`),
    keywords: [
      ...post.categories.map(categoryLabel),
      ...articleFaqsFor(post.slug).length
        ? ["deliberate practice", "deliberate practice for leaders", "leadership development"]
        : [],
    ].join(", "),
    articleSection: post.categories[0] ? categoryLabel(post.categories[0]) : "Articles",
    inLanguage: "en-GB",
    isPartOf: { "@id": websiteId },
    ...(book ? { about: { "@id": absoluteUrl(`/post/${post.slug}#book`) } } : {}),
  };
}

export function bookReviewJsonLd(post: Post) {
  const book = post.book;
  if (!book) return [];
  const bookId = absoluteUrl(`/post/${post.slug}#book`);
  const nodes: Record<string, unknown>[] = [
    {
      "@type": "Book",
      "@id": bookId,
      name: book.bookTitle,
      ...(book.author ? { author: { "@type": "Person", name: book.author } } : {}),
      ...(book.isbn ? { isbn: book.isbn } : {}),
      ...(book.sameAs.length ? { sameAs: book.sameAs } : {}),
      ...(post.image ? { image: absoluteUrl(post.image) } : {}),
    },
  ];
  if (book.rating != null) {
    nodes.push({
      "@type": "Review",
      "@id": absoluteUrl(`/post/${post.slug}#review`),
      itemReviewed: { "@id": bookId },
      author: { "@id": personId },
      publisher: { "@id": orgId },
      reviewRating: {
        "@type": "Rating",
        ratingValue: book.rating,
        bestRating: 10,
        worstRating: 1,
      },
      reviewBody: post.description,
      url: absoluteUrl(`/post/${post.slug}`),
    });
  }
  return nodes;
}

function faqPageJsonLd(slug: string, faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl(`/post/${slug}#faq`),
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function bookFaqJsonLd(post: Post) {
  const book = post.book;
  if (!book) return null;
  return faqPageJsonLd(post.slug, bookSummaryFaqs(book, post.description));
}

export function articleFaqJsonLd(post: Post) {
  return faqPageJsonLd(post.slug, articleFaqsFor(post.slug));
}

export function collectionJsonLd(input: {
  name: string
  description: string
  path: string
  posts: Post[]
}) {
  return {
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.posts.length,
      itemListElement: input.posts.slice(0, 20).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/post/${post.slug}`),
        name: post.book?.bookTitle || post.title,
      })),
    },
  };
}

export function webPageJsonLd(input: {
  name: string
  description: string
  path: string
  type?: string
  image?: string | null
}) {
  return {
    "@type": input.type || "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    image: input.image || absoluteUrl("/opengraph-image"),
  };
}

export function pageMetadata(input: {
  title: string
  description: string
  path: string
  image?: string | null
  type?: "website" | "article"
  published?: string | null
  modified?: string | null
  absoluteTitle?: boolean
}): Metadata {
  const url = input.path;
  const image = input.image
    ? [{ url: input.image, alt: input.title }]
    : [defaultOgImage];

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      type: input.type || "website",
      siteName: site.name,
      locale: "en_GB",
      title: input.title,
      description: input.description,
      url,
      images: image,
      ...(input.type === "article"
        ? {
            publishedTime: input.published ?? undefined,
            modifiedTime: input.modified ?? input.published ?? undefined,
            authors: [site.author],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [input.image || defaultOgImage.url],
      creator: "@TobySinclair_",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function postMetadata(post: Post): Metadata {
  const book = post.book;
  return pageMetadata({
    title: book ? bookSummaryPageTitle(book) : post.title,
    description: book ? bookSummaryDescription(post.description, book) : post.description,
    path: `/post/${post.slug}`,
    image: isRtsPost(post) ? rtsCoverImagePath(post.slug) : post.image,
    type: "article",
    published: post.published,
    modified: post.modified,
  });
}

export function landingMetadata(page: LandingPage): Metadata {
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    image: page.image,
  });
}
