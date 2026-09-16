import type { MetadataRoute } from "next";
import { bookHubs } from "@/lib/book-hubs";
import { cheatSheets } from "@/lib/cheat-sheets";
import { getAllPosts, getCategories, getLandingPages, paginate } from "@/lib/content";
import { redirectedPostSlugs } from "@/lib/redirects";
import { isRtsPost, rtsCoverImagePath } from "@/lib/rts-cover";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const lastmod = "2026-09-16";
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: lastmod, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/work-with-me`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/talk-with-toby`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/book-summaries`, lastModified: lastmod, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${site.url}/never-split-the-difference-cheat-sheet`,
      lastModified: lastmod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...cheatSheets
      .filter((sheet) => sheet.slug !== "never-split-the-difference-cheat-sheet")
      .map((sheet) => ({
        url: `${site.url}${sheet.path}`,
        lastModified: lastmod,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ...bookHubs.map((hub) => ({
      url: `${site.url}/book-summaries/${hub.slug}`,
      lastModified: lastmod,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const blogPages = paginate(posts, 1).totalPages;
  for (let page = 2; page <= blogPages; page += 1) {
    pages.push({ url: `${site.url}/blog/page/${page}`, changeFrequency: "weekly", priority: 0.4 });
  }

  for (const category of getCategories()) {
    pages.push({
      url: `${site.url}/blog/categories/${category.slug}`,
      changeFrequency: "weekly",
      priority: 0.5,
    });
    const totalPages = paginate(posts.filter((post) => post.categories.includes(category.slug)), 1).totalPages;
    for (let page = 2; page <= totalPages; page += 1) {
      pages.push({
        url: `${site.url}/blog/categories/${category.slug}/page/${page}`,
        changeFrequency: "weekly",
        priority: 0.3,
      });
    }
  }

  for (const post of posts) {
    if (post.noindex || redirectedPostSlugs.has(post.slug)) continue;
    pages.push({
      url: `${site.url}/post/${post.slug}`,
      lastModified: post.modified || post.published || undefined,
      changeFrequency: "monthly",
      priority: 0.7,
      images: isRtsPost(post)
        ? [`${site.url}${rtsCoverImagePath(post.slug)}`]
        : post.image
          ? [post.image]
          : undefined,
    });
  }

  for (const page of getLandingPages()) {
    pages.push({
      url: `${site.url}/${page.slug}`,
      lastModified: page.modified || undefined,
      changeFrequency: "monthly",
      priority: 0.5,
      images: page.image ? [page.image] : undefined,
    });
  }

  return pages;
}
