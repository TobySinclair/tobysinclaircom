export type ArticleFaq = {
  question: string
  answer: string
};

const ARTICLE_FAQS: Record<string, ArticleFaq[]> = {
  "deliberate-practice-for-leaders": [
    {
      question: "What is deliberate practice in leadership?",
      answer:
        "Deliberate practice in leadership means rehearsing a specific leadership skill — usually a conversation — with a clear target, realistic difficulty, and feedback you can act on. It is not the same as doing the job. Most time at work is performance, not practice.",
    },
    {
      question: "Why is deliberate practice important for developing leadership skills?",
      answer:
        "Leadership skills live in conversations under pressure. Reading, courses, and years in the role improve knowledge, not behaviour, once you have reached an acceptable level. Deliberate practice is what breaks the plateau: it isolates the weak skill, stretches it, and gives you feedback before the real conversation.",
    },
    {
      question: "How is deliberate practice different from experience?",
      answer:
        "Experience is repeating what you already know how to do. Deliberate practice is designed to improve a specific component of a skill, at the edge of your ability, with feedback. Ten years of leading without practice is often one year of leading, repeated ten times.",
    },
    {
      question: "How can leaders practise leadership skills?",
      answer:
        "Pick one conversation you keep mishandling. Write the sentence it exists to deliver. Rehearse it out loud, then against resistance — a candid colleague, a coach, or an AI simulation. Get feedback on what you actually said, change one thing, and attempt it again. Frequency beats intensity.",
    },
    {
      question: "Does the 10,000-hour rule apply to leadership?",
      answer:
        "No. The 10,000-hour figure was a popularisation of Anders Ericsson's research, and Ericsson himself disputed it. Hours spent doing the job do not predict leadership skill. Quality of practice does. You can spend 10,000 hours in meetings and still freeze in a difficult conversation.",
    },
    {
      question: "Can you practise leadership without a coach?",
      answer:
        "Yes, though a coach or a well-designed counterpart is faster. If you cannot work with a teacher, you still need an outside view: a recording, a transcript, a peer who will not make it easy, or a simulation that pushes back. Self-review without a counterpart usually rehearses your existing habits.",
    },
  ],
};

export function articleFaqsFor(slug: string): ArticleFaq[] {
  return ARTICLE_FAQS[slug] ?? [];
}
