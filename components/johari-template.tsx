import { CheatSheetGate } from "@/components/cheat-sheet-gate";
import { PrintButton } from "@/components/print-button";

const quadrants = [
  {
    name: "Open",
    meaning: "You and the team both selected it.",
    example: "dependable, organised",
  },
  {
    name: "Blind",
    meaning: "The team selected it. You did not.",
    example: "tense, powerful",
  },
  {
    name: "Hidden",
    meaning: "You selected it. The team did not.",
    example: "calm, witty",
  },
  {
    name: "Unknown",
    meaning: "Nobody selected it this round.",
    example: "bold, shy, religious",
  },
];

export function JohariTemplate() {
  return (
    <section id="free-johari-window-template" className="scroll-mt-28">
      <h2 className="text-xl font-bold tracking-tight">Free Johari Window Template</h2>
      <p className="mt-4 text-base leading-7 text-ink-muted">
        A one-page template you can print: four quadrants, a worked team example, the adjective list,
        and the email to send colleagues. Unlock it below.
      </p>
      <div className="mt-8">
        <CheatSheetGate
          storageKey="johari-window-template"
          source="johari-window-template"
          page="/post/how-to-use-johari-window-to-build-self-awareness"
          title="Unlock the printable Johari Window template"
          body="Enter your email and I'll unlock the one-page template — quadrants, a worked example, and the adjective list. Print it or save it as a PDF."
        >
          <div className="cheat-sheet-print space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-muted">Unlocked. Print this page or save it as a PDF.</p>
              <PrintButton />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {quadrants.map((item) => (
                <section key={item.name} className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6">
                  <h3 className="text-lg font-bold tracking-tight">{item.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-muted">{item.meaning}</p>
                  <p className="mt-3 text-sm text-white">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-green">
                      Example
                    </span>
                    <span className="mt-1 block">{item.example}</span>
                  </p>
                </section>
              ))}
            </div>
            <section className="rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8">
              <h3 className="text-lg font-bold tracking-tight">How to fill it</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-ink-muted">
                <li>Pick five adjectives that describe you.</li>
                <li>Ask a mixed set of colleagues to pick five that describe you.</li>
                <li>Plot overlap into Open, Blind, Hidden, and Unknown.</li>
                <li>Talk about the gaps. Curiosity, not defence.</li>
              </ol>
            </section>
          </div>
        </CheatSheetGate>
      </div>
    </section>
  );
}
