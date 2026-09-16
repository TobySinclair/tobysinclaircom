const DEFAULT_CAMPAIGN = "book-summary-cta";

export function withReferralUtm(
  href: string,
  content: string,
  campaign = DEFAULT_CAMPAIGN,
) {
  const isRts =
    href.includes("realtalkstudio.com") || href.startsWith("{{RTS_") || href.startsWith("{{WPP_");
  if (!isRts && !href.startsWith("{{")) return href;

  const params = new URLSearchParams({
    utm_source: "tobysinclair.com",
    utm_medium: "referral",
    utm_campaign: campaign,
    utm_content: content,
  });

  if (href.startsWith("{{") || !href.startsWith("http")) {
    return `${href}${href.includes("?") ? "&" : "?"}${params.toString()}`;
  }

  const url = new URL(href);
  url.searchParams.set("utm_source", "tobysinclair.com");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}
