"use client";

import { useActionState, useEffect, useState, type ReactNode } from "react";
import { captureCheatSheetLead, type LeadResult } from "@/app/actions/capture-lead";

const STORAGE_KEY = "nsttd_sheet";
const initial: LeadResult | null = null;

export function CheatSheetGate({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState(false);
  const [state, action, pending] = useActionState(
    async (_prev: LeadResult | null, formData: FormData) => captureCheatSheetLead(formData),
    initial,
  );

  useEffect(() => {
    setStored(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  useEffect(() => {
    if (state?.ok) window.localStorage.setItem(STORAGE_KEY, "1");
  }, [state]);

  const open = stored || state?.ok === true;

  if (open) return children;

  return (
    <section className="rounded-3xl border border-green/25 bg-green/[0.06] p-8 md:p-10">
      <p className="eyebrow">Free PDF</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
        Unlock the printable Never Split the Difference cheat sheet
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
        Enter your email and I&apos;ll unlock the one-page sheet — labels, mirrors, calibrated
        questions, and the accusation audit. Print it or save it as a PDF.
      </p>
      <form action={action} className="mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="cheat-sheet-email">
          Email
        </label>
        <input
          id="cheat-sheet-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="karen.d@example.net"
          className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-base text-white outline-none placeholder:text-white/35 focus:border-green"
        />
        <input name="company" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" className="btn-primary shrink-0" disabled={pending}>
          {pending ? "Unlocking…" : "Get the cheat sheet"}
        </button>
      </form>
      {state && !state.ok ? (
        <p className="mt-3 text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
      <p className="mt-4 text-xs leading-6 text-ink-muted">
        Occasional notes on negotiation and hard conversations. Unsubscribe any time. No spam.
      </p>
    </section>
  );
}
