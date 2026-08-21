import Link from "next/link";
import type { ConversionOffer } from "@/lib/conversion";

export function ConversionCta({ offer }: { offer: ConversionOffer }) {
  const external = offer.href.startsWith("http");
  const secondaryExternal = offer.secondaryHref?.startsWith("http");

  return (
    <section className="rounded-3xl border border-green/25 bg-green/[0.06] p-8 md:p-10">
      <p className="eyebrow">{offer.eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight md:text-3xl">{offer.title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{offer.body}</p>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {external ? (
          <a href={offer.href} className="btn-primary">
            {offer.cta}
          </a>
        ) : (
          <Link href={offer.href} className="btn-primary">
            {offer.cta}
          </Link>
        )}
        {offer.secondaryCta && offer.secondaryHref ? (
          secondaryExternal ? (
            <a href={offer.secondaryHref} className="text-sm font-semibold text-green hover:underline">
              {offer.secondaryCta}
            </a>
          ) : (
            <Link href={offer.secondaryHref} className="text-sm font-semibold text-green hover:underline">
              {offer.secondaryCta}
            </Link>
          )
        ) : null}
      </div>
    </section>
  );
}
