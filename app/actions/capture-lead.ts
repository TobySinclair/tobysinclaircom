"use server";

import { cookies } from "next/headers";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHEAT_SHEET_COOKIE = "nsttd_sheet";

type LeadResult = { ok: true } | { ok: false; error: string };

export async function captureCheatSheetLead(formData: FormData): Promise<LeadResult> {
  const honeypot = String(formData.get("company") || "").trim();
  if (honeypot) return { ok: true };

  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return { ok: false, error: "Enter a valid work email." };
  }

  const webhook = process.env.LEAD_WEBHOOK_URL; // ConvertKit / Beehiiv / Zapier / Make
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "never-split-the-difference-cheat-sheet",
        page: "/never-split-the-difference-cheat-sheet",
      }),
    });
    if (!response.ok) {
      return { ok: false, error: "Could not save that email. Try again in a moment." };
    }
  }

  const jar = await cookies();
  jar.set(CHEAT_SHEET_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return { ok: true };
}
