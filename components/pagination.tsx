import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  basePath,
}: {
  page: number
  totalPages: number
  basePath: string
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (value: number) => {
    if (value <= 1) return basePath;
    return `${basePath}/page/${value}`;
  };

  return (
    <nav className="mt-12 flex items-center justify-between text-sm" aria-label="Pagination">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="text-ink-muted hover:text-ink">
          Previous
        </Link>
      ) : (
        <span />
      )}
      <p className="text-ink-muted">
        Page {page} of {totalPages}
      </p>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className="text-ink-muted hover:text-ink">
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
