import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0c0c14]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm font-bold">
            <span className="text-green">Toby</span> Sinclair
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-muted">
            Founder of{" "}
            <a href={site.realTalk} className="text-green hover:underline">
              Real Talk Studio
            </a>
            . Coach and trainer helping enterprises navigate the human side of AI — change,
            capability, and the conversations that make transformation real.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-muted">
          <p className="font-semibold text-white">Site</p>
          <Link href="/work-with-me" className="hover:text-white">
            Work with me
          </Link>
          <Link href="/blog" className="hover:text-white">
            Articles
          </Link>
          <Link href="/book-summaries" className="hover:text-white">
            Book summaries
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-muted">
          <p className="font-semibold text-white">Elsewhere</p>
          <a href={site.realTalk} className="hover:text-white">
            Real Talk Studio
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
            LinkedIn
          </a>
          <a href={site.social.twitter} target="_blank" rel="noreferrer" className="hover:text-white">
            Twitter
          </a>
          <a href={site.social.youtube} target="_blank" rel="noreferrer" className="hover:text-white">
            YouTube
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-ink-muted">
          © {new Date().getFullYear()} Toby Sinclair Coaching Limited. I participate in the Amazon Associates
          Programme.
        </p>
      </div>
    </footer>
  );
}
