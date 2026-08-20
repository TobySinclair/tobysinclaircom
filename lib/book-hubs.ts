export type BookHubCandidate = {
  slug: string
  title: string
  description: string
  categories: string[]
  book: { bookTitle: string } | null
};

export type BookHub = {
  slug: string
  title: string
  headline: string
  description: string
  intro: string[]
  collections: { label: string; href: string }[]
  match: (post: BookHubCandidate) => boolean
};

function haystack(post: BookHubCandidate) {
  return [
    post.slug,
    post.title,
    post.description,
    post.book?.bookTitle,
    post.categories.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasCategory(post: BookHubCandidate, slugs: string[]) {
  return slugs.some((slug) => post.categories.includes(slug));
}

function matchesAny(text: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(text));
}

export const bookHubs: BookHub[] = [
  {
    slug: "leadership",
    title: "Leadership book summaries",
    headline: "Leadership book summaries",
    description:
      "Book summaries on leading people, not managing process. Notes from a practising organisational leader.",
    intro: [
      "Most leadership books describe a version of work I have never seen. These are the ones that survived contact with a real organisation — the Monday morning, the awkward one-to-one, the team that would not move.",
      "Read them if you lead people and want fewer theories, more usable moves. Ratings are mine. I skip the ones that only sound good in a classroom.",
    ],
    collections: [
      { label: "Best unconventional leadership books", href: "/post/best-unconventional-leadership-books" },
      { label: "Leadership books I recommended in 2021", href: "/post/best-leadership-books-2021" },
    ],
    match: (post) =>
      hasCategory(post, ["leadership"]) ||
      matchesAny(haystack(post), [
        /\bleadership\b/,
        /\bmultipliers\b/,
        /making of a manager/,
        /start with why/,
        /how to lead/,
        /lead at speed/,
        /unlocking leadership/,
        /eddie jones/,
        /high performance/,
        /masters of scale/,
        /creating magic/,
        /forever employable/,
        /stand out/,
        /trillion-dollar coach/,
        /trillion dollar coach/,
      ]),
  },
  {
    slug: "coaching",
    title: "Coaching book summaries",
    headline: "Coaching book summaries",
    description:
      "Book summaries on coaching conversations, team coaching, and becoming more coach-like as a leader.",
    intro: [
      "These are the books that changed how I sit with someone else's problem. Less advice. More questions. Better silence.",
      "For managers learning to coach, and for coaches tightening their craft. If you only read one, start with The Coaching Habit, then Time to Think.",
    ],
    collections: [
      { label: "Best coaching books", href: "/post/best-coaching-books" },
      { label: "100 coaching books from beginner to expert", href: "/coaching-books" },
    ],
    match: (post) =>
      hasCategory(post, ["coaching", "team-coaching"]) ||
      matchesAny(haystack(post), [
        /\bcoach(?:ing|es)?\b/,
        /advice trap/,
        /time to think/,
        /inner game/,
        /you coach you/,
        /20 magic words/,
      ]),
  },
  {
    slug: "ai",
    title: "AI book summaries",
    headline: "AI book summaries for leaders",
    description:
      "Book summaries on artificial intelligence, the coming wave of technology, and what it does to people at work.",
    intro: [
      "I read these to understand what AI is doing to organisations — and what it is not doing for the people inside them.",
      "If you are being asked to 'adopt AI' and nobody has said what that means for managers, start here, then go to the hard-conversation books. The technology is the easy part.",
    ],
    collections: [
      {
        label: "Best AI books for leadership development",
        href: "/post/best-artificial-intelligence-books-for-leadership-development",
      },
    ],
    match: (post) =>
      matchesAny(haystack(post), [
        /\bartificial intelligence\b/,
        /\bthe coming wave\b/,
        /\bmetaverse\b/,
        /\bmachine learning\b/,
        /\bchatgpt\b/,
        /\bllms?\b/,
        /future presence/,
        /virtual reality/,
      ]),
  },
  {
    slug: "hard-conversations",
    title: "Hard conversation book summaries",
    headline: "Hard conversation book summaries",
    description:
      "Book summaries on difficult conversations, listening, candour, and the talks leaders avoid.",
    intro: [
      "These are the books behind Real Talk Studio. How to say the thing, hear the thing, and stay in the room.",
      "If your organisation is installing AI, new ways of working, or a culture programme, the work still happens in conversations nobody scheduled. Start with Radical Candor or Crucial Conversations, then the listening books.",
    ],
    collections: [],
    match: (post) =>
      hasCategory(post, ["real-talk-studio"]) ||
      matchesAny(haystack(post), [
        /radical candor/,
        /crucial conversations/,
        /fierce conversations/,
        /difficult conversations/,
        /never split the difference/,
        /you.?re not listening/,
        /how to listen/,
        /listen by kathryn/,
        /summary: listen/,
        /how to know a person/,
        /\brapport\b/,
        /high conflict/,
        /supercommunicators/,
        /disciplined listening/,
        /more beautiful question/,
        /pitch anything/,
        /the first minute/,
        /speak so your audience/,
        /how to win friends/,
        /\bcatalyst\b/,
        /\bask\b by jeff/,
        /summary: ask/,
        /laws of connection/,
        /\bconnect book\b/,
        /building exceptional relationships/,
      ]),
  },
  {
    slug: "habits",
    title: "Habit book summaries",
    headline: "Habit and behaviour-change book summaries",
    description:
      "Book summaries on habits, focus, and behaviour change that survives Monday morning.",
    intro: [
      "Individual habits are easy to admire and hard to install. Organisational habits are worse: a poster, a kick-off, then the old system wins.",
      "These notes are about behaviour that lasts — Atomic Habits, Tiny Habits, Essentialism, and the books on attention and time. Use them if you are trying to change how people actually work, not what they say they value.",
    ],
    collections: [{ label: "Best habit books", href: "/post/best-habit-books" }],
    match: (post) =>
      hasCategory(post, ["habits", "habits-program", "personal-productivity"]) ||
      matchesAny(haystack(post), [
        /\bhabits?\b/,
        /atomic habits/,
        /tiny habits/,
        /the one thing/,
        /essentialism/,
        /how to change/,
        /four thousand weeks/,
        /stolen focus/,
        /who moved my cheese/,
        /building a second brain/,
      ]),
  },
  {
    slug: "organisational-design",
    title: "Organisational design book summaries",
    headline: "Organisational design book summaries",
    description:
      "Book summaries on team design, culture, flow, and the systems that make good people look bad.",
    intro: [
      "How work is structured decides more than how people are motivated. These books are about teams, flow, culture, and the operating system around them.",
      "If your transformation is stuck, read Team Topologies or Sooner Safer Happier before you buy another engagement survey. Culture is often a design problem wearing a people-problem costume.",
    ],
    collections: [{ label: "Culture books for leaders", href: "/culture-books" }],
    match: (post) =>
      hasCategory(post, ["organisational-design", "systems-thinking-complexity"]) ||
      matchesAny(haystack(post), [
        /team topologies/,
        /humanocracy/,
        /culture code/,
        /unicorn project/,
        /project to product/,
        /sooner safer happier/,
        /\bcynefin\b/,
        /friction project/,
        /command and control/,
        /culture change/,
        /barcelona way/,
        /\bbelonging\b/,
        /social brain/,
        /art of community/,
        /knowing doing gap/,
        /\bupstream\b/,
        /when mckinsey/,
        /a scrum book/,
      ]),
  },
];

export function getBookHub(slug: string) {
  return bookHubs.find((hub) => hub.slug === slug) ?? null;
}

export function hubsForPost(post: BookHubCandidate) {
  return bookHubs.filter((hub) => hub.match(post));
}

export function summariesForHub<T extends BookHubCandidate>(posts: T[], hub: BookHub) {
  return posts.filter((post) => hub.match(post));
}
