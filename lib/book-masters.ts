export type BookMasterSection = {
  title: string
  body: string
  slugs: string[]
};

export type BookMaster = {
  slug: string
  title: string
  headline: string
  description: string
  image: string
  intro: string[]
  startHere: string[]
  hub: { label: string; href: string }
  sections: BookMasterSection[]
  also: { title: string; author: string }[]
};

export const bookMasters: BookMaster[] = [
  {
    slug: "coaching-books",
    title: "Coaching books from beginner to expert",
    headline: "Coaching books from beginner to expert",
    description:
      "A master list of coaching books for managers and professional coaches, grouped from foundations to specialised work. Each entry links to Toby Sinclair's notes.",
    image: "https://static.wixstatic.com/media/67d4e8_a3f1f84b4f924995975a4b67f56fee30~mv2.png",
    intro: [
      "Coaching is not about fixing people. I spent the first half of my career amassing technical knowledge and being valued for it. Then the work changed: it became more important to develop other people than to be the person with the answer.",
      "In practice that means telling less and asking more. The three skills are listening, asking, and sensing — knowing what is going on for you, the other person, and the system. These books will not turn you into a coach overnight. They will make you more coach-like as a leader.",
      "Read them in levels. Start with foundations if you manage people. Skip ahead if you already have the questions and need the context.",
    ],
    startHere: [
      "book-summary-coaching-habit-by-michael-bungay-stanier",
      "book-summary-time-to-think-by-nancy-kline",
      "the-advice-trap-summary-by-michael-bungay-stanier",
    ],
    hub: { label: "All coaching book summaries", href: "/book-summaries/coaching" },
    sections: [
      {
        title: "Foundations",
        body: "Accessible starting points. Practical enough for a busy manager, deep enough that coaches still reread them.",
        slugs: [
          "book-summary-coaching-habit-by-michael-bungay-stanier",
          "book-summary-time-to-think-by-nancy-kline",
          "book-summary-trillion-dollar-coach-by-eric-schmidt-silicon-valley-coaching",
          "book-summary-you-coach-you-by-helen-tupper-sarah-ellis",
          "the-inner-game-of-tennis-summary-by-timothy-gallwey",
        ],
      },
      {
        title: "Skills",
        body: "Listening, asking, and the habit of not jumping in with advice. This is the craft.",
        slugs: [
          "the-advice-trap-summary-by-michael-bungay-stanier",
          "book-summary-you-re-not-listening-by-kate-murphy-big-ideas-and-best-quotes",
          "summary-how-to-listen-by-oscar-trimboli",
          "summary-listen-by-kathryn-mannix",
          "a-more-beautiful-question-summary",
          "book-summary-rapport-by-emily-alison-and-laurence-alison",
          "20-magic-words-for-coaching-conversations",
          "summary-humble-inquiry-by-edgar-schein",
          "summary-ask-by-jeff-wetzler",
        ],
      },
      {
        title: "Context",
        body: "Coaching inside teams, conflict, and senior rooms — where the model meets Monday morning.",
        slugs: [
          "team-coaching-at-work-summary-by-david-clutterbuck",
          "book-summary-challenging-coaching-by-ian-day-john-blakey",
          "coaching-senior-leadership-teams",
          "high-conflict-summary-by-amanda-ripley",
          "summary-radical-candor-by-kim-scott",
        ],
      },
      {
        title: "Expand",
        body: "Specialised and adjacent books: teaching, mentoring, and the business of coaching.",
        slugs: [
          "the-prosperous-coach-summary",
          "the-coach-s-guide-to-teaching-summary-by-doug-lemov",
          "summary-super-mentors-by-eric-koester-adam-saven",
        ],
      },
    ],
    also: [
      { title: "Coaching for Performance", author: "John Whitmore" },
      { title: "The Coaches Casebook", author: "Kim Morgan and Geoff Watts" },
      { title: "Nonviolent Communication", author: "Marshall Rosenberg" },
    ],
  },
  {
    slug: "culture-books",
    title: "Culture books for leaders",
    headline: "Culture books for leaders",
    description:
      "A master list of culture books for leaders who want more than a values poster. How work actually changes, with notes from a practising organisational leader.",
    image: "https://static.wixstatic.com/media/67d4e8_dc77dff793a94b0f807d785b3f58f587~mv2.png",
    intro: [
      "It is scary how much time organisations waste on culture change. The annual offsite. Trust falls. Then a brainstorm: Trust, Honesty, Collaboration, Fun, Respect. Print it on the stationery. Present it at the all-hands. Nothing moves.",
      "Values matter. You do not start there. Culture is what people do when nobody is writing a slogan — the conversations they avoid, the system they work around, the habits that survive Monday morning.",
      "These are the culture books I still use. Start with how people feel safe and belong, then read the design books. Culture is often a design problem wearing a people-problem costume.",
    ],
    startHere: [
      "the-culture-code-summary-daniel-coyle",
      "belonging-by-owen-eastwood",
      "book-summary-time-to-think-by-nancy-kline",
    ],
    hub: { label: "Organisational design summaries", href: "/book-summaries/organisational-design" },
    sections: [
      {
        title: "How culture actually forms",
        body: "Safety, belonging, and the operating system people can feel. Read these before you rewrite the values.",
        slugs: [
          "the-culture-code-summary-daniel-coyle",
          "belonging-by-owen-eastwood",
          "the-insiders-guide-to-culture-change",
          "book-summary-time-to-think-by-nancy-kline",
          "book-summary-barcelona-way-by-damian-hughes",
        ],
      },
      {
        title: "Design the system",
        body: "Team structure, flow, and the friction that makes good people look bad.",
        slugs: [
          "book-summary-team-topologies-organizing-business-and-technology-teams-for-fast-flow",
          "humanocracy-summary",
          "summary-the-friction-project-by-robert-sutton-huggy-rao",
          "book-summary-beyond-command-and-control-john-seddon",
          "book-summary-sooner-safer-happier-by-jon-smart-bvssh",
        ],
      },
      {
        title: "How people talk",
        body: "Culture lives in conversations. Candour, listening, and conflict are the daily work.",
        slugs: [
          "summary-radical-candor-by-kim-scott",
          "book-summary-you-re-not-listening-by-kate-murphy-big-ideas-and-best-quotes",
          "high-conflict-summary-by-amanda-ripley",
          "summary-the-next-conversation-by-jefferson-fisher",
          "summary-the-culture-map-by-erin-meyer",
          "summary-dare-to-lead-by-brene-brown",
        ],
      },
      {
        title: "Habits that survive the kick-off",
        body: "A culture programme that ignores behaviour change is a poster.",
        slugs: [
          "how-to-use-atomic-habits-at-work-the-big-ideas-for-organisations",
          "book-summary-tiny-habits-the-small-changes-that-change-everything",
        ],
      },
    ],
    also: [
      { title: "The Fearless Organization", author: "Amy Edmondson" },
      { title: "Thinking in Systems", author: "Donella Meadows" },
      { title: "No Rules Rules", author: "Reed Hastings and Erin Meyer" },
      { title: "Work Rules!", author: "Laszlo Bock" },
    ],
  },
];

export function getBookMaster(slug: string) {
  return bookMasters.find((page) => page.slug === slug) ?? null;
}

export const masterPageSlugs = bookMasters.map((page) => page.slug);
