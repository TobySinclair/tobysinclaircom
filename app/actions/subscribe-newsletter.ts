"use server";

import { site } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult = { ok: true } | { ok: false; error: string };

export async function subscribeToNewsletter(formData: FormData): Promise<SubscribeResult> {
  const honeypot = String(formData.get("company") || "").trim();
  if (honeypot) return { ok: true };

  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return { ok: false, error: "Enter a valid email." };
  }

  const apiKey = process.env.MAILERLITE_API_KEY?.trim();
  if (apiKey) {
    const viaApi = await subscribeViaMailerLiteApi(email, apiKey);
    if (viaApi) return viaApi;
  }

  return subscribeViaWebform(email);
}

async function subscribeViaMailerLiteApi(email: string, apiKey: string): Promise<SubscribeResult | null> {
  const groupId = process.env.MAILERLITE_GROUP_ID?.trim() || site.newsletter.groupId;
  const modern = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      resubscribe: true,
      groups: [groupId],
    }),
    cache: "no-store",
  });

  if (modern.ok) return { ok: true };
  if (modern.status !== 401) return mailerLiteError(modern);

  const classic = await fetch(`https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`, {
    method: "POST",
    headers: {
      "X-MailerLite-ApiKey": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      resubscribe: true,
    }),
    cache: "no-store",
  });

  if (classic.ok) return { ok: true };
  if (classic.status === 401) return null;
  return mailerLiteError(classic);
}

async function subscribeViaWebform(email: string): Promise<SubscribeResult> {
  const params = new URLSearchParams({
    "fields[email]": email,
    "ml-submit": "1",
    anticsrf: "true",
    ajax: "1",
  });

  try {
    const response = await fetch(`${site.newsletter.formAction}?${params}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const payload = (await response.json()) as {
      success?: boolean
      errors?: { fatal?: string; fields?: { email?: string[] } }
    };
    if (payload.success) return { ok: true };
    const message =
      payload.errors?.fatal ||
      payload.errors?.fields?.email?.[0] ||
      "Could not subscribe that email. Try again in a moment.";
    return { ok: false, error: message };
  } catch {
    return { ok: false, error: "Could not subscribe that email. Try again in a moment." };
  }
}

async function mailerLiteError(response: Response): Promise<SubscribeResult> {
  if (response.status === 422) {
    const payload = (await response.json().catch(() => null)) as {
      message?: string
      errors?: { email?: string[] }
    } | null;
    return {
      ok: false,
      error: payload?.errors?.email?.[0] || payload?.message || "Enter a valid email.",
    };
  }
  return { ok: false, error: "Could not subscribe that email. Try again in a moment." };
}
