import { notFound } from "next/navigation";
import { bookHubs } from "@/lib/book-hubs";
import { getAllPosts, getLandingPages } from "@/lib/content";
import { markdownForPath, markdownHeaders } from "@/lib/llms";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { path: ["index"] },
    { path: ["about"] },
    { path: ["work-with-me"] },
    { path: ["never-split-the-difference-cheat-sheet"] },
    { path: ["blog"] },
    { path: ["book-summaries"] },
    ...bookHubs.map((hub) => ({ path: ["book-summaries", hub.slug] })),
    ...getAllPosts().map((post) => ({ path: ["post", post.slug] })),
    ...getLandingPages().map((page) => ({ path: ["page", page.slug] })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const markdown = markdownForPath(path);
  if (!markdown) notFound();
  return new Response(markdown.body, { headers: markdownHeaders(markdown.htmlPath) });
}
