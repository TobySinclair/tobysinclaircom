export type CheatSheetTechnique = {
  name: string
  move: string
  use: string
  say: string
};

export type CheatSheet = {
  slug: string
  title: string
  pageTitle: string
  description: string
  path: string
  summaryHref: string
  summarySlug: string
  bookTitle: string
  author: string
  intro: string
  gateTitle: string
  gateBody: string
  faq: { question: string; answer: string }[]
  techniques: CheatSheetTechnique[]
  rules: string[]
  draft: boolean
  intent: "sales" | "conversation"
};

const neverSplit: CheatSheet = {
  slug: "never-split-the-difference-cheat-sheet",
  title: "Never Split the Difference cheat sheet",
  pageTitle: "Never Split the Difference Cheat Sheet (Free PDF)",
  description:
    "A free Never Split the Difference cheat sheet PDF — Chris Voss's labels, mirrors, calibrated questions, and accusation audit on one printable page. Notes from a practising organisational leader.",
  path: "/never-split-the-difference-cheat-sheet",
  summaryHref: "/post/never-split-the-difference-summary",
  summarySlug: "never-split-the-difference-summary",
  bookTitle: "Never Split the Difference",
  author: "Chris Voss",
  intro:
    "People search for a Never Split the Difference cheat sheet PDF because the book is a field manual — and field manuals need a one-pager. This is mine. I use these moves in high-stakes workplace conversations, not hostage rooms. Print it. Take it into the next negotiation.",
  gateTitle: "Unlock the printable Never Split the Difference cheat sheet",
  gateBody:
    "Enter your email and I'll unlock the one-page sheet — labels, mirrors, calibrated questions, and the accusation audit. Print it or save it as a PDF.",
  faq: [
    {
      question: "Is there a Never Split the Difference cheat sheet PDF?",
      answer:
        "Yes. This page is a free Never Split the Difference cheat sheet you can print or save as a PDF. It covers mirrors, labels, calibrated questions, tactical empathy, and the accusation audit.",
    },
    {
      question: "What techniques are on the Chris Voss cheat sheet?",
      answer:
        "Mirrors, labels, tactical empathy, getting to “that’s right”, calibrated how/what questions, the accusation audit, no-oriented questions, and the rule against compromise.",
    },
  ],
  techniques: [
    {
      name: "Mirrors",
      move: "Repeat the last one to three words they said.",
      use: "When you need more information and don't want to interrogate. It sounds simple. It works because people expand what they just said.",
      say: '"Deadline." / "Not enough cover."',
    },
    {
      name: "Labels",
      move: "Name the emotion or dynamic you think you are seeing.",
      use: "To defuse heat without agreeing. You are showing you heard them, not that they are right.",
      say: '"It seems like you don\'t feel heard." / "It sounds like the risk sits with your team."',
    },
    {
      name: "Tactical empathy",
      move: 'Describe their world accurately enough that they say "that\'s right."',
      use: "Before you ask for anything. Understanding is the cheapest concession you can make.",
      say: '"You\'ve been asked to cut cost and protect delivery. Those two things are fighting."',
    },
    {
      name: "That's right — not you're right",
      move: "Summarise their position until they confirm it as their own.",
      use: '"You\'re right" means they want the conversation over. "That\'s right" means they feel understood.',
      say: "Keep labelling and summarising until you hear those two words.",
    },
    {
      name: "Calibrated questions",
      move: "Ask how / what questions that make them solve your problem.",
      use: "When a no would stall you, or when you need them to own the next step.",
      say: '"How am I supposed to do that?" / "What does a good outcome look like for you?"',
    },
    {
      name: "Accusation audit",
      move: "Say the worst things they could think about you first.",
      use: "Before a hard ask, a missed deadline, or a price. It takes the sting out of their attack.",
      say: '"You\'re going to think I\'m wasting your time and that I don\'t understand the pressure you\'re under."',
    },
    {
      name: "No-oriented questions",
      move: "Ask a question they can safely say no to.",
      use: "People relax when they can protect themselves. A no is often the start of a real conversation.",
      say: '"Is now a bad time?" / "Would it be ridiculous to look at this again on Friday?"',
    },
    {
      name: "Don't compromise",
      move: "Refuse the one-black-shoe, one-brown-shoe deal.",
      use: "When meeting in the middle leaves both sides with a worse outcome than either option.",
      say: "Name the two real options. Ask which problem you are actually trying to solve.",
    },
  ],
  rules: [
    "Listening is the most active thing you can do. Talk less than you think you should.",
    "People want to be understood before they will move. Empathy is not agreement.",
    "Deadlines are often arbitrary. Ask what happens if the date slips.",
    "A loss stings twice as much as an equivalent gain. Frame the cost of no deal, not just the upside.",
    "Look past the stated position. Ask what is making them want what they want.",
  ],
  draft: false,
  intent: "sales",
};

