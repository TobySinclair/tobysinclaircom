import { hubsForPost, type BookHubCandidate } from "@/lib/book-hubs";

export type BookTheme = {
  slug: string
  title: string
  intro: string
};

export const bookThemes: BookTheme[] = [
  {
    slug: "conversations-influence",
    title: "Conversations & Influence",
    intro:
      "The books on saying the thing, hearing the thing, and staying in the room. Feedback, candour, negotiation, and the talks leaders postpone until they become expensive.",
  },
  {
    slug: "leadership-management",
    title: "Leadership & Management",
    intro:
      "How to lead people rather than process: new-manager craft, coaching, culture, and the Monday-morning work of a team that has to move together.",
  },
  {
    slug: "change-decision-making",
    title: "Change & Decision-Making",
    intro:
      "What happens when the work, the tools, or the organisation shifts. Adoption, resistance, judgement, and the decisions nobody wants to own.",
  },
  {
    slug: "habits-growth",
    title: "Habits & Growth",
    intro:
      "Behaviour that survives Monday morning: attention, practice, and the small changes that compound into how a person actually works.",
  },
];

export function getBookTheme(slug: string) {
  return bookThemes.find((theme) => theme.slug === slug) ?? null;
}

function derivedThemeSlug(post: BookHubCandidate) {
  const hubs = hubsForPost(post).map((hub) => hub.slug);
  if (hubs.includes("hard-conversations")) return "conversations-influence";
  if (hubs.includes("habits")) return "habits-growth";
  if (hubs.includes("ai") || hubs.includes("organisational-design")) return "change-decision-making";
  if (hubs.includes("leadership") || hubs.includes("coaching")) return "leadership-management";
  return "leadership-management";
}

export function themeForPost(post: BookHubCandidate & { theme?: string | null }) {
  const fromFrontmatter = post.theme ? getBookTheme(post.theme) : null;
  return fromFrontmatter ?? getBookTheme(derivedThemeSlug(post)) ?? bookThemes[1];
}

export function summariesForTheme<T extends BookHubCandidate & { theme?: string | null }>(
  posts: T[],
  theme: BookTheme,
) {
  return posts.filter((post) => themeForPost(post).slug === theme.slug);
}
