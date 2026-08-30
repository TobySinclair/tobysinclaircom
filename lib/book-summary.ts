import { ideasAsClaims, splitBigIdeas, type BigIdea } from "./big-ideas";

export type BookSummary = {
  bookTitle: string
  author: string | null
  rating: number | null
  audience: string | null
  amazon: string | null
  isbn: string | null
  sameAs: string[]
};

export function isBookSummaryPost(input: { title: string; categories: string[] }) {
  return (
    input.categories.includes("book-summaries") || /book summary|\bsummary[:\s]/i.test(input.title)
  );
}

export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const PIPE_NOISE = /big ideas|best quotes|quotes|takeaway|insights|organizing|habits|fast flow|leadership playbook/i;

export function parseBookIdentity(title: string) {
  let work = title
    .replace(/^book summary:\s*/i, "")
    .replace(/^book summary\s*[-–—]\s*/i, "")
    .replace(/^summary:\s*/i, "")
    .trim();

  let author: string | null = null;

  const piped = work.match(/^(.+?)\s*\|\s*(.+)$/);
  if (piped) {
    if (!PIPE_NOISE.test(piped[2]) && piped[2].split(/\s+/).length <= 6) {
      work = piped[1].trim();
      author = piped[2].trim();
    } else {
      work = piped[1].trim();
    }
  }

  const dashed = work.match(/^(.+?)\s+summary\s+[-–—]\s+(.+)$/i);
  if (dashed) {
    work = dashed[1].trim();
    author = dashed[2].trim();
  }

  const byline = work.match(/^(.+?)\s+by\s+(.+)$/i);
  if (byline) {
    work = byline[1].trim();
    author = byline[2].replace(/\s+[-–—].+$/, "").trim();
  }

  work = work.replace(/\s+book summary$/i, "").replace(/\s+summary$/i, "").trim();
  author = author?.replace(/\s+/g, " ").trim() || null;

  return {
    bookTitle: work || title,
    author,
  };
}

function firstNumber(match: RegExpMatchArray | null) {
  if (!match?.[1]) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) && value >= 0 && value <= 10 ? value : null;
}

