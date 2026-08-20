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

const credibility = [
  {
    title: "Founder, Real Talk Studio",
    body: "An AI simulation platform used by enterprises to build real conversational competence",
  },
  {
    title: "ICF Professional Certified Coach",
    body: "A decade helping senior managers lead change people actually follow",
  },
  {
    title: "Ex-JP Morgan",
    body: "Ten years in financial trading, so I know what regulated, high-stakes environments demand",
  },
];

const offers = [
  {
    index: "01",
    title: "AI Enablement Training",
    body: "Hands-on workshops that take teams from “we should use AI” to actually using it well. Practical, tool-agnostic, and grounded in real workflows — identifying use cases, building judgement about what AI should and shouldn't do, and making adoption a habit rather than a mandate.",
    audience: "For: leadership teams, functions rolling out AI, L&D leaders who need more than a webinar.",
    cta: "Book a training conversation →",
    href: "/work-with-me#training",
  },
  {
    index: "02",
    title: "Coaching Through AI Change",
    body: "One-to-one and team coaching for leaders navigating AI transformation. The same coaching craft I've practised for a decade, pointed at the hardest change most leaders will face: role anxiety, resistance, restructuring conversations, and leading teams whose work is being redrawn.",
    audience: "For: senior managers, exec teams, and the people carrying the change.",
    cta: "Explore coaching →",
    href: "/work-with-me#coaching",
  },
  {
    index: "03",
    title: "Real Talk Studio",
    body: "My company. Teams rehearse feedback, conflict, and high-stakes conversations with AI — before they happen for real. It's also my daily proof: I don't advise on AI from the sidelines, I build with it, sell it, and live its limits.",
    audience: "For: organisations that need verified conversational competence at scale.",
    cta: "Visit Real Talk Studio →",
    href: site.realTalk,
  },
];

const pillars = [
  {
    index: "01",
    href: "/book-summaries/ai",
    label: "The Human Side of AI",
    body: "Adoption, change, and what happens to people when the tools change faster than the culture.",
  },
  {
    index: "02",
    href: "/book-summaries/leadership",
    label: "Leadership",
    body: "How senior managers build cultures people want to be part of — especially under transformation.",
  },
  {
    index: "03",
    href: "/book-summaries/hard-conversations",
    label: "Hard Conversations",
    body: "Feedback, conflict, and the discussions teams postpone until they become expensive. (AI has added a few new ones.)",
  },
];

const gapSignals = [
  { status: "Done", label: "They bought the licences." },
  { status: "Done", label: "They ran the town hall." },
  { status: "Missing", label: "They still have teams quietly not using it — or using it badly." },
];

