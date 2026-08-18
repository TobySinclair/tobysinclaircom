import type { Post } from "@/lib/content";

export const RTS_CATEGORY = "real-talk-studio";

export type RtsCoverCopy = {
  line1: string
  line2: string
  highlight: string
  series: string
  brand: string
  tagline: string
  url: string
};

const shared = {
  series: "All reasonable steps",
  brand: "Real Talk Studio",
  tagline: "A completion certificate is not evidence of competence",
  url: "realtalkstudio.com",
};

const covers: Record<string, Pick<RtsCoverCopy, "line1" | "line2" | "highlight">> = {
  "employee-conflict-resolution-training-the-ultimate-guide-for-modern-workplaces": {
    line1: "They watched the video.",
    line2: "They still froze.",
    highlight: "froze.",
  },
  "the-ultimate-guide-to-ai-sales-roleplay-mastering-the-art-of-the-deal-in-the-digital-age": {
    line1: "They knew the pitch.",
    line2: "They were not ready.",
    highlight: "ready.",
  },
  "compliance-employee-training-in-the-age-of-ai-from-tick-box-to-true-competence": {
    line1: "They passed the quiz.",
    line2: "They were not ready.",
    highlight: "ready.",
  },
  "45-roleplay-ideas-for-training-sales-support-leadership": {
    line1: "They knew the method.",
    line2: "They never said it out loud.",
    highlight: "out loud.",
  },
  "using-ai-roleplay-difficult-conversations": {
    line1: "They knew it was coming.",
    line2: "They had never practised.",
    highlight: "practised.",
  },
};

export function isRtsPost(post: Pick<Post, "categories">) {
  return post.categories.includes(RTS_CATEGORY);
}

export function rtsCoverImagePath(slug: string) {
  return `/post/${slug}/opengraph-image`;
}

export function splitHighlight(line: string, highlight: string) {
  const index = line.toLowerCase().lastIndexOf(highlight.toLowerCase());
  if (index === -1) {
    return { before: line, highlight: "", after: "" };
  }
  return {
    before: line.slice(0, index),
    highlight: line.slice(index, index + highlight.length),
    after: line.slice(index + highlight.length),
  };
}

function fallbackCover(title: string): Pick<RtsCoverCopy, "line1" | "line2" | "highlight"> {
  const [first, rest] = title.split(":");
  if (rest) {
    const line2 = rest.trim();
    const words = line2.split(" ");
    return {
      line1: first.trim(),
      line2,
      highlight: words[words.length - 1] || line2,
    };
  }
  const words = title.split(" ");
  const mid = Math.max(3, Math.ceil(words.length / 2));
  const line2 = words.slice(mid).join(" ");
  const last = words[words.length - 1] || title;
  return {
    line1: words.slice(0, mid).join(" "),
    line2,
    highlight: last,
  };
}

export function getRtsCover(post: Pick<Post, "slug" | "title">): RtsCoverCopy {
  const lines = covers[post.slug] ?? fallbackCover(post.title);
  return { ...shared, ...lines };
}
