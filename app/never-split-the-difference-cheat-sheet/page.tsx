import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CheatSheetGate } from "@/components/cheat-sheet-gate";
import { ConversionCta } from "@/components/conversion-cta";
import { JsonLd } from "@/components/json-ld";
import { PrintButton } from "@/components/print-button";
import { cheatSheet } from "@/lib/cheat-sheet";
import { conversionOfferFor } from "@/lib/conversion";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: cheatSheet.pageTitle,
  description: cheatSheet.description,
  path: cheatSheet.path,
});

export default function NeverSplitCheatSheetPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: cheatSheet.pageTitle,
            description: cheatSheet.description,
            path: cheatSheet.path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book Summaries", path: "/book-summaries" },
            { name: "Never Split the Difference", path: "/post/never-split-the-difference-summary" },
            { name: "Cheat sheet", path: cheatSheet.path },
          ]),
          {
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is there a Never Split the Difference cheat sheet PDF?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. This page is a free Never Split the Difference cheat sheet you can print or save as a PDF. It covers mirrors, labels, calibrated questions, tactical empathy, and the accusation audit.",
                },
              },
              {
                "@type": "Question",
                name: "What techniques are on the Chris Voss cheat sheet?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Mirrors, labels, tactical empathy, getting to “that’s right”, calibrated how/what questions, the accusation audit, no-oriented questions, and the rule against compromise.",
                },
              },
            ],
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Book Summaries", href: "/book-summaries" },
          { name: "Never Split the Difference", href: "/post/never-split-the-difference-summary" },
          { name: "Cheat sheet" },
        ]}
      />

      <p className="eyebrow mt-6">Chris Voss · printable PDF</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{cheatSheet.title}</h1>
      <p className="mt-5 text-lg leading-8 text-white/80">
        People search for a Never Split the Difference cheat sheet PDF because the book is a field
        manual — and field manuals need a one-pager. This is mine. I use these moves in high-stakes
        workplace conversations, not hostage rooms. Print it. Take it into the next negotiation.
      </p>
      <p className="mt-4 text-sm text-ink-muted">
        Notes by {site.author}. Pair with the{" "}
        <Link href={cheatSheet.summaryHref} className="text-green hover:underline">
          full Never Split the Difference summary
        </Link>
        .
      </p>

      <section className="mt-10 rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight">What&apos;s on the sheet</h2>
        <ol className="mt-5 grid gap-3 text-sm leading-7 text-ink-muted sm:grid-cols-2">
          {cheatSheet.techniques.map((item, index) => (
            <li key={item.name}>
              <span className="font-mono text-xs text-cyan">{String(index + 1).padStart(2, "0")}</span>{" "}
              <span className="font-semibold text-white">{item.name}</span>
              <span className="block">{item.move}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10">
        <CheatSheetGate>
          <div className="cheat-sheet-print space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-muted">Unlocked. Print this page or save it as a PDF.</p>
              <PrintButton />
            </div>
            <CheatSheetBody />
          </div>
        </CheatSheetGate>
      </div>

      <div className="mt-16 print:hidden">
        <ConversionCta offer={conversionOfferFor("sales", "Never Split the Difference")} />
      </div>
    </article>
  );
}

function CheatSheetBody() {
  return (
    <div className="space-y-6">
      {cheatSheet.techniques.map((item) => (
        <section key={item.name} className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight">{item.name}</h2>
          <p className="mt-3 text-base leading-7 text-white/80">{item.move}</p>
          <p className="mt-3 text-sm leading-7 text-ink-muted">{item.use}</p>
          <p className="mt-4 text-sm leading-7">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-green">Try</span>
            <span className="mt-1 block text-white">{item.say}</span>
          </p>
        </section>
      ))}
      <section className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight">Rules I keep on the desk</h2>
        <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-ink-muted">
          {cheatSheet.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
