import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";

export function GET() {
  const posts = getAllPosts().slice(0, 30);
  const items = posts
    .map((post) => {
      const url = `${site.url}/post/${post.slug}`;
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${post.published ? new Date(post.published).toUTCString() : ""}</pubDate>
          <description><![CDATA[${post.description}]]></description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${site.name}</title>
      <link>${site.url}</link>
      <description>${site.description}</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
