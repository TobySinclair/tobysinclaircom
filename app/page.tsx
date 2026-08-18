import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { RtsCover } from "@/components/rts-cover";
import { getAllPosts, getBookSummaries } from "@/lib/content";
import { isRtsPost } from "@/lib/rts-cover";
import { pageMetadata, personJsonLd, webPageJsonLd } from "@/lib/seo";
import { categoryLabel, formatDate, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.seo.homeTitle,
  description: site.seo.homeDescription,
  path: "/",
  image: site.seo.homeImage,
  absoluteTitle: true,
});

const pillars = [
  {
    index: "01",
    href: "/blog/categories/coaching",
    label: "Coaching",
    body: "Listening, asking, and helping people find their own next move — rather than adding another layer of advice.",
  },
  {
    index: "02",
    href: "/blog/categories/leadership",
    label: "Leadership",
    body: "How senior managers build cultures people want to be part of, and the habits that make that possible.",
  },
  {
    index: "03",
    href: "/blog/categories/real-talk-studio",
    label: "Hard conversations",
    body: "Feedback, conflict, and the discussions teams postpone until they become expensive.",
  },
];

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const latest = posts.slice(1, 5);
  const summaries = getBookSummaries();
  const featuredSummaries = summaries.slice(0, 5);

  return (
    <div>
      <JsonLd
        data={[
          webPageJsonLd({
            name: site.seo.homeTitle,
            description: site.seo.homeDescription,
            path: "/",
            type: "ProfilePage",
            image: site.seo.homeImage,
          }),
          personJsonLd(),
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-0 h-[480px] w-[480px] glow-cyan opacity-80" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[360px] w-[360px] glow-green opacity-60" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-12 md:py-20 lg:min-h-[calc(100vh-4.25rem)] lg:gap-16">
          <div className="relative order-2 mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_0_80px_rgba(0,255,136,0.08)] md:order-1 md:mx-0 md:max-w-none md:h-[560px] md:aspect-auto lg:h-[68vh]">
            <Image
              src="/toby.png"
              alt="Toby Sinclair, founder of Real Talk Studio"
              fill
              priority
              sizes="(min-width: 768px) 40vw, 280px"
              className="object-cover object-left"
            />
          </div>
          <div className="order-1 max-w-xl md:order-2 md:justify-self-end">
            <p className="eyebrow">ICF Professional Certified Coach</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.05]">
              Helping leaders become more <span className="gradient-text">coach-like</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/70">
              I work with senior managers on coaching, personal development, and the conversations that shape a team.
              The essays are here. I founded{" "}
              <a href={site.realTalk} className="text-green hover:underline">
                Real Talk Studio
              </a>{" "}
              so those ideas can be practised, not only discussed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/blog" className="btn-primary">
                Browse articles
              </Link>
              <Link href="/about" className="btn-secondary">
                About Toby
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 glow-green opacity-40" />
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Focus</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">The work I publish about</h2>
          </div>
          <div className="mt-14 grid gap-0 border-t border-white/10 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="group border-white/10 px-0 py-10 transition-colors md:border-l md:px-8 first:md:border-l-0 first:md:pl-0"
              >
                <p className="font-mono text-xs text-cyan">{pillar.index}</p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight group-hover:text-green">{pillar.label}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-ink-muted">{pillar.body}</p>
                <p className="mt-6 text-sm font-semibold text-green opacity-0 transition-opacity group-hover:opacity-100">
                  View articles →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Essays</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Latest articles</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-green hover:underline">
              All articles
            </Link>
          </div>

          {featured ? (
            <article className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <Link
                href={`/post/${featured.slug}`}
                aria-label={featured.title}
                className="relative block overflow-hidden rounded-3xl border border-white/10"
              >
                {isRtsPost(featured) ? (
                  <RtsCover post={featured} size="lg" className="aspect-[16/9] w-full" />
                ) : featured.image ? (
                  <CoverImage
                    src={featured.image}
                    alt={featured.title}
                    width={1400}
                    height={788}
                    className="aspect-[16/9] w-full object-cover"
                  />
                ) : null}
              </Link>
              <div className="pb-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {featured.published ? <time dateTime={featured.published}>{formatDate(featured.published)}</time> : null}
                  {featured.categories[0] ? (
                    <span className="text-green">{categoryLabel(featured.categories[0])}</span>
                  ) : null}
                  {featured.readingTime ? <span>{featured.readingTime}</span> : null}
                </div>
                <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                  <Link href={`/post/${featured.slug}`} className="hover:text-green">
                    {featured.title}
                  </Link>
                </h3>
                {featured.description ? (
                  <p className="mt-5 text-base leading-8 text-ink-muted line-clamp-4">{featured.description}</p>
                ) : null}
                <Link
                  href={`/post/${featured.slug}`}
                  className="mt-6 inline-block text-sm font-semibold text-green hover:underline"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ) : null}

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0c0c14]">
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Reading</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Book summaries for leaders</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-ink-muted">
              The ideas I return to: coaching, culture, and how people actually change. Short notes, written from the
              seat of a practising leader.
            </p>
            <Link
              href="/book-summaries"
              className="mt-8 inline-block text-sm font-semibold text-green hover:underline"
            >
              Browse the library →
            </Link>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {featuredSummaries.map((post, index) => (
              <Link key={post.slug} href={`/post/${post.slug}`} className="group flex gap-6 py-6 hover:bg-white/[0.03]">
                <span className="w-8 shrink-0 font-mono text-sm text-cyan/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-semibold tracking-tight group-hover:text-green">{post.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-ink-muted line-clamp-2">{post.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 glow-green" />
        <div className="pointer-events-none absolute -right-10 top-0 h-80 w-80 glow-cyan" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 px-8 py-12 md:px-14 md:py-16">
            <p className="eyebrow">Company</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.1]">
              Real Talk Studio
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-muted">
              The company I founded. Teams use it to rehearse feedback, conflict, and other conversations that matter —
              before they happen for real.
            </p>
            <a href={site.realTalk} className="btn-primary mt-8">
              Visit Real Talk Studio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
