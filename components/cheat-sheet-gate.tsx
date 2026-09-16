"use client";

import { useActionState, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { captureCheatSheetLead } from "@/app/actions/capture-lead";

type LeadResult = { ok: true } | { ok: false; error: string };

const initial: LeadResult | null = null;

function subscribeToKey(key: string) {
  return (onStoreChange: () => void) => {
    const handler = (event: StorageEvent) => {
      if (event.key === key) onStoreChange();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  };
}

export function CheatSheetGate({
  storageKey,
  source,
  page,
  title,
  body,
  children,
}: {
  storageKey: string
  source: string
  page: string
  title: string
  body: string
  children: ReactNode
}) {
  const stored = useSyncExternalStore(
    subscribeToKey(storageKey),
    () => window.localStorage.getItem(storageKey) === "1",
    () => false,
  );
  const [state, action, pending] = useActionState(
    async (_prev: LeadResult | null, formData: FormData) => captureCheatSheetLead(formData),
    initial,
  );

  useEffect(() => {
    if (state?.ok) window.localStorage.setItem(storageKey, "1");
  }, [state, storageKey]);

  const open = stored || state?.ok === true;

  if (open) return children;

  return (
    <section className="rounded-3xl border border-green/25 bg-green/[0.06] p-8 md:p-10">
      <p className="eyebrow">Free PDF</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{body}</p>
      <form action={action} className="mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`${storageKey}-email`}>
          Email
        </label>
        <input
          id={`${storageKey}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="karen.d@example.net"
          className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-base text-white outline-none placeholder:text-white/35 focus:border-green"
        />
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="page" value={page} />
        <input type="hidden" name="storageKey" value={storageKey} />
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
        Occasional notes on hard conversations. Unsubscribe any time. No spam.
      </p>
    </section>
  );
}
