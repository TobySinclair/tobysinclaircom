import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "bucket.mlcdn.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/about-old", destination: "/about", permanent: true },
      { source: "/book-summaries-old", destination: "/book-summaries", permanent: true },
      { source: "/book-summaries-old2", destination: "/book-summaries", permanent: true },
      { source: "/test", destination: "/", permanent: true },
      { source: "/aidirectory", destination: "/blog", permanent: true },
      { source: "/ai-coach-directory", destination: "/blog", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/index.md", destination: "/llm/index" },
      { source: "/about.md", destination: "/llm/about" },
      { source: "/blog.md", destination: "/llm/blog" },
      { source: "/book-summaries.md", destination: "/llm/book-summaries" },
      { source: "/post/:slug.md", destination: "/llm/post/:slug" },
      { source: "/:slug.md", destination: "/llm/page/:slug" },
    ];
  },
};

export default nextConfig;
