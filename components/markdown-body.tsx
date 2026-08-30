import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BigIdeas } from "@/components/big-ideas";
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
};

export function MarkdownBody({
  content,
  skipIdeas = false,
}: {
  content: string;
  skipIdeas?: boolean;
}) {
  if (!content.trim()) return null;

  if (!skipIdeas) {
    const { before, ideas, after } = splitBigIdeas(content);
    if (ideas) {
      return (
        <>
          <MarkdownBody content={before} skipIdeas />
          <BigIdeas ideas={ideas} />
          <MarkdownBody content={after} skipIdeas />
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
