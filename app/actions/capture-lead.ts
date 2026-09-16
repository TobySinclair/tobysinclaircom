"use server";

import { cookies } from "next/headers";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadResult = { ok: true } | { ok: false; error: string };

function cookieName(raw: string) {
  const clean = raw.replace(/[^a-z0-9_-]/gi, "").slice(0, 60);
  return clean || "cheat_sheet";
}

export async function captureCheatSheetLead(formData: FormData): Promise<LeadResult> {
  const honeypot = String(formData.get("company") || "").trim();
  if (honeypot) return { ok: true };

  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return { ok: false, error: "Enter a valid work email." };
  }

  const source = String(formData.get("source") || "cheat-sheet").slice(0, 80);
  const page = String(formData.get("page") || "").slice(0, 120);
  const storageKey = cookieName(String(formData.get("storageKey") || source));

  const webhook = process.env.LEAD_WEBHOOK_URL; // ConvertKit / Beehiiv / Zapier / Make
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source,
        page,
      }),
    });
    if (!response.ok) {
      return { ok: false, error: "Could not save that email. Try again in a moment." };
    }
  }

  const jar = await cookies();
  jar.set(storageKey, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return { ok: true };
}