export function parseBookSummary(input: {
  title: string
  body: string
  rating?: unknown
  author?: unknown
  amazon?: unknown
  audience?: unknown
}): BookSummary {
  const identity = parseBookIdentity(input.title);
  const ratingMatch =
    input.body.match(/Toby'?s Rating[:\s]*([0-9]+(?:\.[0-9]+)?)\s*\/\s*10/i) ||
    input.body.match(/⭐[^\n]*Rating[:\s]*([0-9]+(?:\.[0-9]+)?)\s*\/\s*10/i) ||
    input.body.match(/\bRating[:\s]*([0-9]+(?:\.[0-9]+)?)\s*\/\s*10/i);
  const audienceMatch =
    input.body.match(/Recommended For:\s*([^\n*|]+)/i) ||
    input.body.match(/Recommended for:\s*([^\n*|]+)/i);
  const amazonMatch = input.body.match(/https?:\/\/(?:www\.)?(?:amzn\.to|amazon\.[a-z.]+)[^\s)"']*/i);
  const isbnMatch = input.body.match(/ISBN(?:-1[03])?[:\s]*([0-9X-]{10,17})/i);
  const sameAs = [
    input.body.match(/https?:\/\/(?:www\.)?goodreads\.com\/book\/show\/[^\s)"']+/i)?.[0],
    input.body.match(/https?:\/\/(?:en\.)?wikipedia\.org\/wiki\/[^\s)"']+/i)?.[0],
    input.body.match(/https?:\/\/books\.google\.[^\s)"']+/i)?.[0],
  ].filter((value): value is string => Boolean(value));

  const ratingFromData = input.rating != null ? Number(input.rating) : null;
  const author =
    (typeof input.author === "string" && input.author.trim()) || identity.author;

  return {
    bookTitle: identity.bookTitle,
    author: author || null,
    rating:
      ratingFromData != null && Number.isFinite(ratingFromData)
        ? ratingFromData
        : firstNumber(ratingMatch),
    audience:
      typeof input.audience === "string" && input.audience.trim()
        ? input.audience.trim()
        : audienceMatch?.[1]?.replace(/\s+/g, " ").trim() || null,
    amazon:
      typeof input.amazon === "string" && input.amazon.trim()
        ? input.amazon.trim()
        : amazonMatch?.[0] || null,
    isbn: compactIsbn(isbnMatch?.[1]),
    sameAs,
  };
}

function compactIsbn(value?: string) {
  if (!value) return null;
  const compact = value.replace(/-/g, "");
  return /^(?:[0-9]{9}[0-9X]|[0-9]{13})$/i.test(compact) ? compact.toUpperCase() : null;
}

export function cleanLeadText(text: string) {
  let next = text.replace(/\s+/g, " ").trim();
  const junk =
    /^(?:[✅🤖📹💡💬🛒📚⭐✏️*🤔]+|Toby'?s Takeaway|Exercises|Video|Big Ideas|Best Quotes|Buy on Amazon|Should You Read This(?: Book)?\??|Toby'?s Rating[:\s]*[0-9.]+\/10|Rating[:\s]*[0-9.]+\/10(?:\s*[-–—][^.]+)?|Recommended For:[^.]*|Buy\b.{0,90}(?:on Amazon)?|Read on Blinkist.{0,40})\s*/i;
  while (junk.test(next)) {
    next = next.replace(junk, "").trim();
  }
  return next;
}

export function firstSentence(text: string) {
  const clean = cleanLeadText(text);
  const match = clean.match(/^(.+?[.!?])(?:\s|$)/);
  return match?.[1] || clean;
}

export function bookSummaryVerdict(book: BookSummary, description: string) {
  const what = firstSentence(description) || `${book.bookTitle} is a book worth a working leader's time.`;
  const who = book.audience
    ? ` Best for ${book.audience.replace(/\.$/, "")}.`
    : " Written for practising leaders, not students of theory.";
  const rating =
    book.rating == null
      ? ""
      : book.rating >= 8
        ? ` Toby's rating: ${book.rating}/10 — read it.`
        : book.rating >= 6
          ? ` Toby's rating: ${book.rating}/10 — useful if this problem is on your desk.`
          : ` Toby's rating: ${book.rating}/10 — skim unless this is your exact problem.`;
  return `${what}${who}${rating}`;
}

export function bookSummaryHeadline(book: BookSummary) {
  return `${book.bookTitle}: book summary`;
}

function normalizeHeading(line: string) {
  const text = line
    .replace(/^#{2,3}\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/[📚💡💬✅📹🛒⭐👋]/g, "")
    .trim();

  if (/should you read/i.test(text)) return "## Should you read this?";
  if (/takeaway/i.test(text)) return "## Toby's takeaway";
  if (/big ideas/i.test(text) && !/expanded/i.test(text)) return "## 3 big ideas";
  if (/quotes|tweetable/i.test(text)) return "## Best quotes";
  if (/prefer video/i.test(text)) return "## Prefer video?";
  return `## ${text}`;
}

export function cleanBookSummaryBody(body: string, book: BookSummary) {
  let next = body;

  next = next.replace(/^(?!\d+\.\s)(?![-*+]\s)(?!\*\*Big Idea)(?!#{1,3}\s)[^\n]*#viewer-[^\n]*\n+/gim, "");
  next = next.replace(/^[^\n]*💡[^\n]*Big Ideas[^\n]*(Amazon|Takeaway)[^\n]*\n+/gim, "");
  next = next.replace(/\[!\[Toby Sinclair Book Summary Introduction\]\([^)]+\)\]\([^)]+\)\n*/gi, "");
  next = next.replace(/!\[Toby Sinclair Book Summary Introduction\]\([^)]+\)\n*/gi, "");
  next = next.replace(/^<?https?:\/\/(www\.)?linkedin\.com\/in\/tobysinclair\/?>?\s*$/gim, "");

  if (book.rating != null) {
    next = next.replace(/^\*\*[^*]*Rating:[^*]*\*\*\s*$/gim, "");
    next = next.replace(/^⭐[^\n]*Rating:[^\n]*$/gim, "");
    next = next.replace(/^Toby'?s Rating:[^\n]*$/gim, "");
    next = next.replace(/^\*\*Rating:\s*[0-9.]+\/10\*\*\s*$/gim, "");
    next = next.replace(/^Rating:\s*[0-9.]+\/10\s*$/gim, "");
  }

  next = next.replace(/^(#{2,3})[^\n]+$/gm, normalizeHeading);
  next = next.replace(/\n+## Prefer video\?\s*(?=\n+##|\s*$)/gi, "\n");
  next = next.replace(/\n{3,}/g, "\n\n").trim();
  return next;
}

export function bookSummaryHeadings(body: string) {
  const headings: { id: string; label: string }[] = [];
  for (const match of body.matchAll(/^##\s+(.+)$/gm)) {
    const label = match[1].replace(/\*\*/g, "").trim();
    if (/prefer video/i.test(label)) continue;
    if (/\bbig ideas\b/i.test(label) && !/expanded/i.test(label)) continue;
    headings.push({ id: headingId(label), label });
  }
  return headings;
}

type MarkdownSection = {
  heading: string | null
  content: string
  from: "before" | "after" | "body"
};

function splitMarkdownSections(markdown: string, from: MarkdownSection["from"]): MarkdownSection[] {
  const text = markdown.trim();
  if (!text) return [];

  const matches = [...text.matchAll(/^##[ \t]+.+$/gm)];
  if (!matches.length) return [{ heading: null, content: text, from }];

  const sections: MarkdownSection[] = [];
  const firstIndex = matches[0].index ?? 0;
  if (firstIndex > 0) {
    const preamble = text.slice(0, firstIndex).trim();
    if (preamble) sections.push({ heading: null, content: preamble, from });
  }

  for (let index = 0; index < matches.length; index += 1) {
    const headingLine = matches[index][0];
    const start = (matches[index].index ?? 0) + headingLine.length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? text.length) : text.length;
    sections.push({
      heading: headingLine.replace(/^##\s*/, "").trim(),
      content: text.slice(start, end).trim(),
      from,
    });
  }

  return sections;
}

function serializeSections(sections: MarkdownSection[]) {
  return sections
    .map((section) => {
      if (section.heading) {
        const body = section.content ? `\n\n${section.content}` : "";
        return `## ${section.heading}${body}`;
      }
      return section.content;
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function isTakeawayHeading(heading: string | null) {
  return Boolean(heading && /takeaway/i.test(heading));
}

function isShouldReadHeading(heading: string | null) {
  return Boolean(heading && /should you read/i.test(heading));
}

function isQuotesHeading(heading: string | null) {
  return Boolean(heading && /quotes|tweetable/i.test(heading));
}

function isCompactIdeasHeading(heading: string | null) {
  return Boolean(heading && /\bbig ideas\b/i.test(heading) && !/expanded/i.test(heading));
}

function stripCompactIdeasHeading(before: string) {
  const match = before.match(/^(##[^\n]*\bbig ideas\b[^\n]*)\n*/im);
  if (!match || match.index == null) return { rest: before.trim(), intro: "" };
  return {
    rest: before.slice(0, match.index).trim(),
    intro: before.slice(match.index + match[0].length).trim(),
  };
}

function orderCommentary(sections: MarkdownSection[]) {
  const takeaway: MarkdownSection[] = [];
  const shouldRead: MarkdownSection[] = [];
  const quotes: MarkdownSection[] = [];
  const rest: MarkdownSection[] = [];

  for (const section of sections) {
    if (isCompactIdeasHeading(section.heading)) continue;
    if (
      isTakeawayHeading(section.heading) ||
      (section.from === "before" && section.heading && !isShouldReadHeading(section.heading) && !isQuotesHeading(section.heading))
    ) {
      takeaway.push(section);
    } else if (isShouldReadHeading(section.heading)) {
      shouldRead.push(section);
    } else if (isQuotesHeading(section.heading)) {
      quotes.push(section);
    } else {
      rest.push(section);
    }
  }

  return serializeSections([...takeaway, ...shouldRead, ...rest, ...quotes]);
}

export function layoutBookSummary(body: string): {
  ideas: BigIdea[] | null
  ideasIntro: string
  commentary: string
} {
  const { before, ideas, after } = splitBigIdeas(body);
  if (!ideas) {
    return {
      ideas: null,
      ideasIntro: "",
      commentary: orderCommentary(splitMarkdownSections(body, "body")),
    };
  }

  const { rest, intro } = stripCompactIdeasHeading(before);
  const sections = [
    ...splitMarkdownSections(rest, "before"),
    ...splitMarkdownSections(after, "after"),
  ];

  return {
    ideas: ideasAsClaims(ideas),
    ideasIntro: intro,
    commentary: orderCommentary(sections),
  };
}

export function bookSummaryPageTitle(book: BookSummary) {
  const author = book.author ? ` by ${book.author}` : "";
  const rating = book.rating != null ? ` | ${book.rating}/10` : "";
  return `${book.bookTitle} Summary${author}${rating}`;
}

export function bookCitation(book: BookSummary) {
  return `Toby Sinclair, book summary of ${book.bookTitle}${book.author ? ` by ${book.author}` : ""}`;
}

export function bookSummaryFaqs(book: BookSummary, description: string) {
  const faqs = [
    {
      question: `Should I read ${book.bookTitle}?`,
      answer: bookSummaryVerdict(book, description),
    },
    {
      question: `Who is ${book.bookTitle} for?`,
      answer: book.audience
        ? `Recommended for ${book.audience.replace(/\.$/, "")}.`
        : "Practising leaders, coaches, and anyone doing the work — not students of theory.",
    },
  ];
  if (book.rating != null) {
    faqs.push({
      question: `What is Toby Sinclair's rating of ${book.bookTitle}?`,
      answer: `${book.rating} out of 10.`,
    });
  }
  return faqs;
}

export function bookSummaryDescription(description: string, book: BookSummary) {
  const bits = [
    book.rating != null ? `Toby's rating: ${book.rating}/10.` : null,
    book.audience ? `Recommended for ${book.audience}.` : null,
    cleanLeadText(description),
  ].filter(Boolean);
  return bits.join(" ");
}
