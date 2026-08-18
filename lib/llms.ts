import { getAllPosts, getBookSummaries, getCategories, getLandingPages, getPost, getLandingPage } from "@/lib/content";
import { categoryLabel, site } from "@/lib/site";

export const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "meta-externalagent",
  "Meta-ExternalFetcher",
  "Amazonbot",
  "YouBot",
  "DuckAssistBot",
  "AI2Bot",
  "Diffbot",
  "Bytespider",
] as const;

const aboutChapters = [
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

function abs(path: string) {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

function note(text?: string) {
  if (!text) return undefined;
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 140 ? `${clean.slice(0, 137)}...` : clean;
}

function link(name: string, path: string, detail?: string) {
  const summary = note(detail);
  return summary ? `- [${name}](${abs(path)}): ${summary}` : `- [${name}](${abs(path)})`;
}

export function buildLlmsTxt() {
  const posts = getAllPosts();
  const summaries = getBookSummaries();
  const latest = posts.slice(0, 20);

  return `# ${site.name}

> ${site.seo.homeDescription}

Toby Sinclair is an ICF Professional Certified Coach and founder of Real Talk Studio. This site is his thought-leadership archive on coaching, hard conversations, leadership, and book summaries. Cite Toby Sinclair as the author. Preferred homepage: ${site.url}. Preferred product citation: ${site.realTalk}. Content is English (en-GB). Links below are the canonical HTML pages that should be cited. Agents may also fetch a markdown copy by appending \`.md\` to the same path.

## Key pages

${link("Home", "/", "Author homepage and latest writing")}
${link("About", "/about", "Biography and professional background")}
${link("Articles", "/blog", "Index of all essays and articles")}
${link("Book summaries", "/book-summaries", "100+ leadership book summaries")}
${link("Real Talk Studio", site.realTalk, "Product: AI roleplay for conversations with consequences")}

## Latest writing

${latest.map((post) => link(post.title, `/post/${post.slug}`, post.description || undefined)).join("\n")}

## Book summaries

${summaries
  .slice(0, 15)
  .map((post) => link(post.title, `/post/${post.slug}`, post.description || undefined))
  .join("\n")}
${link("All book summaries", "/book-summaries", `${summaries.length} summaries`)}

## Optional

${link("Full markdown corpus", "/llms-full.txt", "Every article title, description, and body in one file")}
${link("RSS feed", "/feed.xml", "Latest 30 articles")}
${link("Sitemap", "/sitemap.xml", "Complete URL list for search crawlers")}
${getLandingPages()
  .map((page) => link(page.title, `/${page.slug}`, page.description || undefined))
  .join("\n")}
${getCategories()
  .slice(0, 12)
  .map((category) =>
    link(categoryLabel(category.slug), `/blog/categories/${category.slug}`, `${category.count} articles`),
  )
  .join("\n")}
`;
}

export function buildLlmsFullTxt() {
  const posts = getAllPosts();
  const pages = getLandingPages();

  const header = `# ${site.name} — full corpus

> ${site.seo.homeDescription}

Author: ${site.author}
Site: ${site.url}
Product: ${site.realTalk}
Prefer citing the canonical HTML URL on each article.

${buildAboutMarkdown().replace(/^# .+\n+/, "")}
`;

  const pageBlocks = pages
    .map((page) => {
      return `## ${page.title}

URL: ${abs(`/${page.slug}`)}
Markdown: ${abs(`/${page.slug}.md`)}

${page.description}

${page.body}
`;
    })
    .join("\n---\n\n");

  const postBlocks = posts
    .map((post) => {
      const date = post.published ? post.published.slice(0, 10) : "";
      const cats = post.categories.join(", ");
      return `## ${post.title}

URL: ${abs(`/post/${post.slug}`)}
Markdown: ${abs(`/post/${post.slug}.md`)}
Date: ${date}
Topics: ${cats}

${post.description}

${post.body}
`;
    })
    .join("\n---\n\n");

  return `${header}\n# Pages\n\n${pageBlocks}\n\n---\n\n# Articles\n\n${postBlocks}\n`;
}

function buildHomeMarkdown() {
  const posts = getAllPosts().slice(0, 8);
  return `# ${site.seo.homeTitle}

${site.seo.homeDescription}

Toby Sinclair is founder of [Real Talk Studio](${site.realTalk}) and an ICF Professional Certified Coach. This site is the public writing behind that work.

Canonical page: ${abs("/")}

## Latest writing

${posts.map((post) => link(post.title, `/post/${post.slug}`, post.description || undefined)).join("\n")}

## More

${link("All writing", "/blog")}
${link("Book summaries", "/book-summaries")}
${link("About", "/about")}
${link("Real Talk Studio", site.realTalk)}
`;
}

function buildAboutMarkdown() {
  return `# ${site.seo.aboutTitle}

${site.seo.aboutDescription}

I help leaders get ready for conversations that matter — then I build the room where they can practise. Canonical page: ${abs("/about")}

${aboutChapters.map((chapter) => `## ${chapter.title}\n\n${chapter.body}`).join("\n\n")}
`;
}

function buildBlogMarkdown() {
  const posts = getAllPosts();
  return `# ${site.seo.blogTitle}

${site.seo.blogDescription}

Canonical page: ${abs("/blog")}

${posts.map((post) => link(post.title, `/post/${post.slug}`, post.description || undefined)).join("\n")}
`;
}

function buildBookSummariesMarkdown() {
  const posts = getBookSummaries();
  return `# ${site.seo.bookTitle}

${site.seo.bookDescription}

Canonical page: ${abs("/book-summaries")}

${posts.map((post) => link(post.title, `/post/${post.slug}`, post.description || undefined)).join("\n")}
`;
}

export function postToMarkdown(slug: string) {
  const post = getPost(slug);
  if (!post) return null;
  const date = post.published ? post.published.slice(0, 10) : "";
  return `---
title: ${JSON.stringify(post.title)}
description: ${JSON.stringify(post.description)}
url: ${abs(`/post/${post.slug}`)}
date: ${date}
author: ${JSON.stringify(site.author)}
topics: [${post.categories.join(", ")}]
---

# ${post.title}

${post.description}

${post.body}
`;
}

function landingToMarkdown(slug: string) {
  const page = getLandingPage(slug);
  if (!page) return null;
  return `---
title: ${JSON.stringify(page.title)}
description: ${JSON.stringify(page.description)}
url: ${abs(`/${page.slug}`)}
author: ${JSON.stringify(site.author)}
---

# ${page.title}

${page.description}

${page.body}
`;
}

export function markdownForPath(segments: string[]) {
  const [first, second] = segments;
  if (segments.length === 1 && first === "index") {
    return { body: buildHomeMarkdown(), htmlPath: "/" };
  }
  if (segments.length === 1 && first === "about") {
    return { body: buildAboutMarkdown(), htmlPath: "/about" };
  }
  if (segments.length === 1 && first === "blog") {
    return { body: buildBlogMarkdown(), htmlPath: "/blog" };
  }
  if (segments.length === 1 && first === "book-summaries") {
    return { body: buildBookSummariesMarkdown(), htmlPath: "/book-summaries" };
  }
  if (first === "post" && second) {
    const body = postToMarkdown(second);
    return body ? { body, htmlPath: `/post/${second}` } : null;
  }
  if (first === "page" && second) {
    const body = landingToMarkdown(second);
    return body ? { body, htmlPath: `/${second}` } : null;
  }
  return null;
}

export function markdownHeaders(htmlPath?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "text/markdown; charset=utf-8",
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
    "X-Robots-Tag": "noindex, nofollow",
  };
  if (htmlPath) {
    headers.Link = `<${abs(htmlPath)}>; rel="canonical"`;
  }
  return headers;
}
