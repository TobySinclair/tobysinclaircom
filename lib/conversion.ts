import { hubsForPost, type BookHubCandidate } from "@/lib/book-hubs";
import type { Post } from "@/lib/content";
import { site } from "@/lib/site";

export type ConversionIntent = "conversation" | "sales" | "coaching" | "ai" | "workshop";

export type ConversionOffer = {
  intent: ConversionIntent
  eyebrow: string
  title: string
  body: string
  cta: string
  href: string
  secondaryCta?: string
  secondaryHref?: string
};

const SALES_SLUGS = new Set([
  "never-split-the-difference-summary",
  "summary-pitch-anything-by-oren-klaff",
  "summary-getting-to-yes-by-roger-fisher-william-ury",
  "the-ultimate-guide-to-ai-sales-roleplay-mastering-the-art-of-the-deal-in-the-digital-age",
  "influence-is-your-superpower-zoe-chance",
  "whats-in-it-for-them-by-joe-polish",
]);

const WORKSHOP_SLUGS = new Set(["workshop-planning-template"]);

const AI_SLUGS = new Set([
  "best-artificial-intelligence-books-for-leadership-development",
  "artificial-intelligence-coaching",
  "compliance-employee-training-in-the-age-of-ai-from-tick-box-to-true-competence",
]);

const NONE_SLUGS = new Set([
  "summary-jonathan-livingston-seagull-by-richard-bach",
  "summary-the-five-love-languages-by-gary-chapman",
  "summary-the-pathless-path-by-paul-millerd",
  "summary-same-as-ever-by-morgan-housel",
  "summary-quit-by-annie-duke",
  "summary-million-dollar-weekend-by-noah-kagan",
  "summary-the-4-hour-chef-by-tim-ferris",
  "the-body-keeps-the-score-summary-by-bessel-van-der-kolk",
  "summary-the-4-hour-work-week",
]);

function haystack(input: { slug: string; title?: string; bookTitle?: string | null }) {
  return [input.slug, input.title, input.bookTitle].filter(Boolean).join(" ").toLowerCase();
}

export function conversionIntentFor(
  input: { slug: string; title?: string; categories?: string[]; bookTitle?: string | null },
): ConversionIntent | null {
  if (NONE_SLUGS.has(input.slug)) return null;
  if (SALES_SLUGS.has(input.slug)) return "sales";
  if (WORKSHOP_SLUGS.has(input.slug)) return "workshop";
  if (AI_SLUGS.has(input.slug)) return "ai";

  const text = haystack(input);
  if (/pitch anything|never split|getting to yes|negotiat|cold call|closing the deal/.test(text)) {
    return "sales";
  }
  if (/workshop planning|how to plan a workshop/.test(text)) return "workshop";
  if (/\bai\b|artificial intelligence/.test(text)) return "ai";

  const candidate: BookHubCandidate = {
    slug: input.slug,
    title: input.title || "",
    description: "",
    categories: input.categories || [],
    book: input.bookTitle ? { bookTitle: input.bookTitle } : null,
  };
  const hubs = hubsForPost(candidate).map((hub) => hub.slug);
  if (hubs.includes("hard-conversations")) return "conversation";
  if (hubs.includes("ai")) return "ai";
  if (hubs.includes("coaching") || input.categories?.includes("coaching") || input.categories?.includes("team-coaching")) {
    return "coaching";
  }
  if (hubs.includes("leadership") || input.categories?.includes("leadership")) return "coaching";
  if (input.categories?.includes("real-talk-studio")) return "conversation";
  return null;
}

const HUB_INTENTS: Record<string, ConversionIntent> = {
  "hard-conversations": "conversation",
  coaching: "coaching",
  ai: "ai",
  leadership: "coaching",
};

export function conversionIntentForHub(slug: string): ConversionIntent | null {
  return HUB_INTENTS[slug] ?? null;
}

export function conversionIntentForPost(post: Post) {
  return conversionIntentFor({
    slug: post.slug,
    title: post.title,
    categories: post.categories,
    bookTitle: post.book?.bookTitle || null,
  });
}

function bookPhrase(bookTitle?: string | null) {
  return bookTitle ? bookTitle : "this book";
}

export function conversionOfferFor(
  intent: ConversionIntent,
  bookTitle?: string | null,
): ConversionOffer {
  const book = bookPhrase(bookTitle);

  if (intent === "conversation") {
    return {
      intent,
      eyebrow: "Practice, not theory",
      title: `You've just read how to have the conversation. Reading isn't practising.`,
      body: `${book} is a playbook. Real Talk Studio is the driving test — try the same conversation against an AI counterpart before it happens for real.`,
      cta: "Try a free scenario →",
      href: site.realTalkPractise,
    };
  }

  if (intent === "sales") {
    return {
      intent,
      eyebrow: "Sales practice",
      title: "You've just read how to negotiate. Reading isn't practising.",
      body: `${book} is useful until your heart rate goes up. Rehearse a cold call, a negotiation, or a close against an AI counterpart — then use it when the deal is live.`,
      cta: "Try a sales scenario →",
      href: site.realTalkPractise,
    };
  }

  if (intent === "ai") {
    return {
      intent,
      eyebrow: "Work with me",
      title: "The books explain the technology. The work is the conversations AI forces.",
      body: "I help enterprises with the human side of AI — training teams who need to use it, and coaching the leaders who have to lead the change. A 30-minute discovery call. No pitch.",
      cta: "Book a discovery call →",
      href: site.calendly,
      secondaryCta: "See how I work",
      secondaryHref: "/work-with-me",
    };
  }

  if (intent === "workshop") {
    return {
      intent,
      eyebrow: "For L&D and facilitators",
      title: "A template plans the room. The work is what happens inside it.",
      body: "If you run workshops, training, or leadership programmes and want practice built in — not another slide deck — that's the work I do with enterprises.",
      cta: "Book a discovery call →",
      href: site.calendly,
      secondaryCta: "Work with me",
      secondaryHref: "/work-with-me",
    };
  }

  return {
    intent: "coaching",
    eyebrow: "Work with me",
    title: "If you're building this into 1:1s or a leadership programme, that's the work I do.",
    body: "Coaching through AI change, manager-as-coach programmes, and the conversations leaders postpone until they become expensive. A 30-minute discovery call. No pitch.",
    cta: "Book a discovery call →",
    href: site.calendly,
    secondaryCta: "See how I work",
    secondaryHref: "/work-with-me",
  };
}

export const CHEAT_SHEET_PATH = "/never-split-the-difference-cheat-sheet";

export function cheatSheetOffer(): ConversionOffer {
  return {
    intent: "sales",
    eyebrow: "Free download",
    title: "Never Split the Difference cheat sheet (PDF)",
    body: "Labels, mirrors, calibrated questions, and the accusation audit — one page you can take into the next negotiation. Enter your email and I'll send the printable sheet.",
    cta: "Get the cheat sheet →",
    href: CHEAT_SHEET_PATH,
  };
}
