import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { POSTS_PER_PAGE, site } from "./site";

export type Post = {
  slug: string
  title: string
  description: string
  url: string
  published: string | null
  modified: string | null
  image: string | null
  readingTime: string | null
  categories: string[]
  body: string
};

export type LandingPage = {
  slug: string
  title: string
  description: string
  image: string | null
  body: string
};

const postsDir = path.join(process.cwd(), "content/posts");
const pagesDir = path.join(process.cwd(), "content/pages");

function cleanTitle(title: string) {
  return title.replace(/\s*\|\s*Toby Sinclair.*$/i, "").trim() || title;
}

function rewriteBody(body: string, image?: string | null) {
  let next = body
    .replaceAll("https://www.tobysinclair.com", "")
    .replaceAll("https://tobysinclair.com", "")
    .replace(/\\\n/g, "\n");
  if (image) {
    const match = next.match(/^!\[[^\]]*\]\(([^)]+)\)\s*/);
    const first = match?.[1]?.split("/v1/")[0];
    if (first && first === image.split("/v1/")[0]) {
      next = next.slice(match![0].length);
    }
  }
  return next.trim();
}

function readMarkdown(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data, content: rewriteBody(content.trim(), data.image ? String(data.image) : null) };
}

export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data, content } = readMarkdown(path.join(postsDir, file));
      return {
        slug: String(data.slug || file.replace(/\.md$/, "")),
        title: cleanTitle(String(data.title || "Untitled")),
        description: String(data.description || ""),
        url: String(data.url || `${site.url}/post/${data.slug || file.replace(/\.md$/, "")}`),
        published: data.published ? String(data.published) : null,
        modified: data.modified ? String(data.modified) : null,
        image: data.image ? String(data.image) : null,
        readingTime: data.readingTime ? String(data.readingTime) : null,
        categories: Array.isArray(data.categories) ? data.categories.map(String) : [],
        body: content,
      } satisfies Post;
    })
    .sort((a, b) => {
      const aTime = a.published ? Date.parse(a.published) : 0;
      const bTime = b.published ? Date.parse(b.published) : 0;
      return bTime - aTime;
    });
});

export const getPost = cache((slug: string) => {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
});

export function getPostsByCategory(slug: string) {
  return getAllPosts().filter((post) => post.categories.includes(slug));
}

export function getBookSummaries() {
  return getAllPosts().filter(
    (post) =>
      post.categories.includes("book-summaries") ||
      /book summary|summary:/i.test(post.title),
  );
}

export function getCategories() {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const category of post.categories) {
      counts.set(category, (counts.get(category) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: current,
    totalPages,
    total: items.length,
  };
}

export const getLandingPages = cache((): LandingPage[] => {
  if (!fs.existsSync(pagesDir)) return [];
  return fs
    .readdirSync(pagesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data, content } = readMarkdown(path.join(pagesDir, file));
      return {
        slug: String(data.slug || file.replace(/\.md$/, "")),
        title: cleanTitle(String(data.title || "Untitled")),
        description: String(data.description || ""),
        image: data.image ? String(data.image) : null,
        body: content,
      } satisfies LandingPage;
    });
});

export const getLandingPage = cache((slug: string) => {
  return getLandingPages().find((page) => page.slug === slug) ?? null;
});

export function relatedPosts(post: Post, limit = 3) {
  const others = getAllPosts().filter((item) => item.slug !== post.slug);
  const scored = others
    .map((item) => ({
      item,
      score: item.categories.filter((category) => post.categories.includes(category)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || Date.parse(b.item.published || "0") - Date.parse(a.item.published || "0"));
  return (scored.length ? scored.map((entry) => entry.item) : others).slice(0, limit);
}
