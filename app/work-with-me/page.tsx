import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata, personJsonLd, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.seo.workTitle,
  description: site.seo.workDescription,
  path: "/work-with-me",
});

const paths = [
  {
    index: "01",
    who: "Your teams need to use AI well",
    offer: "AI Enablement Training",
    href: "#training",
  },
  {
    index: "02",
    who: "Your leaders need to lead the change",
    offer: "Coaching Through AI Change",
    href: "#coaching",
  },
  {
    index: "03",
    who: "Your organisation needs verified conversational competence at scale",
    offer: "Real Talk Studio",
    href: "#real-talk-studio",
  },
];

const trainingTopics = [
  {
    title: "Finding the real use cases",
    body: "Mapping AI against your actual workflows, and being honest about where it doesn't belong",
  },
  {
    title: "Hands-on practice",
    body: "Prompting, judgement, and quality control with the tools your organisation actually uses",
  },
  {
    title: "The opportunity mindset",
    body: "Using AI to generate value and credibility, not just cut cost",
  },
  {
    title: "Human-in-the-loop judgement",
    body: "Where people must stay in control, especially in regulated and people-sensitive work",
  },
];

const trainingFormats = [
  {
    title: "Half-day working session",
    body: "One team, one function, hands-on from minute ten",
  },
  {
    title: "Full-day intensive",
    body: "Deeper practice plus a use-case roadmap the team owns",
  },
  {
    title: "Programme",
    body: "A series of sessions across functions, building capability that compounds",
  },
];

const coachingLooksLike = [
  {
    title: "One-to-one coaching",
    body: "For senior managers leading AI change — the thinking space to work through resistance, restructuring, and their own relationship with the technology",
  },
  {
    title: "Team coaching",
    body: "For exec and leadership teams — getting honest about where the organisation really is, and aligning on the change story people will actually believe",
  },
  {
    title: "The conversations themselves",
    body: "Preparing leaders for the specific discussions AI forces: redefined roles, new expectations, anxious teams, sceptical high-performers",
  },
];

const coachingShapes = [
  {
    title: "Leader coaching",
    body: "Typically 6 sessions over 3–6 months",
  },
  {
    title: "Exec team coaching",
    body: "Facilitated sessions alongside your transformation milestones",
  },
  {
    title: "Coaching + training combined",
    body: "Many clients pair a team training session with follow-up coaching for the leaders carrying the change",
  },
];

const credibility = [
  {
    title: "I build an AI company daily",
    body: "So the training is informed by shipping real product, not conference slides",
  },
  {
    title: "I've coached leaders for a decade",
    body: "So the change work goes deeper than adoption metrics",
  },
  {
    title: "I spent ten years at JP Morgan",
    body: "So I know what regulated, high-pressure environments will and won't tolerate",
  },
];

const steps = [
  {
    index: "01",
    title: "Discovery call (30 min, free)",
    body: "You describe where you are; I tell you honestly whether and how I can help",
  },
  {
    index: "02",
    title: "Proposal",
    body: "A short, plain-English outline of the work, shaped to your context",
  },
  {
    index: "03",
    title: "The work",
    body: "Training, coaching, or both; in person or remote",
  },
  {
    index: "04",
    title: "What's next",
    body: "Every engagement ends with a clear view of what your organisation should do without me",
  },
];

const faqs = [
  {
    question: "Do you only work with large enterprises?",
    answer:
      "No. Most of my work is with enterprise functions and leadership teams, but the sessions scale down well — the smallest useful unit is one leadership team.",
  },
  {
    question: "Which AI tools do you train on?",
    answer:
      "Whatever your organisation actually uses. The judgement and habits transfer; I'm tool-agnostic by design.",
  },
  {
    question: "In person or remote?",
    answer: "Both. I'm based in the UK and run sessions in person across the UK and remotely worldwide.",
  },
  {
    question: "Are you selling Real Talk Studio in these sessions?",
    answer:
      "No. Training and coaching stand on their own. Some clients later adopt the platform; many don't. I'll always tell you which I think fits.",
  },
];

