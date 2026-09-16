import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CheatSheetGate } from "@/components/cheat-sheet-gate";
import { ContextCta } from "@/components/context-cta";
import { JsonLd } from "@/components/json-ld";
import { MarkdownBody } from "@/components/markdown-body";
import { PrintButton } from "@/components/print-button";
import { getLandingPage } from "@/lib/content";
import { breadcrumbJsonLd, landingMetadata, webPageJsonLd } from "@/lib/seo";

const SLUG = "workshop-planning-template";

const faqs = [
  {
    question: "What should a workshop plan include?",
    answer:
      "Purpose, practicalities, participants, products, process, and principles. If you cannot fill those six boxes, you are not ready to send the invite.",
  },
  {
    question: "How long does it take to plan a workshop?",
    answer:
      "A tight half-day session usually takes two to four hours to plan well, including the sponsor conversation. The second workshop in a programme is faster because you reuse the canvas.",
  },
  {
    question: "Is this template free?",
    answer:
      "Yes. Enter your email on this page to unlock the printable one-page canvas and the filled-in half-day example. You can print it or save it as a PDF.",
  },
];

const filledExample = [
  {
    name: "Purpose",
    body: "Decide what ships this quarter and what waits — and leave with a decision the room will defend, not a polite maybe.",
  },
  {
    name: "Practicalities",
    body: "Tuesday 9:30–13:00, room with U-shape plus a wall of paper. Lunch at 13:00. No hybrid; remote people get a 30-minute readout at 15:00.",
  },
  {
    name: "Participants",
    body: "Product lead, eng lead, two squad leads, the CSM who will explain the trade-off to customers. Sponsor joins the last 30 minutes. Twelve people max.",
  },
  {
    name: "Products",
    body: "In: last quarter's outcomes, the unconstrained wishlist. Out: a sequenced backlog on one page, and a five-line note the CSM can send that afternoon.",
  },
  {
    name: "Process",
    body: "09:30 purpose and principles. 09:45 diverge on options (silent then share). 11:00 break. 11:15 cluster and name the real trade-offs. 12:15 timed decision. 12:45 comms note. 13:00 close.",
  },
  {
    name: "Principles",
    body: "No silent vetoes after the room. Phones down. If we cannot decide, we name the missing fact and who will get it by Friday — we do not 'take it offline' as a way of hiding.",
  },
];

export const metadata: Metadata = (() => {
  const page = getLandingPage(SLUG);
  return page ? landingMetadata(page) : {};
})();

export default function WorkshopPlanningTemplatePage() {
  const page = getLandingPage(SLUG);
  if (!page) notFound();
  const body = page.body.replace(/^#\s+.*\n+/, "");

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: page.seoTitle || page.title,
            description: page.seoDescription || page.description,
            path: `/${page.slug}`,
            image: page.image,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.title, path: `/${page.slug}` },
          ]),
          {
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.title }]} />
      <h1 className="mt-6 text-4xl font-bold tracking-tight">{page.title}</h1>
      <p className="mt-4 text-lg leading-8 text-ink-muted">
        A one-page canvas so the session has a purpose, the right people, and an agenda that can
        actually deliver. Download it, then steal the filled-in half-day example.
      </p>

      <div className="mt-10">
        <CheatSheetGate
          storageKey="workshop-planning-template"
          source="workshop-planning-template"
          page="/workshop-planning-template"
          title="Download the free workshop planning template"
          body="Enter your email and I'll unlock the one-page canvas and a filled-in half-day example. Print it or save it as a PDF."
        >
          <div className="cheat-sheet-print space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-muted">Unlocked. Print this page or save it as a PDF.</p>
              <PrintButton />
            </div>
            <section className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
              <h2 className="text-xl font-bold tracking-tight">The blank canvas</h2>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                Six boxes. Fill them before you open a slide deck.
              </p>
              <ol className="mt-5 grid gap-3 text-sm leading-7 text-ink-muted sm:grid-cols-2">
                {["Purpose", "Practicalities", "Participants", "Products", "Process", "Principles"].map(
                  (item, index) => (
                    <li key={item} className="rounded-2xl border border-white/10 p-4">
                      <span className="font-mono text-xs text-cyan">
                        {String(index + 1).padStart(2, "0")}
                      </span>{" "}
                      <span className="font-semibold text-white">{item}</span>
                    </li>
                  ),
                )}
              </ol>
            </section>
            <section id="filled-in-example" className="scroll-mt-28">
              <h2 className="text-xl font-bold tracking-tight">Filled-in example</h2>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                A sample half-day workshop: decide what ships this quarter. Use it as a pattern, not a
                script.
              </p>
              <div className="mt-6 space-y-4">
                {filledExample.map((item) => (
                  <section key={item.name} className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6">
                    <h3 className="font-bold tracking-tight">{item.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-muted">{item.body}</p>
                  </section>
                ))}
              </div>
            </section>
          </div>
        </CheatSheetGate>
      </div>

      <div className="mt-12">
        <MarkdownBody content={body} />
      </div>

      <section id="using-ai-to-design-your-workshop" className="mt-16">
        <h2 className="text-xl font-bold tracking-tight">Using AI to design your workshop</h2>
        <div className="mt-5 space-y-5 text-base leading-8 text-ink-muted">
          <p>
            AI is useful for the first ugly draft of an agenda, not for deciding whether the room should
            exist. Paste your purpose, participants, and the decision you need, and ask for a timed
            half-day outline. Then throw away anything that sounds like a slide title.
          </p>
          <p>
            Where it helps: turning a vague brief into questions, listing the artefacts you should leave
            with, and spotting the session that is actually three sessions. Where it fails: reading the
            politics. It will not tell you that the sponsor wants a decision and the room wants a
            discussion. That is still your job.
          </p>
          <p>
            Use it as a critic, too. Ask what will go wrong if this group is tired, late, or missing the
            one person who can say no. Then look at your principles box. If the principles cannot
            survive that answer, rewrite them.
          </p>
          <p>
            If you run workshops, training, or leadership programmes and want practice built in — not
            another deck — that is the work I do with enterprises.{" "}
            <Link href="/work-with-me" className="font-semibold text-green hover:underline">
              Work with me
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="faq" className="mt-12 rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight">Questions</h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold tracking-tight">{item.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-ink-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-16">
        <ContextCta
          variant="services"
          heading="Want practice built into the workshop, not another slide deck?"
          body="I design working sessions for HR, L&D and leadership teams — including the conversations the agenda usually skips."
          href="/work-with-me"
          buttonLabel="Work with me"
        />
      </div>
    </article>
  );
}
