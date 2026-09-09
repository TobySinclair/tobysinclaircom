import Image from "next/image";
import { site } from "@/lib/site";

const COACH_HREF = site.fearSettingCoach;
const COACH_ACTION = "https://www.realtalkstudio.com/coach/marcia-thompson";
const STUDIO_ID = "1ec01f58-b431-44b7-bf39-4c2e279a41c4";

const PAPER_STEPS = [
  {
    title: "Define the fear",
    body: "Name the decision you’re avoiding, and the worst case in detail.",
  },
  {
    title: "Prevent and repair",
    body: "For each fear: how would you prevent it, and how would you repair it?",
  },
  {
    title: "Partial success",
    body: "What good still happens if you only partly succeed?",
  },
  {
    title: "Cost of inaction",
    body: "What does inaction cost in six months, a year, three years?",
  },
  {
    title: "Take a step",
    body: "Take the smallest step that still counts.",
  },
] as const;

function FearSettingPaperSteps() {
  return (
    <section
      aria-labelledby="fear-setting-paper-heading"
      className="rounded-[1.75rem] border border-white/10 bg-[#0c0c14] p-6 md:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">On paper</p>
      <h3 id="fear-setting-paper-heading" className="mt-3 text-2xl font-bold tracking-tight">
        Or work through it yourself
      </h3>
      <ol className="mt-6 grid gap-3">
        {PAPER_STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-black/40 p-4 md:p-5">
            <span className="big-idea-number" aria-hidden>
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="font-semibold tracking-tight text-white">{step.title}</p>
              <p className="mt-1 text-sm leading-6 text-ink-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FearSettingExercise({ id = "fear-setting-coach" }: { id?: string }) {
  return (
    <>
      <FearSettingCoachCta id={id} />
      <div className="mx-auto mt-8 max-w-3xl">
        <FearSettingPaperSteps />
      </div>
    </>
  );
}

export function FearSettingCoachCta({ id = "fear-setting-coach" }: { id?: string }) {
  const headingId = `${id}-heading`;
  const inputId = `${id}-decision`;

  return (
    <section
      aria-labelledby={headingId}
      className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b0d] p-6 md:p-8"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00d1ff]">AI Coach</p>
          <h2
            id={headingId}
            className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl md:leading-[1.12]"
          >
            Fear-Setting, applied.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-7 text-white/70">
            Talk through the decision you&apos;re putting off. Name the worst case, then choose a next step.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#00d1ff]">
            <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-[#00d1ff]" aria-hidden />
            Free, no signup
          </p>
          <a
            href={COACH_HREF}
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#00d1ff] px-6 py-3.5 text-sm font-bold transition hover:brightness-110"
            style={{ color: "#0b0b0d" }}
          >
            Start a coaching session
          </a>
        </div>

        <div
          className="relative rounded-[1.35rem] p-3 md:p-4"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "center",
          }}
        >
          <div className="overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#0e1118] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1d24]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatars/fear-setting-coach.gif"
                alt="Marcia Thompson, an AI Fear-Setting coach, leading a conversation"
                className="absolute inset-0 h-full w-full object-cover object-[center_20%] motion-reduce:hidden"
              />
              <Image
                src="/avatars/fear-setting-coach.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 360px, 100vw"
                className="hidden object-cover object-[center_20%] motion-reduce:block"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00d1ff]" aria-hidden />
                Fear-Setting Coach
              </p>
            </div>

            <div className="space-y-3 p-4">
              <p className="max-w-[95%] rounded-2xl rounded-tl-md bg-[#152033] px-4 py-3 text-sm leading-6 text-white">
                What&apos;s the decision you&apos;re avoiding? Let&apos;s make the fear specific.
              </p>
              <form action={COACH_ACTION} method="get" className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0d12] p-1.5 pl-4">
                <input type="hidden" name="studioId" value={STUDIO_ID} />
                <input type="hidden" name="branding" value="true" />
                <input type="hidden" name="demo" value="true" />
                <label htmlFor={inputId} className="sr-only">
                  Describe the decision you are avoiding
                </label>
                <input
                  id={inputId}
                  type="text"
                  placeholder="The decision I'm avoiding is..."
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  aria-label="Start a coaching session"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00d1ff] transition hover:brightness-110"
                  style={{ color: "#0b0b0d" }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
