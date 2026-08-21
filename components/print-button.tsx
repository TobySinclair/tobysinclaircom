"use client";

export function PrintButton({ label = "Print / save PDF" }: { label?: string }) {
  return (
    <button type="button" className="btn-secondary !px-4 !py-2 text-sm print:hidden" onClick={() => window.print()}>
      {label}
    </button>
  );
}
