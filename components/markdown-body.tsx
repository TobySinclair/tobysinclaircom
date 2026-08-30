import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArticleToc, type TocItem } from "@/components/article-toc";
import { BigIdeas } from "@/components/big-ideas";
import { GuideFigure } from "@/components/guide-figure";
import { splitBigIdeas } from "@/lib/big-ideas";
import { headingId } from "@/lib/book-summary";

function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function isImplementText(text: string) {
  return /^how to implement this\b/i.test(text.trim());
}

function childArray(children: ReactNode): ReactNode[] {
  return Array.isArray(children) ? children : children == null ? [] : [children];
}

const TOC_BLOCK =
  /^## Table of contents\s*\n+((?:\d+\.\s+\[[^\]]+\]\([^)]+\)\s*\n?)+)/im;

const FIGURE_RE = /!\[([^\]]*)\]\(\/figures\/([^)\s]+)\)/g;

function parseTocItems(block: string): TocItem[] {
  return [...block.matchAll(/\d+\.\s+\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({
    label: match[1],
    href: match[2],
  }));
}

function splitToc(content: string) {
  const match = content.match(TOC_BLOCK);
  if (!match || match.index == null) return null;
  return {
    before: content.slice(0, match.index).trim(),
    items: parseTocItems(match[1]),
    after: content.slice(match.index + match[0].length).trim(),
  };
}

type ContentPart =
  | { type: "md"; text: string }
  | { type: "figure"; name: string; alt: string };

function splitFigures(content: string): ContentPart[] {
  const parts: ContentPart[] = [];
  let lastIndex = 0;
  for (const match of content.matchAll(FIGURE_RE)) {
    if (match.index == null) continue;
    const before = content.slice(lastIndex, match.index).trim();
    if (before) parts.push({ type: "md", text: before });
    parts.push({ type: "figure", name: match[2].replace(/\/$/, ""), alt: match[1] });
    lastIndex = match.index + match[0].length;
  }
  const after = content.slice(lastIndex).trim();
  if (after) parts.push({ type: "md", text: after });
  return parts;
}

const components: Components = {
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt || ""} className="my-6 w-full rounded-xl" />
    );
  },
  h2: ({ children }) => {
    const label = nodeText(children);
    return <h2 id={headingId(label)}>{children}</h2>;
  },
  h3: ({ children }) => {
    const label = nodeText(children);
    return <h3 id={headingId(label)}>{children}</h3>;
  },
  blockquote: ({ children }) => {
    const text = nodeText(children);
    if (!isImplementText(text)) return <blockquote>{children}</blockquote>;

    const items = childArray(children).filter((child) => {
      if (child == null || child === false) return false;
      return !(typeof child === "string" && !child.trim());
    });
    const labelIndex = items.findIndex((child) => /^how to implement this\.?$/i.test(nodeText(child).trim()));
    const body = labelIndex >= 0 ? items.slice(labelIndex + 1) : items;

    return (
      <aside className="implement-callout">
        <p className="eyebrow">How to implement this</p>
        <div className="implement-callout-body">{body}</div>
      </aside>
    );
  },
};

export function MarkdownBody({
  content,
  skipIdeas = false,
  skipToc = false,
  skipFigures = false,
}: {
  content: string;
  skipIdeas?: boolean;
  skipToc?: boolean;
  skipFigures?: boolean;
}) {
  if (!content.trim()) return null;

  if (!skipToc) {
    const toc = splitToc(content);
    if (toc) {
      return (
        <>
          {toc.before ? <MarkdownBody content={toc.before} skipIdeas skipToc skipFigures /> : null}
          <ArticleToc items={toc.items} />
          {toc.after ? <MarkdownBody content={toc.after} skipIdeas={skipIdeas} skipToc skipFigures={skipFigures} /> : null}
        </>
      );
    }
  }

  if (!skipFigures) {
    const parts = splitFigures(content);
    if (parts.some((part) => part.type === "figure")) {
      return (
        <>
          {parts.map((part, index) =>
            part.type === "figure" ? (
              <GuideFigure key={`${part.name}-${index}`} name={part.name} alt={part.alt} />
            ) : (
              <MarkdownBody
                key={`md-${index}`}
                content={part.text}
                skipIdeas={skipIdeas}
                skipToc
                skipFigures
              />
            ),
          )}
        </>
      );
    }
  }

  if (!skipIdeas) {
    const { before, ideas, after } = splitBigIdeas(content);
    if (ideas) {
      return (
        <>
          <MarkdownBody content={before} skipIdeas skipToc skipFigures />
          <BigIdeas ideas={ideas} />
          <MarkdownBody content={after} skipIdeas skipToc skipFigures />
        </>
      );
    }
  }

  return (
    <div className="prose">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
}
