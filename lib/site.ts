export const site = {
  name: "Toby Sinclair",
  url: "https://www.tobysinclair.com",
  title: "Toby Sinclair | The Human Side of AI",
  description:
    "I help enterprises with the human side of AI — change management, coaching, and the conversations nobody scheduled. Founder of Real Talk Studio. ICF Professional Certified Coach.",
  author: "Toby Sinclair",
  realTalk: "https://www.realtalkstudio.com/",
  realTalkPractise: "https://www.realtalkstudio.com/",
  talkWithTobyEmbed:
    "https://www.realtalkstudio.com/coach/toby-sinclair?studioId=1ec01f58-b431-44b7-bf39-4c2e279a41c4&autostart=1&branding=false",
  fourThousandWeeksCoach:
    "https://www.realtalkstudio.com/coach/anna-jones?studioId=1ec01f58-b431-44b7-bf39-4c2e279a41c4&branding=true",
  calendly: "https://calendly.com/toby-sinclair/discovery",
  seo: {
    homeTitle: "Toby Sinclair | The Human Side of AI",
    homeDescription:
      "I help enterprises with the human side of AI — change management, coaching, and the conversations nobody scheduled. Founder of Real Talk Studio. ICF Professional Certified Coach.",
    homeImage: "https://static.wixstatic.com/media/67d4e8_f7d54e256600498091d9d102b6ba98f8~mv2.png",
    aboutTitle: "About Toby Sinclair",
    aboutDescription:
      "Toby Sinclair is the person enterprises call when AI meets people. ICF Professional Certified Coach and founder of Real Talk Studio. Coaching is the method; AI is the territory.",
    aboutImage: "https://static.wixstatic.com/media/67d4e8_cb30b6b2539b47d78a0cfc0e4b546caa~mv2.png",
    workTitle: "Work With Me",
    workDescription:
      "I work with enterprises on the human side of AI — training teams, coaching leaders, and building the practice habits that make change stick. Book a 30-minute discovery call.",
    talkTitle: "Talk with Toby",
    talkDescription:
      "Have a live conversation with an AI simulation of Toby Sinclair. Practise a hard conversation before you have it for real.",
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
  roleplay: "Roleplay",
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