export const cheatSheets: CheatSheet[] = [
  neverSplit,
  {
    slug: "supercommunicators-cheat-sheet",
    title: "Supercommunicators cheat sheet",
    pageTitle: "Supercommunicators Cheat Sheet (Free PDF)",
    description:
      "A free Supercommunicators cheat sheet PDF — Charles Duhigg's three conversation types, matching the room, and questions that actually connect. Notes from a practising organisational leader.",
    path: "/supercommunicators-cheat-sheet",
    summaryHref: "/post/summary-supercommunicators-by-charles-duhigg",
    summarySlug: "summary-supercommunicators-by-charles-duhigg",
    bookTitle: "Supercommunicators",
    author: "Charles Duhigg",
    intro:
      "Duhigg's book is strongest on why conversations go wrong. This one-pager is the bit I take into the room: which conversation is this, and am I in the same one as everyone else?",
    gateTitle: "Unlock the printable Supercommunicators cheat sheet",
    gateBody:
      "Enter your email and I'll unlock the one-page sheet — the three conversation types, matching the room, and the questions that connect. Print it or save it as a PDF.",
    faq: [
      {
        question: "Is there a Supercommunicators cheat sheet PDF?",
        answer:
          "Yes. This page is a free Supercommunicators cheat sheet you can print or save as a PDF. It covers the three conversation types, matching the room, and questions that draw out how people feel.",
      },
      {
        question: "What techniques are on the Supercommunicators cheat sheet?",
        answer:
          "Spot whether the conversation is practical, emotional, or social; ask if they want to be helped, hugged, or heard; prepare a 30-second topic list; ask how they feel, not just the facts.",
      },
    ],
    techniques: [
      {
        name: "Name the conversation type",
        move: "Ask which layer is live: practical (what's this about?), emotional (how do we feel?), or social (who are we?).",
        use: "When the room feels stuck. You are often answering a different question from the one they are asking.",
        say: '"Are we deciding, or do we need to hear how this landed first?"',
      },
      {
        name: "Helped, hugged, or heard",
        move: "Match the want before you offer a plan.",
        use: "Before you jump to actions. A team that wants to be heard will bounce a to-do list.",
        say: '"Do you want help, a hug, or to be heard?"',
      },
      {
        name: "Match before you move",
        move: "Synchronise: same pace, same layer, then the next step.",
        use: "When you want to get to the decision and they are still in the feeling.",
        say: '"I can hear this is still about how it felt. Let me stay there before we plan."',
      },
      {
        name: "Ask for feelings, not facts",
        move: "Questions about how they feel about their work beat questions about the CV.",
        use: "When the conversation is polite and going nowhere.",
        say: '"How do you feel when you\'re fully engaged in this work?" / "Do you love that job?"',
      },
      {
        name: "Thirty-second prep",
        move: "Jot down a few topics you would like to discuss before you start. The list often never comes up. The conversation still goes better.",
        use: "Before a 1:1, a review, or any meeting you usually walk into cold.",
        say: "Write three lines. Ask them to do the same.",
      },
      {
        name: "Prove you are listening",
        move: "Show you heard their needs, goals, beliefs, and emotions — then share yours.",
        use: "After they have talked. Superficial questions are a dead end.",
        say: '"What I\'m taking from that is… Did I get it?"',
      },
    ],
    rules: [
      "Misaligned layers feel like conversational confusion. Name the layer.",
      "Connecting is the goal. Facts without feeling rarely get you there.",
      "A 30-second list reduces awkward pauses even if you never use it.",
      "If they want to be heard, a plan is an interruption.",
    ],
    draft: true,
    intent: "conversation",
  },
  {
    slug: "fierce-conversations-cheat-sheet",
    title: "Fierce Conversations cheat sheet",
    pageTitle: "Fierce Conversations Cheat Sheet (Free PDF)",
    description:
      "A free Fierce Conversations cheat sheet PDF — Susan Scott's seven-step opening, interrogating reality, and letting silence do the work. Notes from a practising organisational leader.",
    path: "/fierce-conversations-cheat-sheet",
    summaryHref: "/post/summary-fierce-conversations-by-susan-scott",
    summarySlug: "summary-fierce-conversations-by-susan-scott",
    bookTitle: "Fierce Conversations",
    author: "Susan Scott",
    intro:
      "Scott's point is simple: your company grows or stagnates one conversation at a time. This sheet is the opening I use when the fake conversation has gone on long enough.",
    gateTitle: "Unlock the printable Fierce Conversations cheat sheet",
    gateBody:
      "Enter your email and I'll unlock the one-page sheet — the seven-step opening, naming the issue, and letting silence work. Print it or save it as a PDF.",
    faq: [
      {
        question: "Is there a Fierce Conversations cheat sheet PDF?",
        answer:
          "Yes. This page is a free Fierce Conversations cheat sheet you can print or save as a PDF. It covers the seven-step opening and the principles I actually use in the room.",
      },
      {
        question: "How do you start a fierce conversation?",
        answer:
          "Name the issue, give a specific example, describe your emotions, say what is at stake, own your contribution, say you want to resolve it, and invite them to respond.",
      },
    ],
    techniques: [
      {
        name: "Name the issue",
        move: "Say the actual topic in the first minute. No warm-up tour of last quarter.",
        use: "When you have been circling the same problem for weeks.",
        say: '"I want to talk about the missed handover on Thursday, not the project in general."',
      },
      {
        name: "A specific example",
        move: "Pick one moment that shows the pattern. Abstract complaints invite abstract defence.",
        use: "When they could reasonably say they don't know what you mean.",
        say: '"On Thursday in the stand-up you said the risk was covered. The client email an hour later said it wasn\'t."',
      },
      {
        name: "Your emotion, then the stake",
        move: "Name how it lands on you, then what it costs the work if this continues.",
        use: "After the example. Emotion without a stake is venting. Stake without emotion is a memo.",
        say: '"I\'m frustrated, and the stake is the client relationship, not my preference."',
      },
      {
        name: "Own your contribution",
        move: "Say the part you played before you ask them to change.",
        use: "When you have been quiet, late, or unclear. It makes the conversation real.",
        say: '"I let this run for three weeks because I didn\'t want the meeting."',
      },
      {
        name: "Invite a response, then wait",
        move: "Ask them in. Let silence do the heavy lifting.",
        use: "After you have said the thing. Filling the gap is how fierce conversations become fake again.",
        say: '"That\'s what I wanted to put on the table. What\'s your view?"',
      },
      {
        name: "Interrogate reality",
        move: "No plan survives contact with what is actually happening. Ask who has the best vantage point, not the most seniority.",
        use: "When the official story and the floor story have drifted apart.",
        say: '"Who is standing where this is actually happening?"',
      },
    ],
    rules: [
      "Fierce means real, not cruel.",
      "The conversation is the relationship.",
      "Unreal conversations are expensive.",
      "Tackle the toughest challenge today. Burnout is solving the same problem on a loop.",
      "There is no trivial comment from a leader. Watch the emotional wake.",
    ],
    draft: true,
    intent: "conversation",
  },
  {
    slug: "crucial-conversations-cheat-sheet",
    title: "Crucial Conversations cheat sheet",
    pageTitle: "Crucial Conversations Cheat Sheet (Free PDF)",
    description:
      "A free Crucial Conversations cheat sheet PDF — Start with Heart, STATE your path, make it safe, and close with who does what by when. Notes from a practising organisational leader.",
    path: "/crucial-conversations-cheat-sheet",
    summaryHref: "/post/summary-crucial-conversations-by-kerry-patterson",
    summarySlug: "summary-crucial-conversations-by-kerry-patterson",
    bookTitle: "Crucial Conversations",
    author: "Kerry Patterson et al.",
    intro:
      "Patterson and co-authors wrote the playbook I still use when the conversation has high stakes, opposing views, and strong emotion. This is the one-pager from that playbook, for work, not a classroom.",
    gateTitle: "Unlock the printable Crucial Conversations cheat sheet",
    gateBody:
      "Enter your email and I'll unlock the one-page sheet — Start with Heart, STATE, safety, and the close. Print it or save it as a PDF.",
    faq: [
      {
        question: "Is there a Crucial Conversations cheat sheet PDF?",
        answer:
          "Yes. This page is a free Crucial Conversations cheat sheet you can print or save as a PDF. It covers Start with Heart, STATE, making it safe, and moving to action.",
      },
      {
        question: "What does STATE stand for?",
        answer:
          "Share your facts, Tell your story, Ask for others' paths, Talk tentatively, and Encourage testing.",
      },
    ],
    techniques: [
      {
        name: "Start with Heart",
        move: "Before you speak, ask what you really want for you, for them, and for the relationship.",
        use: "When your motive has quietly become 'win' or 'punish'. That question lowers the temperature in your own head.",
        say: '"What do I actually want from this, for both of us?"',
      },
      {
        name: "STATE your path",
        move: "Share facts, tell your story, ask for their path, talk tentatively, encourage testing.",
        use: "When you have a story about their intent and have not checked it.",
        say: '"The fact is the report was two days late. The story I\'m telling myself is that this isn\'t a priority. Is that fair?"',
      },
      {
        name: "Mutual purpose",
        move: "Name a goal you both care about before you argue the method.",
        use: "When they think you don't care about their interests.",
        say: '"We both want this launch to land. Can we start from that?"',
      },
      {
        name: "Make it safe",
        move: "If they go silent or violent, restore respect and purpose before you add content.",
        use: "The moment you see defensiveness. More facts on top of fear make it worse.",
        say: '"I respect the work you\'ve put in. I\'m not here to catch you out. I want us to solve this."',
      },
      {
        name: "Invite dialogue",
        move: "State your path, then genuinely want theirs. People who only dump get resistance.",
        use: "After you have spoken. If you are not willing to be wrong, they will not open.",
        say: '"I could be missing something. What am I not seeing?"',
      },
      {
        name: "Who does what by when",
        move: "Document who does what by when, and how you will follow up.",
        use: "At the end, before the relief of leaving the room lets the assignment disappear.",
        say: '"So: you send the rewritten plan by Thursday noon, I review Friday, we check in Monday."',
      },
    ],
    rules: [
      "Get buy-in to have the conversation. If they are not ready, schedule it.",
      "Facts first, story second. Don't present your story as a fact.",
      "Respect is like air. When it is gone, it is all anyone can think about.",
      "You do not have to choose between telling the truth and keeping the relationship.",
      "The only person you can reliably change is you. Start there.",
    ],
    draft: true,
    intent: "conversation",
  },
  {
    slug: "how-to-know-a-person-cheat-sheet",
    title: "How to Know a Person cheat sheet",
    pageTitle: "How to Know a Person Cheat Sheet (Free PDF)",
    description:
      "A free How to Know a Person cheat sheet PDF — David Brooks's illuminator questions, loud listening, and getting out of lecture mode. Notes from a practising organisational leader.",
    path: "/how-to-know-a-person-cheat-sheet",
    summaryHref: "/post/summary-how-to-know-a-person-by-david-brooks",
    summarySlug: "summary-how-to-know-a-person-by-david-brooks",
    bookTitle: "How to Know a Person",
    author: "David Brooks",
    intro:
      "Brooks's useful distinction is illuminators versus diminishers. This sheet is the questions and listening moves that stop a 1:1 becoming a bore bomb.",
    gateTitle: "Unlock the printable How to Know a Person cheat sheet",
    gateBody:
      "Enter your email and I'll unlock the one-page sheet — illuminator questions, loud listening, and conditions before content. Print it or save it as a PDF.",
    faq: [
      {
        question: "Is there a How to Know a Person cheat sheet PDF?",
        answer:
          "Yes. This page is a free How to Know a Person cheat sheet you can print or save as a PDF. It covers illuminator questions, loud listening, and setting conditions before content.",
      },
      {
        question: "What questions does David Brooks recommend?",
        answer:
          "Ask how they came to believe something, not just what they think. Ask who shaped their values, not for a list of values. Questions that invite a story beat questions that invite a lecture.",
      },
    ],
    techniques: [
      {
        name: "Illuminator, not diminisher",
        move: "See the person in their fullness. Presence, context, and unique strengths — not a glance and a label.",
        use: "In 1:1s, hiring, and any conversation where you are tempted to file them under a type.",
        say: "Slow down. Name something specific you notice about how they work, not a generic compliment.",
      },
      {
        name: "Ask how they came to believe it",
        move: "Don't ask what they think about X. Ask how they came to believe X.",
        use: "When you would otherwise get an opinion and a shrug.",
        say: '"How did you come to believe that?"',
      },
      {
        name: "Ask for the person, not the value",
        move: "Don't ask what their values are. Ask who shaped their values the most.",
        use: "When you want a story instead of a slide.",
        say: '"Who shaped the way you work more than anyone else?"',
      },
      {
        name: "Be a loud listener",
        move: "Listen so actively you are practically burning calories. The conversation is a two-way expedition, not a lecture.",
        use: "When you notice you are waiting to speak, or they are dropping a bore bomb.",
        say: "Short responses that show you followed: a name, a date, a feeling they just used.",
      },
      {
        name: "Conditions before content",
        move: "Before a hard conversation, think about the setting: time, privacy, energy, whether they can actually hear this now.",
        use: "Prior to feedback, bad news, or a disagreement you have been carrying.",
        say: '"Is this a decent moment, or do we need twenty minutes later today?"',
      },
      {
        name: "Get into narrative mode",
        move: "Stories show how someone changes over time. Data and arguments show a case. You need the story to see the person.",
        use: "When the talk has become comment-making rather than storytelling.",
        say: '"What happened just before that?" / "What did that change for you?"',
      },
    ],
    rules: [
      "A good conversationalist is not a raconteur or a lecturer.",
      "Every comment makes the other person a little more safe or a little more threatened.",
      "Curiosity is exploring even when it is stressful.",
      "Find the disagreement under the disagreement — the value clash under the practical one.",
      "How you see a situation depends on what you can do in it. Ask what the hill looks like from their legs, not yours.",
    ],
    draft: true,
    intent: "conversation",
  },
];

export function getCheatSheet(slug: string) {
  return cheatSheets.find((sheet) => sheet.slug === slug) ?? null;
}

export function cheatSheetForSummary(summarySlug: string) {
  return cheatSheets.find((sheet) => sheet.summarySlug === summarySlug) ?? null;
}

export const cheatSheet = neverSplit;
