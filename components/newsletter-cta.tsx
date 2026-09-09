"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type SubscribeResult } from "@/app/actions/subscribe-newsletter";
import { site } from "@/lib/site";

const initial: SubscribeResult | null = null;

export function NewsletterCta({
  id = "newsletter",
  variant = "default",
}: {
  id?: string
  variant?: "default" | "compact"
}) {
  const [state, action, pending] = useActionState(
    async (_prev: SubscribeResult | null, formData: FormData) => subscribeToNewsletter(formData),
    initial,
  );

  if (variant === "compact") {
    return (
      <div>
        <p className="font-semibold text-white">Friday newsletter</p>
        <p className="mt-2 text-sm leading-6 text-ink-muted">{site.newsletter.body}</p>
        {state?.ok ? (
          <p className="mt-4 text-sm font-semibold text-green" role="status">
            {site.newsletter.successTitle} ✅
          </p>
        ) : (
          <SubscribeForm id={id} state={state} action={action} pending={pending} compact />
        )}
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-green/25 bg-green/[0.06] p-8 md:p-10">
      <p className="eyebrow">{site.newsletter.eyebrow}</p>
      {state?.ok ? (
        <>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
            {site.newsletter.successTitle} ✅
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{site.newsletter.successBody}</p>
        </>
      ) : (
        <>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight md:text-3xl">
            {site.newsletter.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{site.newsletter.body}</p>
          <SubscribeForm id={id} state={state} action={action} pending={pending} />
        </>
      )}
    </section>
  );
}

function SubscribeForm({
  id,
  state,
  action,
  pending,
  compact = false,
}: {
  id: string
  state: SubscribeResult | null
  action: (formData: FormData) => void
  pending: boolean
  compact?: boolean
}) {
  const emailId = `${id}-email`;

  return (
    <form action={action} className={compact ? "mt-4" : "mt-7"}>
      <div className={`flex ${compact ? "max-w-md flex-col gap-2 sm:flex-row" : "max-w-lg flex-col gap-3 sm:flex-row"}`}>
        <label className="sr-only" htmlFor={emailId}>
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={site.newsletter.placeholder}
          aria-invalid={state && !state.ok ? true : undefined}
          className={`w-full border border-white/15 bg-black/40 text-white outline-none placeholder:text-white/35 focus:border-green ${
            compact ? "rounded-xl px-3 py-2.5 text-sm" : "rounded-2xl px-4 py-3 text-base"
          }`}
        />
        <input name="company" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button
          type="submit"
          className={`btn-primary shrink-0 ${compact ? "!px-4 !py-2.5 text-sm" : ""}`}
          disabled={pending}
        >
          {pending ? "Joining…" : site.newsletter.cta}
        </button>
      </div>
      {state && !state.ok ? (
        <p className="mt-3 text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
