export const site = {
  name: "Toby Sinclair",
  url: "https://www.tobysinclair.com",
  title: "Toby Sinclair Personal Development Coach | Coaching and Mentoring",
  description:
    "I help Senior Managers accelerate their personal development. Learn to master the core skills of coaching: listening, asking, and sensing. You'll create a culture that everyone wants to be part of.",
  author: "Toby Sinclair",
  realTalk: "https://www.realtalkstudio.com/",
  realTalkPractise: "https://www.realtalkstudio.com/",
  seo: {
    homeTitle: "Toby Sinclair Personal Development Coach | Coaching and Mentoring",
    homeDescription:
      "I help Senior Managers accelerate their personal development. Learn to master the core skills of coaching: listening, asking, and sensing. You'll create a culture that everyone wants to be part of.",
    homeImage: "https://static.wixstatic.com/media/67d4e8_f7d54e256600498091d9d102b6ba98f8~mv2.png",
    aboutTitle: "My Story",
    aboutDescription:
      "Toby Sinclair is a coach, advisor and teacher. He helps leaders become more coach-like. Teaching techniques that help unlock high performance in the workplace.",
    aboutImage: "https://static.wixstatic.com/media/67d4e8_cb30b6b2539b47d78a0cfc0e4b546caa~mv2.png",
    blogTitle: "Coaching Blog",
    blogDescription:
      "Essays, book summaries and practical notes on coaching, leadership, and the conversations that shape teams.",
    bookTitle: "100+ Book Summaries Written By Leaders For Leaders",
    bookDescription:
      "100+ book summaries written by a practising organisational leader. The big ideas and key takeaways in five minutes or less.",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/tobysinclair/",
    twitter: "https://twitter.com/TobySinclair_",
    youtube: "https://www.youtube.com/channel/UCdx4I-XAq-K3LSmma5bTTUQ",
    instagram: "https://www.instagram.com/toby.sinclair.coach/",
  },
} as const;

export const POSTS_PER_PAGE = 12;

const CATEGORY_LABELS: Record<string, string> = {
  "book-summaries": "Book Summaries",
  "book-collections": "Book Collections",
  "organisational-design": "Organisational Design",
  "systems-thinking-complexity": "Systems Thinking & Complexity",
  "team-coaching": "Team Coaching",
  "change-agents": "Change Agents",
  "curated-insights": "Curated Insights",
  "habits-program": "Habits Program",
  "personal-productivity": "Personal Productivity",
  "product-management": "Product Management",
  "real-talk-studio": "Real Talk Studio",
  "self-care": "Self-Care",
};

export function categoryLabel(slug: string) {
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
