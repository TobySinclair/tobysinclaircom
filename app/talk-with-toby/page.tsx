import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, personJsonLd, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.seo.talkTitle,
  description: site.seo.talkDescription,
  path: "/talk-with-toby",
});

export default function TalkWithTobyPage() {
  return (
    <div data-page="talk-with-toby" className="flex min-h-[calc(100dvh-4.25rem)] flex-col">
      <JsonLd
        data={[
          webPageJsonLd({
            name: site.seo.talkTitle,
            description: site.seo.talkDescription,
            path: "/talk-with-toby",
          }),
          personJsonLd(),
        ]}
      />
      <h1 className="sr-only">Talk with Toby</h1>
      <iframe
        src={site.talkWithTobyEmbed}
        title="Talk with Toby on Real Talk Studio"
        className="min-h-[calc(100dvh-4.25rem)] w-full flex-1 border-0 bg-black"
        allow="microphone; camera; autoplay; clipboard-write; fullscreen"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
