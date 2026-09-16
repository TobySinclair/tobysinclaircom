const DEFAULT_CAMPAIGN = "book-summary-cta";

export function withReferralUtm(
  href: string,
  content: string,
  campaign = DEFAULT_CAMPAIGN,
) {
  if (!href.includes("realtalkstudio.com")) return href;

  const url = new URL(href);
  url.searchParams.set("utm_source", "tobysinclair.com");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}
