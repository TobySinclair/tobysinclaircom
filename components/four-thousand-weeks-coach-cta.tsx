import Image from "next/image";
import { site } from "@/lib/site";

const COACH_HREF = site.fourThousandWeeksCoach;
const COACH_ACTION = "https://www.realtalkstudio.com/coach/anna-jones";
const STUDIO_ID = "1ec01f58-b431-44b7-bf39-4c2e279a41c4";

export function FourThousandWeeksCoachCta({ id = "four-thousand-weeks-coach" }: { id?: string }) {
  const headingId = `${id}-heading`;
  const inputId = `${id}-challenge`;

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
            Four Thousand Weeks, applied.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-7 text-white/70">
            Chat through your productivity challenge. Make the remaining weeks count.
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
              <video
                className="absolute inset-0 h-full w-full object-cover object-[center_20%] motion-reduce:hidden"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/avatars/four-thousand-weeks-coach.jpg"
                aria-hidden
              >
                <source src="/avatars/four-thousand-weeks-coach.mp4" type="video/mp4" />
              </video>
              <Image
                src="/avatars/four-thousand-weeks-coach.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 360px, 100vw"
                className="hidden object-cover object-[center_20%] motion-reduce:block"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00d1ff]" aria-hidden />
                Four Thousand Weeks Coach
              </p>
            </div>

            <div className="space-y-3 p-4">
              <p className="max-w-[95%] rounded-2xl rounded-tl-md bg-[#152033] px-4 py-3 text-sm leading-6 text-white">
                Your list will never end. So what deserves your next week?
              </p>
              <form action={COACH_ACTION} method="get" className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0d12] p-1.5 pl-4">
                <input type="hidden" name="studioId" value={STUDIO_ID} />
                <input type="hidden" name="branding" value="true" />
                <label htmlFor={inputId} className="sr-only">
                  Describe your productivity challenge
                </label>
                <input
                  id={inputId}
                  type="text"
                  placeholder="Describe your challenge..."
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
