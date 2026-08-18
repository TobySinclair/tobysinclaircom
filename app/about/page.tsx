import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { RtsCta } from "@/components/rts-cta";
import { breadcrumbJsonLd, pageMetadata, personJsonLd, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.seo.aboutTitle,
  description: site.seo.aboutDescription,
  path: "/about",
  image: site.seo.aboutImage,
});

const chapters = [
  {
    title: "My Guiding Principle",
    body: "If you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done. I first read Atomic Habits in 2018. It articulated many of my personal values: growth, learning, experimentation. In helping people change I've found that small shifts in behaviour often lead to remarkable results.",
  },
  {
    title: "In The Beginning",
    body: "I began my professional career in 2007. Upon joining my first company, I was given The 7 Habits of Highly Effective People. I still have this copy today. It was the first leadership book I'd ever read. It opened my eyes to the many aspects of performance development and started my journey to become a better leader.",
  },
  {
    title: "The First 7 Years",
    body: "I started my career as a software tester. I was an outsider doing a job people felt could be automated away. I had to learn how to clearly articulate the value of testing. Agile Testing helped me do that. The most helpful skill I still use today: how to be curious.",
  },
  {
    title: "Dreams of a Rock Star",
    body: "Growing up I always wanted to be in a band. I remember watching Glastonbury Festival on TV, dreaming of headlining the pyramid stage. I came close when I performed at the Park Stage in 2019.",
  },
  {
    title: "Becoming More Productive",
    body: "I've always had an entrepreneurial streak. I loved reading about Tim Ferriss's journey in setting up a business, and how he learned the habits and tactics to preserve his most precious resource: time.",
  },
  {
    title: "Going Professional",
    body: "In 2016 I started working as an Agile Coach. I came to a big realisation: what I thought was coaching was really mentoring. Training with Barefoot Coaching opened my eyes to unlocking high performance. I'm now an ICF Professional Certified Coach.",
  },
  {
    title: "Real Talk Studio",
    body: "That work became a company. Real Talk Studio is where teams rehearse the conversations that carry legal, commercial, and human weight — before they happen for real. This site is where I publish the thinking behind it.",
  },
];

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: site.seo.aboutTitle,
            description: site.seo.aboutDescription,
            path: "/about",
            type: "AboutPage",
            image: site.seo.aboutImage,
          }),
          personJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <p className="eyebrow mt-6">About</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">My Story</h1>
      <p className="mt-5 text-lg leading-8 text-ink-muted">
        I help leaders become more coach-like — and I founded the company that grew out of that work. Here is the
        path, told through seven books.
      </p>
      <div className="mt-12 space-y-10">
        {chapters.map((chapter) => (
          <section key={chapter.title}>
            <h2 className="text-2xl font-bold tracking-tight">{chapter.title}</h2>
            <p className="mt-3 text-lg leading-8 text-ink-muted">{chapter.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm">
        <Link href="/book-summaries" className="font-semibold text-green hover:underline">
          Read the book summaries →
        </Link>
      </p>
      <div className="mt-14">
        <RtsCta />
      </div>
    </article>
  );
}
