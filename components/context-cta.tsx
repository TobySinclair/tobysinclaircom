import Link from "next/link";

export type ContextCtaVariant = "services" | "practice";

export function ContextCta({
  variant,
  heading,
  body,
  href,
  buttonLabel,
  compact = false,
}: {
  variant: ContextCtaVariant
  heading: string
  body: string
  href: string
  buttonLabel: string
  compact?: boolean
}) {
  const external = href.startsWith("http");
  const label = buttonLabel || heading;

  if (compact) {
    return (
      <p className="mt-10 text-sm leading-7 text-ink-muted">
        {external ? (
          <a href={href} className="font-semibold text-green hover:underline">
            {heading} →
          </a>
        ) : (
          <Link href={href} className="text-green font-semibold hover:underline">
            {heading} →
          </Link>
        )}
      </p>
    );
  }

  return (
    <aside
      className="my-12 border-y border-white/10 py-8"
      data-cta-variant={variant}
    >
      <p className="eyebrow">{variant === "services" ? "Work with me" : "Practise"}</p>
      <h2 className="mt-3 max-w-2xl text-xl font-bold tracking-tight md:text-2xl">{heading}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{body}</p>
      {external ? (
        <a href={href} className="mt-5 inline-block text-sm font-semibold text-green hover:underline">
          {label} →
        </a>
      ) : (
        <Link href={href} className="mt-5 inline-block text-sm font-semibold text-green hover:underline">
          {label} →
        </Link>
      )}
    </aside>
  );
}

export { ContextCta as ContextCTA };