const moreEngagements = [
  "Trained recruitment teams to use Claude through a DEI lens ahead of a major hiring drive",
  "Embedded AI practice into a live leadership programme so managers rehearse hard conversations, not just discuss them",
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
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-14 md:py-24">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_80px_rgba(0,255,136,0.08)] md:mx-0 md:max-w-[280px]">
            <Image
              src="/toby.png"
              alt="Toby Sinclair, founder of Real Talk Studio"
              fill
              priority
              sizes="(min-width: 768px) 280px, 200px"
              className="object-cover object-left"
            />
          </div>
          <div>
            <p className="eyebrow">
              Toby Sinclair · ICF Professional Certified Coach · Founder, Real Talk Studio
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl md:leading-[1.1] lg:text-6xl">
              Solving ancient problems{" "}
              <span className="gradient-text">with modern technology.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/70">
              I help enterprises with the human side of AI — the change management, the coaching, the
              conversations nobody scheduled. I&apos;m not a consultant who read about AI. I build an AI
              company every day, and I&apos;ve spent a decade coaching the leaders who have to make change
              stick.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/work-with-me" className="btn-primary">
                Work with me →
              </Link>
              <a href={site.realTalk} className="btn-secondary">
                See Real Talk Studio
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0c0c14]">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-12 md:grid-cols-3 md:py-14">
          {credibility.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-black/50 p-6">
              <p className="font-semibold tracking-tight">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute -left-16 bottom-0 h-80 w-80 glow-green opacity-40" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="/ai-people-gap.png"
                alt="An empty office after the AI town hall — the tools are there, the people aren't using them"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
            <div>
              <p className="eyebrow">The gap</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl md:leading-[1.15]">
                Every company is “doing AI.” Few are ready for what it does to people.
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink-muted">
                The gap isn&apos;t technical. It&apos;s human: fear, identity, skill, trust, and managers
                who&apos;ve never had to lead a change like this. That&apos;s the gap I work in.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {gapSignals.map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border p-6 ${
                  item.status === "Missing"
                    ? "border-green/30 bg-green/[0.06]"
                    : "border-white/10 bg-[#0c0c14]"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                    item.status === "Missing" ? "text-green" : "text-ink-muted"
                  }`}
                >
                  {item.status}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-i-help" className="border-t border-white/10 bg-[#0c0c14]">
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <p className="eyebrow">How I help</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Training, coaching, and the product that proves I do the work
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {offers.map((offer) => (
              <article
                key={offer.title}
                className="flex flex-col rounded-[1.5rem] border border-white/10 bg-black/50 p-6 md:p-8"
              >
                <p className="font-mono text-xs text-cyan">{offer.index}</p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">{offer.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-muted">{offer.body}</p>
                <p className="mt-5 text-sm italic leading-6 text-white/60">{offer.audience}</p>
                <a
                  href={offer.href}
                  className="mt-6 inline-block text-sm font-semibold text-green hover:underline"
                >
                  {offer.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 glow-cyan opacity-50" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 glow-green opacity-40" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24">
          <p className="eyebrow">Why me</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl md:leading-[1.15]">
                Most AI advisors have never built with it. Most builders have never coached people through
                change.
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-8 text-ink-muted">
                <p>I&apos;ve done both, at the same time, for years.</p>
                <p>
                  Every day I run an AI company — designing with large language models, shipping product,
                  watching where AI genuinely helps and where it quietly fails. Every week I coach leaders
                  through the human consequences: the fear, the scepticism, the skills gap, the conversations
                  they&apos;re avoiding.
                </p>
                <p>
                  That combination is the point. When I train your team on AI, it&apos;s informed by building a
                  real product. When I coach your leaders through the change, it&apos;s informed by twenty years
                  inside demanding organisations — from JP Morgan trading floors to enterprise boardrooms.
                </p>
              </div>
            </div>
            <blockquote className="rounded-[2rem] border border-white/10 bg-black/50 p-8 md:p-10">
              <p className="text-2xl font-bold tracking-tight text-white md:text-3xl md:leading-[1.2]">
                You don&apos;t need another AI keynote. You need someone who can sit with your people and make
                it real.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0c0c14]">
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <p className="eyebrow">What working with me looks like</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Proof, not a keynote</h2>

          <article
            id="wpp"
            className="mt-14 grid scroll-mt-28 gap-10 rounded-[2rem] border border-white/10 bg-black/40 p-8 md:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start"
          >
            <div>
              <div className="inline-flex items-center rounded-xl bg-white px-4 py-2.5">
                <Image
                  src="/wpp-logo.png"
                  alt="WPP"
                  width={262}
                  height={148}
                  className="h-9 w-auto"
                />
              </div>
              <p className="eyebrow mt-6">Case study</p>
              <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl md:leading-[1.15]">
                Helping WPP&apos;s HR and talent leaders get in front of AI — not behind it.
              </h3>
              <p className="mt-5 text-base leading-8 text-ink-muted">
                One of the world&apos;s largest advertising and communications companies. WPP&apos;s people
                teams face the same question every HR function does right now: will AI happen{" "}
                <em>to</em> us, or <em>through</em> us?
              </p>
              <p className="mt-5 text-base leading-8 text-ink-muted">
                I ran a working session with their HR and talent leaders built around one shift: HR as
                leaders of AI adoption, not passengers. Together we got hands-on with AI across the work
                they actually do —
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-ink-muted">
                <li>
                  <span className="font-semibold text-white">Recruitment</span> — where AI sharpens
                  sourcing, screening and candidate experience (and where human judgement must stay in the
                  loop)
                </li>
                <li>
                  <span className="font-semibold text-white">Employee engagement</span> — using AI to listen
                  at scale and act faster on what people are telling you
                </li>
                <li>
                  <span className="font-semibold text-white">Data, analysis & reporting</span> — turning the
                  people-data HR already owns into insight leaders act on
                </li>
              </ul>
              <p className="mt-6 text-base leading-8 text-ink-muted">
                The reframe that landed hardest: AI in HR isn&apos;t a cost-saving exercise. It&apos;s an
                opportunity engine — for the function&apos;s credibility, for the employee experience, and
                for HR&apos;s seat at the transformation table.
              </p>
              <a
                href={site.calendly}
                className="mt-8 inline-block text-sm font-semibold text-green hover:underline"
              >
                Book a session like this →
              </a>
            </div>
            <blockquote className="rounded-[1.5rem] border border-green/25 bg-green/[0.06] p-8">
              <p className="text-3xl font-bold tracking-tight text-white md:text-4xl md:leading-[1.15]">
                “Leaders of AI adoption — not falling behind it”
              </p>
            </blockquote>
          </article>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {moreEngagements.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-base leading-7 text-ink-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 glow-green opacity-40" />
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Essays</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">The work I publish about</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="group rounded-[1.5rem] border border-white/10 bg-[#0c0c14] p-6 transition-colors hover:border-green/40 md:p-8"
              >
                <p className="font-mono text-xs text-cyan">{pillar.index}</p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight group-hover:text-green">
                  {pillar.label}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-ink-muted">{pillar.body}</p>
                <p className="mt-6 text-sm font-semibold text-green">View articles →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-24">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Latest</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Recent articles</h2>
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
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredSummaries.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40"
              >
                {post.image ? (
                  <CoverImage
                    src={post.image}
                    alt={post.title}
                    width={640}
                    height={360}
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : null}
                <span className="block p-4">
                  <span className="block font-semibold tracking-tight group-hover:text-green">{post.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
