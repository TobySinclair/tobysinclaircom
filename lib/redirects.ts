export const permanentRedirects = [
  {
    source: "/post/the-ultimate-guide-to-ai-sales-roleplay-mastering-the-art-of-the-deal-in-the-digital-age",
    destination: "/post/ai-roleplay-training",
  },
  {
    source: "/post/45-roleplay-ideas-for-training-sales-support-leadership",
    destination: "/post/ai-roleplay-training",
  },
  {
    source: "/post/5-coaching-definitions",
    destination: "/post/coaching-definition",
  },
  {
    source: "/post/how-to-become-an-icf-certified-coach-a-guide-for-agile-coaches",
    destination: "/post/how-i-became-an-icf-associate-certified-coach",
  },
  {
    source: "/learn-to-coach",
    destination: "/coaching-skills-program",
  },
] as const;

export const redirectedPostSlugs = new Set(
  permanentRedirects
    .filter((item) => item.source.startsWith("/post/"))
    .map((item) => item.source.replace(/^\/post\//, "")),
);
