import type { ReactNode } from "react";

function QuoteFigure({ quote }: { quote: string }) {
  return (
    <figure className="guide-quote">
      <blockquote>{quote}</blockquote>
    </figure>
  );
}

function PlateauFigure() {
  return (
    <figure className="guide-panel">
      <p className="eyebrow">The OK plateau</p>
      <h3>Experience flattens. Practice keeps rising.</h3>
      <div className="guide-plateau" aria-hidden="true">
        <svg viewBox="0 0 640 220" fill="none">
          <path d="M24 176h592" stroke="rgba(255,255,255,0.12)" />
          <path d="M24 24v152" stroke="rgba(255,255,255,0.12)" />
          <path
            d="M40 168C96 160 120 86 188 78c52-6 70 4 118 8 86 8 140 6 220 6"
            stroke="#71717a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M40 168C92 158 118 112 176 96c70-20 110-8 168-28C430 48 500 36 600 22"
            stroke="#00ff88"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="306" cy="84" r="5" fill="#71717a" />
          <text x="318" y="68" fill="#a1a1aa" fontSize="13" fontFamily="ui-sans-serif, system-ui">
            OK plateau
          </text>
        </svg>
        <div className="guide-legend">
          <span>
            <i className="bg-[#71717a]" /> Experience
          </span>
          <span>
            <i className="bg-green" /> Deliberate practice
          </span>
        </div>
      </div>
      <figcaption>
        Early gains look the same. The difference is what happens after the job starts to feel easy.
      </figcaption>
    </figure>
  );
}

function ZonesFigure() {
  return (
    <figure className="guide-panel">
      <p className="eyebrow">Where practice actually works</p>
      <h3>Comfort. Learning. Panic.</h3>
      <div className="guide-zones">
        <div>
          <p>Comfort</p>
          <strong>You already can</strong>
          <span>Repeating this maintains the skill. It does not raise it.</span>
        </div>
        <div className="is-active">
          <p>Learning</p>
          <strong>Just out of reach</strong>
          <span>Slightly failing, with feedback. This is the only zone that counts.</span>
        </div>
        <div>
          <p>Panic</p>
          <strong>Too hard to learn</strong>
          <span>Flooded. No signal. Drop the difficulty until you can adjust.</span>
        </div>
      </div>
      <figcaption>Most leadership “practice” is comfort: a model, a discussion, a kind colleague.</figcaption>
    </figure>
  );
}

function LoopFigure() {
  const steps = [
    "Pick the conversation",
    "Write the sentence",
    "Attempt against resistance",
    "Get evidence",
    "Change one thing",
    "Take it live",
  ];

  return (
    <figure className="guide-panel">
      <p className="eyebrow">This week</p>
      <h3>A six-step practice loop</h3>
      <ol className="guide-loop">
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
      <figcaption>Frequency beats intensity. Two short sessions beat one heroic afternoon.</figcaption>
    </figure>
  );
}

function MatchFigure() {
  return (
    <figure className="guide-panel">
      <p className="eyebrow">Why leaders don&apos;t get reps</p>
      <h3>The match is not training</h3>
      <div className="guide-split">
        <div>
          <p>The match</p>
          <strong>Live conversation</strong>
          <ul>
            <li>Full stakes, one attempt</li>
            <li>Feedback months later, if at all</li>
            <li>You cannot rewind redundancy</li>
          </ul>
        </div>
        <div className="is-active">
          <p>Training</p>
          <strong>Deliberate practice</strong>
          <ul>
            <li>Same skill, many attempts</li>
            <li>Feedback on this attempt</li>
            <li>Fail before it costs a relationship</li>
          </ul>
        </div>
      </div>
      <figcaption>Sport figured this out a century ago. Leadership still sends people into the match and calls it development.</figcaption>
    </figure>
  );
}

const FIGURES: Record<string, (alt: string) => ReactNode> = {
  quote: (alt) => <QuoteFigure quote={alt} />,
  plateau: () => <PlateauFigure />,
  zones: () => <ZonesFigure />,
  loop: () => <LoopFigure />,
  match: () => <MatchFigure />,
};

export function GuideFigure({ name, alt }: { name: string; alt: string }) {
  const render = FIGURES[name];
  if (!render) return null;
  return <>{render(alt)}</>;
}

GuideFigure.displayName = "GuideFigure";
