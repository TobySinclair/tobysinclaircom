export const permanentRedirects = [
  {
    source: "/post/the-ultimate-guide-to-ai-sales-roleplay-mastering-the-art-of-the-deal-in-the-digital-age",
    destination: "/post/ai-roleplay-training",
  },
  {
    source: "/post/45-roleplay-ideas-for-training-sales-support-leadership",
    destination: "/post/ai-roleplay-training",
  },
] as const;

export const redirectedPostSlugs = new Set(
  permanentRedirects.map((item) => item.source.replace(/^\/post\//, "")),
);
