export type BookSummary = {
  bookTitle: string
  author: string | null
  rating: number | null
  audience: string | null
  amazon: string | null
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
    author = byline[2].trim();
  }

  work = work.replace(/\s+summary$/i, "").trim();
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

  const ratingFromData = input.rating != null ? Number(input.rating) : null;

  return {
    bookTitle: identity.bookTitle,
    author: typeof input.author === "string" && input.author.trim() ? input.author.trim() : identity.author,
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
  };
}

function normalizeHeading(line: string) {
  const text = line
    .replace(/^#{2,3}\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/[📚💡💬✅📹🛒⭐👋]/g, "")
    .trim();

  if (/should you read/i.test(text)) return "## Should you read this?";
  if (/takeaway/i.test(text)) return "## Toby's takeaway";
  if (/big ideas/i.test(text)) return "## 3 big ideas";
  if (/quotes|tweetable/i.test(text)) return "## Best quotes";
  if (/prefer video/i.test(text)) return "## Prefer video?";
  return `## ${text}`;
}

export function cleanBookSummaryBody(body: string, book: BookSummary) {
  let next = body;

  next = next.replace(/^[^\n]*#viewer-[^\n]*\n+/gim, "");
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
    headings.push({ id: headingId(label), label });
  }
  return headings;
}

export function bookSummaryPageTitle(book: BookSummary) {
  const author = book.author ? ` by ${book.author}` : "";
  const rating = book.rating != null ? ` | ${book.rating}/10` : "";
  return `${book.bookTitle} Summary${author}${rating}`;
}

export function bookSummaryDescription(description: string, book: BookSummary) {
  const bits = [
    book.rating != null ? `Toby's rating: ${book.rating}/10.` : null,
    book.audience ? `Recommended for ${book.audience}.` : null,
    description,
  ].filter(Boolean);
  return bits.join(" ");
}
