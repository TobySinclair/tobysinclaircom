import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-green">
                {item.name}
              </Link>
            ) : (
              <span className="text-white/80">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