export default function WorkWithMePage() {
  return (
    <div>
      <JsonLd
        data={[
          webPageJsonLd({
            name: site.seo.workTitle,
            description: site.seo.workDescription,
            path: "/work-with-me",
          }),
          personJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work with me", path: "/work-with-me" },
          ]),
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-0 h-[480px] w-[480px] glow-cyan opacity-80" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[360px] w-[360px] glow-green opacity-60" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 md:py-24">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work with me" }]} />
          <p className="eyebrow mt-8">Work with me</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.05]">
            Your AI strategy will live or die in conversations{" "}
            <span className="gradient-text">the slide deck never mentions.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            I work with enterprises on the human side of AI — training the teams who need to use it, coaching
            the leaders who need to lead it, and building the practice habits that make change stick. Here&apos;s
            how.
          </p>
          <a href={site.calendly} className="btn-primary mt-8">
            Book a discovery call →
          </a>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0c0c14]">
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <p className="eyebrow">How to choose</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Three ways in, one thread through all of them: practice over theory.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {paths.map((path) => (
              <a
                key={path.href}
                href={path.href}
                className="group rounded-[1.5rem] border border-white/10 bg-black/50 p-6 transition-colors hover:border-green/50 md:p-8"
              >
                <p className="font-mono text-xs text-cyan">{path.index}</p>
                <p className="mt-5 text-sm leading-7 text-ink-muted">{path.who}</p>
                <p className="mt-4 text-xl font-bold tracking-tight group-hover:text-green">{path.offer}</p>
                <p className="mt-6 text-sm font-semibold text-green">Read more →</p>
              </a>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-base leading-8 text-ink-muted">
            Not sure which? That&apos;s what the discovery call is for. No pitch, just a working conversation
            about where you are.
          </p>
        </div>
      </section>

      <section id="training" className="relative scroll-mt-24 overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 glow-cyan opacity-40" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24">
          <p className="font-mono text-xs text-cyan">01 — AI Enablement Training</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl md:leading-[1.15]">
            From “we should use AI” to actually using it well.
          </h2>
          <div className="mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-black/40 p-8 md:p-10">
            <p className="text-sm leading-7 text-ink-muted">Most AI training is a demo with a Q&A bolted on.</p>
            <p className="mt-5 text-2xl font-bold tracking-tight text-white md:text-3xl md:leading-[1.2]">
              People nod. People leave. Nothing changes.
            </p>
            <p className="mt-6 text-lg leading-8 text-ink-muted">
              My sessions are working sessions. Your teams bring their real work — the reports they write, the
              candidates they screen, the data they wrestle with — and leave having <em>done</em> something with
              AI, not just watched someone else do it.
            </p>
          </div>

          <h3 className="mt-16 text-xl font-bold tracking-tight">
            What we cover (shaped to your function)
          </h3>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {trainingTopics.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6">
                <p className="font-semibold tracking-tight">{topic.title}</p>
                <p className="mt-2 text-sm leading-7 text-ink-muted">{topic.body}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-16 text-xl font-bold tracking-tight">Formats</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trainingFormats.map((format) => (
              <div key={format.title} className="rounded-2xl border border-green/20 bg-green/[0.04] p-6">
                <p className="font-semibold tracking-tight">{format.title}</p>
                <p className="mt-2 text-sm leading-7 text-ink-muted">{format.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#0c0c14] p-6 md:flex-row md:items-center md:p-8">
            <div className="inline-flex shrink-0 items-center self-start rounded-xl bg-white px-4 py-2.5">
              <Image src="/wpp-logo.png" alt="WPP" width={262} height={148} className="h-8 w-auto" />
            </div>
            <p className="text-base leading-8 text-ink-muted">
              <span className="font-semibold text-white">Recent example. </span>
              I ran a session with WPP&apos;s HR and talent leaders on leading AI adoption across recruitment,
              employee engagement, and people analytics — reframing AI as an opportunity engine for the function,
              not a cost-saving exercise.{" "}
              <Link href="/#wpp" className="font-semibold text-green hover:underline">
                Read the case study →
              </Link>
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green">Who it&apos;s for</p>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Leadership teams, HR and talent functions, L&D leaders, and any function rolling out AI that needs
              more than a webinar.
            </p>
          </div>
          <a href={site.calendly} className="btn-primary mt-8">
            Book a training conversation →
          </a>
        </div>
      </section>

      <section id="coaching" className="scroll-mt-24 border-t border-white/10 bg-[#0c0c14]">
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <p className="font-mono text-xs text-cyan">02 — Coaching Through AI Change</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl md:leading-[1.15]">
            The change programme has a plan.{" "}
            <span className="gradient-text">Your leaders have a knot in their stomach.</span>
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-5 text-lg leading-8 text-ink-muted">
              <p>
                AI transformation is the hardest change most leaders will ever run. It touches identity, not just
                process. And the manager in the middle has to hold that conversation with no script.
              </p>
              <p>This is where a decade of coaching meets daily life inside an AI company.</p>
            </div>
            <blockquote className="rounded-[2rem] border border-white/10 bg-black/50 p-8">
              <p className="text-2xl font-bold tracking-tight text-white md:leading-[1.2]">
                People aren&apos;t resisting the tool — they&apos;re asking what it means for <em>them</em>.
              </p>
            </blockquote>
          </div>

          <h3 className="mt-16 text-xl font-bold tracking-tight">What coaching looks like</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {coachingLooksLike.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/50 p-6">
                <p className="font-semibold tracking-tight">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-base leading-8 text-ink-muted">
            I&apos;m an ICF Professional Certified Coach. The craft is listening, asking, and helping people
            find their own next move — not adding another layer of advice. Pointed at AI change, it&apos;s the
            difference between a transformation people comply with and one they commit to.
          </p>

          <h3 className="mt-16 text-xl font-bold tracking-tight">Engagement shapes</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {coachingShapes.map((shape) => (
              <div key={shape.title} className="rounded-2xl border border-cyan/20 bg-cyan/[0.04] p-6">
                <p className="font-semibold tracking-tight">{shape.title}</p>
                <p className="mt-2 text-sm leading-7 text-ink-muted">{shape.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green">Who it&apos;s for</p>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Senior managers, exec teams, transformation leads, and the people everyone else is watching to see
              how to feel about AI.
            </p>
          </div>
          <a href={site.calendly} className="btn-primary mt-8">
            Explore coaching →
          </a>
        </div>
      </section>

      <section id="real-talk-studio" className="relative scroll-mt-24 overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute -left-16 bottom-0 h-80 w-80 glow-green opacity-50" />
        <div className="pointer-events-none absolute -right-10 top-0 h-72 w-72 glow-cyan opacity-40" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 p-8 md:p-14">
            <p className="font-mono text-xs text-cyan">03 — Real Talk Studio</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl md:leading-[1.15]">
              Knowing what to say is the theory test.{" "}
              <span className="gradient-text">Saying it under pressure is the driving test.</span>
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-ink-muted">
              <p>
                Real Talk Studio is the company I founded. Teams rehearse feedback, conflict, and high-stakes
                conversations with AI characters — before they happen for real — and get behavioural evidence of
                competence, not just a completion certificate.
              </p>
              <p>
                It&apos;s also why my training and coaching aren&apos;t secondhand. I design with large language
                models every day. I know where AI genuinely helps, where it quietly fails, and what it takes to
                get an organisation actually using it — because I live it.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm leading-7 text-ink-muted">
                  Training builds the skill. Coaching builds the leader.{" "}
                  <span className="font-semibold text-white">Real Talk Studio proves the competence</span> — at
                  scale, with data.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm leading-7 text-ink-muted">
                  Many engagements start with a session or coaching and grow into the platform when the
                  organisation wants practice embedded, not occasional.
                </p>
              </div>
            </div>
            <a href={site.realTalk} className="btn-primary mt-10">
              Visit Real Talk Studio →
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0c0c14]">
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <p className="eyebrow">Why this combination works</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl md:leading-[1.15]">
            Built with AI. Grounded in people. Tested in demanding rooms.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {credibility.map((item, index) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/50 p-6 md:p-8">
                <p className="font-mono text-xs text-cyan">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-4 text-xl font-bold tracking-tight">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-2xl text-2xl font-bold tracking-tight text-white md:text-3xl md:leading-[1.2]">
            You don&apos;t need another AI keynote. You need someone who can sit with your people and make it
            real.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 glow-green opacity-40" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24">
          <p className="eyebrow">How engagements start</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">One conversation. Then the work.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div key={step.index} className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6">
                <p className="font-mono text-3xl font-bold text-green/80">{step.index}</p>
                <p className="mt-5 font-semibold tracking-tight">{step.title}</p>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-green/30 bg-green/[0.07] px-8 py-10 md:flex md:items-center md:justify-between md:px-12">
            <p className="max-w-xl text-2xl font-bold tracking-tight">
              A 30-minute discovery call. No pitch — just a working conversation.
            </p>
            <a href={site.calendly} className="btn-primary mt-6 md:mt-0">
              Book a discovery call →
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <p className="eyebrow">Reading</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            The books behind this work
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Link
              href="/book-summaries/ai"
              className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 transition-colors hover:border-green md:p-8"
            >
              <p className="text-sm font-semibold tracking-tight">AI book summaries</p>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                What AI is doing to organisations — and what it is not doing for the people inside them.
              </p>
              <p className="mt-5 text-sm font-semibold text-green">Read the notes →</p>
            </Link>
            <Link
              href="/coaching-books"
              className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 transition-colors hover:border-green md:p-8"
            >
              <p className="text-sm font-semibold tracking-tight">Coaching books</p>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                The master list for managers learning to coach, and coaches tightening their craft.
              </p>
              <p className="mt-5 text-sm font-semibold text-green">Start the path →</p>
            </Link>
            <Link
              href="/book-summaries/hard-conversations"
              className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 transition-colors hover:border-green md:p-8"
            >
              <p className="text-sm font-semibold tracking-tight">Hard conversation books</p>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                The notes behind Real Talk Studio: candour, listening, and staying in the room.
              </p>
              <p className="mt-5 text-sm font-semibold text-green">Read the notes →</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0c0c14]">
        <div className="mx-auto w-full max-w-3xl px-5 py-24">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Common questions</h2>
          <div className="mt-12 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-black/40 px-5 py-5"
              >
                <summary className="cursor-pointer list-none font-semibold tracking-tight marker:content-none">
                  <span className="flex items-start justify-between gap-6">
                    {faq.question}
                    <span className="text-green transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 text-base leading-8 text-ink-muted">{faq.answer}</p>
              </details>
            ))}
            <details className="group rounded-2xl border border-white/10 bg-black/40 px-5 py-5">
              <summary className="cursor-pointer list-none font-semibold tracking-tight marker:content-none">
                <span className="flex items-start justify-between gap-6">
                  What&apos;s the first step?
                  <span className="text-green transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 text-base leading-8 text-ink-muted">
                A 30-minute discovery call.{" "}
                <a href={site.calendly} className="font-semibold text-green hover:underline">
                  Book it here →
                </a>
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
