import { site } from "@/lib/site";

export function RtsCta({
  title = "Real Talk Studio",
  body = "The company I founded. Teams use it to rehearse feedback, conflict, and other conversations that matter — before they happen for real.",
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-surface p-8 md:p-10">
      <p className="eyebrow">Company</p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{body}</p>
      <div className="mt-7">
        <a href={site.realTalk} className="btn-primary">
          Visit Real Talk Studio
        </a>
      </div>
    </section>
  );
}
