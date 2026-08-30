import type { Components } from "react-markdown"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { BigIdea } from "@/lib/big-ideas"

const bodyComponents: Components = {
  a: ({ href, children }) => {
    const external = href?.startsWith("http")
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {children}
      </a>
    )
  },
  img: () => null,
  h1: "p",
  h2: "p",
  h3: "p",
}

function IdeaBody({ content }: { content: string }) {
  if (!content.trim()) return null
  return (
    <div className="idea-body">
      <Markdown remarkPlugins={[remarkGfm]} components={bodyComponents}>
        {content}
      </Markdown>
    </div>
  )
}

export function BigIdeas({ ideas }: { ideas: BigIdea[] }) {
  return (
    <ol className="big-ideas">
      {ideas.map((idea, index) => (
        <li key={`${idea.title ?? idea.body.slice(0, 24)}-${index}`} className="big-idea">
          <span className="big-idea-number" aria-hidden="true">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            {idea.title ? <h3 className="big-idea-title">{idea.title}</h3> : null}
            <IdeaBody content={idea.body} />
          </div>
        </li>
      ))}
    </ol>
  )
}
