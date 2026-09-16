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
      {
        source: "/never-split-the-difference-cheat-sheet-pdf",
        destination: "/never-split-the-difference-cheat-sheet",
        permanent: true,
      },
      {
        source: "/never-split-the-difference-cheatsheet",
        destination: "/never-split-the-difference-cheat-sheet",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/index.md", destination: "/llm/index" },
      { source: "/about.md", destination: "/llm/about" },
      { source: "/work-with-me.md", destination: "/llm/work-with-me" },
      {
        source: "/never-split-the-difference-cheat-sheet.md",
        destination: "/llm/never-split-the-difference-cheat-sheet",
      },
      { source: "/supercommunicators-cheat-sheet.md", destination: "/llm/supercommunicators-cheat-sheet" },
      { source: "/fierce-conversations-cheat-sheet.md", destination: "/llm/fierce-conversations-cheat-sheet" },
      { source: "/crucial-conversations-cheat-sheet.md", destination: "/llm/crucial-conversations-cheat-sheet" },
      { source: "/how-to-know-a-person-cheat-sheet.md", destination: "/llm/how-to-know-a-person-cheat-sheet" },
      { source: "/blog.md", destination: "/llm/blog" },
      { source: "/book-summaries.md", destination: "/llm/book-summaries" },
      { source: "/book-summaries/:hub.md", destination: "/llm/book-summaries/:hub" },
      { source: "/post/:slug.md", destination: "/llm/post/:slug" },
      { source: "/:slug.md", destination: "/llm/page/:slug" },
    ];
  },
};

export default nextConfig;
