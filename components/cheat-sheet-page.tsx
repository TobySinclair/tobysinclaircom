import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CheatSheetGate } from "@/components/cheat-sheet-gate";
import { ConversionCta } from "@/components/conversion-cta";
import { ContextCta } from "@/components/context-cta";
import { JsonLd } from "@/components/json-ld";
import { PrintButton } from "@/components/print-button";
import { getCheatSheet, type CheatSheet } from "@/lib/cheat-sheets";
import { conversionOfferFor } from "@/lib/conversion";
import { contextCtaFor } from "@/lib/context-ctas";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export function cheatSheetMetadata(slug: string): Metadata {
  const sheet = getCheatSheet(slug);
  if (!sheet) return {};
  return pageMetadata({
    title: sheet.pageTitle,
    description: sheet.description,
    path: sheet.path,
    modified: "2026-09-16T12:00:00.000Z",
  });
}

export function CheatSheetPage({ slug }: { slug: string }) {
  const sheet = getCheatSheet(slug);
  if (!sheet) notFound();
  const contextCta = contextCtaFor(sheet.slug);

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: sheet.pageTitle,
            description: sheet.description,
            path: sheet.path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book Summaries", path: "/book-summaries" },
            { name: sheet.bookTitle, path: sheet.summaryHref },
            { name: "Cheat sheet", path: sheet.path },
          ]),
          {
            "@type": "FAQPage",
            mainEntity: sheet.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Book Summaries", href: "/book-summaries" },
          { name: sheet.bookTitle, href: sheet.summaryHref },
          { name: "Cheat sheet" },
        ]}
      />

      <p className="eyebrow mt-6">
        {sheet.author} · printable PDF
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{sheet.title}</h1>
      <p className="mt-5 text-lg leading-8 text-white/80">{sheet.intro}</p>
      <p className="mt-4 text-sm text-ink-muted">
        Notes by {site.author}. Pair with the{" "}
        <Link href={sheet.summaryHref} className="text-green hover:underline">
          full {sheet.bookTitle} summary
        </Link>
        .
      </p>

      <section className="mt-10 rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight">What&apos;s on the sheet</h2>
        <ol className="mt-5 grid gap-3 text-sm leading-7 text-ink-muted sm:grid-cols-2">
          {sheet.techniques.map((item, index) => (
            <li key={item.name}>
              <span className="font-mono text-xs text-cyan">{String(index + 1).padStart(2, "0")}</span>{" "}
              <span className="font-semibold text-white">{item.name}</span>
              <span className="block">{item.move}</span>
            </li>
          ))}
        </ol>
      </section>

      {contextCta ? (
        <ContextCta
          variant={contextCta.variant}
          heading={contextCta.heading}
          body={contextCta.body}
          href={contextCta.href}
          buttonLabel={contextCta.buttonLabel}
        />
      ) : null}

      <div className="mt-10">
        <CheatSheetGate
          storageKey={sheet.slug}
          source={sheet.slug}
          page={sheet.path}
          title={sheet.gateTitle}
          body={sheet.gateBody}
        >
          <div className="cheat-sheet-print space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-muted">Unlocked. Print this page or save it as a PDF.</p>
              <PrintButton />
            </div>
            <CheatSheetBody sheet={sheet} />
          </div>
        </CheatSheetGate>
      </div>

      <div className="mt-16 print:hidden">
        <ConversionCta offer={conversionOfferFor(sheet.intent, sheet.bookTitle, sheet.slug)} />
        {contextCta ? (
          <ContextCta
            variant={contextCta.variant}
            heading={contextCta.heading}
            body={contextCta.body}
            href={contextCta.href}
            buttonLabel={contextCta.buttonLabel}
            compact
          />
        ) : null}
      </div>
    </article>
  );
}

function CheatSheetBody({ sheet }: { sheet: CheatSheet }) {
  return (
    <div className="space-y-6">
      {sheet.techniques.map((item) => (
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
          {sheet.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
