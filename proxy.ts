import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { site } from "@/lib/site";

function canonicalFor(pathname: string) {
  if (pathname === "/index.md") return `${site.url}/`;
  if (pathname.endsWith(".md")) return `${site.url}${pathname.slice(0, -3)}`;
  return null;
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  const canonical = canonicalFor(request.nextUrl.pathname);
  if (canonical) {
    response.headers.set("Link", `<${canonical}>; rel="canonical"`);
  }
  return response;
}

export const config = {
  matcher: [
    "/llms.txt",
    "/llms-full.txt",
    "/index.md",
    "/about.md",
    "/work-with-me.md",
    "/blog.md",
    "/book-summaries.md",
    "/post/:slug.md",
    "/:slug.md",
  ],
};
