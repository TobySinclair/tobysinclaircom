import type { ContextCtaVariant } from "@/components/context-cta";
import { site } from "@/lib/site";
import { withReferralUtm } from "@/lib/utm";

export type ContextCtaConfig = {
  variant: ContextCtaVariant
  heading: string
  body: string
  href: string
  buttonLabel: string
};

const PRACTICE_BODY =
  "Reading the technique is not the same as using it when the other person pushes back. Rehearse it against an AI counterpart before the real conversation.";
const SERVICES_BODY =
  "If you want this to become how your managers actually talk — not a book they once highlighted — that is the work I do with HR, L&D and leadership teams.";

const CONTEXT_CTAS: Record<string, ContextCtaConfig> = {
  "summary-how-to-know-a-person-by-david-brooks": {
    variant: "services",
    heading: "Building a culture of better conversations?",
    body: SERVICES_BODY,
    href: "/work-with-me",
    buttonLabel: "See how I work",
  },
  "summary-supercommunicators-by-charles-duhigg": {
    variant: "practice",
    heading: "Practise the conversations this book describes",
    body: PRACTICE_BODY,
    href: site.placeholders.rtsScenarioUrl,
    buttonLabel: "Try a scenario",
  },
  "never-split-the-difference-cheat-sheet": {
    variant: "practice",
    heading: "Try these negotiation techniques in a realistic simulation",
    body: PRACTICE_BODY,
    href: site.placeholders.rtsScenarioUrl,
    buttonLabel: "Try a scenario",
  },
  "never-split-the-difference-summary": {
    variant: "practice",
    heading: "Try these negotiation techniques in a realistic simulation",
    body: PRACTICE_BODY,
    href: site.placeholders.rtsScenarioUrl,
    buttonLabel: "Try a scenario",
  },
  "summary-fierce-conversations-by-susan-scott": {
    variant: "practice",
    heading: "Rehearse your fierce conversation before it happens",
    body: PRACTICE_BODY,
    href: site.placeholders.rtsScenarioUrl,
    buttonLabel: "Try a scenario",
  },
  "summary-the-laws-of-connection-by-david-robson": {
    variant: "services",
    heading: "Training your managers on this?",
    body: SERVICES_BODY,
    href: "/work-with-me",
    buttonLabel: "See how I work",
  },
  "book-summary-rapport-by-emily-alison-and-laurence-alison": {
    variant: "practice",
    heading: "Practise building rapport under pressure",
    body: PRACTICE_BODY,
    href: site.placeholders.rtsScenarioUrl,
    buttonLabel: "Try a scenario",
  },
  "catalyst-by-jonah-berger-summary-how-to-change-anyone-s-mind": {
    variant: "services",
    heading: "Leading your team through AI change?",
    body: "AI adoption is a change problem wearing a technology costume. I train and coach the people who have to lead it.",
    href: "/work-with-me",
    buttonLabel: "See how I work",
  },
  "the-first-minute-by-chris-fenning": {
    variant: "practice",
    heading: "Practise your first minute",
    body: PRACTICE_BODY,
    href: site.placeholders.rtsScenarioUrl,
    buttonLabel: "Try a scenario",
  },
  "summary-pitch-anything-by-oren-klaff": {
    variant: "practice",
    heading: "Practise your pitch against a sceptical buyer",
    body: PRACTICE_BODY,
    href: site.placeholders.rtsScenarioUrl,
    buttonLabel: "Try a scenario",
  },
  "summary-crucial-conversations-by-kerry-patterson": {
    variant: "practice",
    heading: "Rehearse the crucial conversation you're avoiding",
    body: PRACTICE_BODY,
    href: site.placeholders.rtsScenarioUrl,
    buttonLabel: "Try a scenario",
  },
  "redundancy-conversation-guide": {
    variant: "practice",
    heading: "Practise leading the team meeting after a redundancy announcement",
    body: "The meeting with the person is one conversation. The meeting with everyone else is another. Rehearse the team announcement before you walk into the room.",
    href: site.placeholders.rtsRedundancyScenarioUrl,
    buttonLabel: "Try the scenario",
  },
};

export function contextCtaFor(slug: string): ContextCtaConfig | null {
  const config = CONTEXT_CTAS[slug];
  if (!config) return null;
  const href =
    config.variant === "practice"
      ? withReferralUtm(config.href, slug)
      : config.href;
  return { ...config, href };
}
