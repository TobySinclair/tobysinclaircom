import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-ink-muted">That URL doesn’t exist on this site.</p>
      <Link href="/" className="mt-8 inline-block font-semibold text-green hover:underline">
        Back home
      </Link>
    </div>
  );
}
