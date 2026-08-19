import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.homeTitle,
    template: `%s | ${site.name}`,
  },
  description: site.seo.homeDescription,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  publisher: site.name,
  keywords: [
    "Toby Sinclair",
    "human side of AI",
    "AI enablement",
    "AI change management",
    "coaching",
    "leadership",
    "hard conversations",
    "book summaries",
    "Real Talk Studio",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    url: site.url,
    title: site.seo.homeTitle,
    description: site.seo.homeDescription,
    images: [{ url: site.seo.homeImage, alt: site.seo.homeTitle }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@TobySinclair_",
    title: site.seo.homeTitle,
    description: site.seo.homeDescription,
    images: [site.seo.homeImage],
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={[personJsonLd(), organizationJsonLd(), websiteJsonLd()]} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
