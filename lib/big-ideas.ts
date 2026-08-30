export type BigIdea = {
  title: string | null
  body: string
}

type ParsedSection = {
  intro: string
  ideas: BigIdea[]
  outro: string
}

function validCount(count: number) {
  return count >= 2 && count <= 8
}

const TERMINAL_HEADING =
  /quotes|tweetable|takeaway|prefer video|turn this (?:book|knowledge)|should you read|\bfaq\b|\bquestions\b/i

function headingText(line: string) {
  return line.replace(/^#+\s*/, "").replace(/\*\*/g, "").trim()
}

function isBigIdeasHeading(line: string) {
  const text = headingText(line)
  if (/expanded|summarised|summarized/i.test(text)) return false
  if (/\]\(#/.test(line)) return false
  return /\b(?:\d+\s+)?big ideas\b/i.test(text)
}

function isIdeaSubheading(line: string) {
  return /^#{2,3}\s*Big Idea\s+\d+/i.test(line.replace(/\*\*/g, ""))
}

function isTerminalHeading(line: string) {
  return TERMINAL_HEADING.test(headingText(line))
}

function peelTrailing(text: string): { body: string; trailing: string } {
  const chunks: string[] = []
  let body = text.trim()
  const trailing =
    /\n\n((?:\[?!?\[[^\]]*\]\([^)]+\)\]\([^)]+\)|!?\[[^\]]*\]\([^)]+\)|\[[^\]]*Buy[^\]]*\]\([^)]+\))\s*)$/i

  while (true) {
    const match = body.match(trailing)
    if (!match || match.index == null) break
    chunks.unshift(match[1].trim())
    body = body.slice(0, match.index).trim()
  }

  return { body, trailing: chunks.join("\n\n") }
}

function unwrapViewerLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(#viewer-[^)]+\)/g, "$1")
}

function splitTitleBody(text: string): BigIdea {
  const match = text.match(/^\*\*(.+?)\*\*\s*[:–—-]\s+([\s\S]+)$/)
  if (match) return { title: match[1].trim(), body: match[2].trim() }
  return { title: null, body: text.trim() }
}

export function parseIdeaItem(raw: string): BigIdea {
  const text = raw.trim()
  let idea: BigIdea

  let match = text.match(/^#{2,3}\s*Big Idea\s+\d+\s*[-–—:]\s*(.+?)\s*(?:\n+)([\s\S]*)$/i)
  if (match) {
    idea = { title: match[1].replace(/\*+$/, "").trim(), body: match[2].trim() }
  } else if ((match = text.match(/^\*\*Big Idea\s+\d+\s*[-–—:]\s*(.+?)\*\*\s*([\s\S]*)$/i))) {
    idea = { title: match[1].trim(), body: match[2].trim() }
  } else if ((match = text.match(/^\*\*Big Idea\s+\d+\*\*\s*[-–—:]?\s*([\s\S]*)$/i))) {
    idea = splitTitleBody(match[1].replace(/^[-–—:]\s*/, "").trim())
  } else if ((match = text.match(/^\*\*(\d+)\.\s*(.+?)\*\*\s*([\s\S]*)$/))) {
    idea = { title: match[2].trim(), body: match[3].trim() }
  } else {
    idea = splitTitleBody(text)
  }

  return {
    title: idea.title ? unwrapViewerLinks(idea.title) : null,
    body: unwrapViewerLinks(idea.body),
  }
}

function splitMarkedBlocks(section: string, marker: RegExp): ParsedSection | null {
  const lineMarker = new RegExp(marker.source, "im")
  const startsBlock = (text: string) => new RegExp(marker.source, "i").test(text)
  if (!lineMarker.test(section)) return null

  const parts = section.split(new RegExp(`(?=${marker.source})`, "im")).filter((part) => part.trim())
  if (!parts.length) return null

  const intro = startsBlock(parts[0]) ? "" : parts.shift()!.trim()
  const blocks = parts.map((part) => part.trim()).filter(Boolean)
  if (!validCount(blocks.length)) return null
  if (!blocks.every(startsBlock)) return null

  const peeled = peelTrailing(blocks[blocks.length - 1])
  blocks[blocks.length - 1] = peeled.body

  return {
    intro,
    ideas: blocks.map(parseIdeaItem),
    outro: peeled.trailing,
  }
}

function isOutroLine(line: string) {
  return (
    /^#{1,3}\s/.test(line) ||
    /^\[?!?\[/.test(line) ||
    /buy .*on amazon/i.test(line) ||
    /^>\s/.test(line) ||
    /^\*\*[^*]+\*\*\s*:?\s*$/.test(line)
  )
}

function splitMarkdownList(section: string): ParsedSection | null {
  const lines = section.split("\n")
  let index = 0
  while (
    index < lines.length &&
    !/^\d+\.\s/.test(lines[index]) &&
    !/^[-*+]\s/.test(lines[index])
  ) {
    index += 1
  }
  if (index >= lines.length) return null

  const intro = lines.slice(0, index).join("\n").trim()
  const ordered = /^\d+\.\s/.test(lines[index])
  const items: string[] = []
  let current: string[] = []
  let cursor = index

  const flush = () => {
    const text = current.join("\n").trim()
    if (text) items.push(text)
    current = []
  }

  for (; cursor < lines.length; cursor += 1) {
    const line = lines[cursor]
    if (ordered) {
      const match = line.match(/^(\d+)\.\s+(.*)$/)
      if (match) {
        const n = Number(match[1])
        if (items.length + (current.length ? 1 : 0) >= 1 && n === 1) break
        flush()
        current = [match[2]]
        continue
      }
      if (!current.length) break
      if (line.trim() === "") {
        const next = lines.slice(cursor + 1).find((entry) => entry.trim())
        if (next && isOutroLine(next)) break
      }
      current.push(line)
      continue
    }

    const bullet = line.match(/^[-*+]\s+(.*)$/)
    if (bullet) {
      flush()
      current = [bullet[1]]
      continue
    }
    if (!current.length) break
    if (line.trim() === "") {
      const next = lines.slice(cursor + 1).find((entry) => entry.trim())
      if (next && !/^[-*+]\s/.test(next) && !/^\s/.test(next)) break
    }
    current.push(line)
  }

  flush()
  if (!validCount(items.length)) return null

  return {
    intro,
    ideas: items.map(parseIdeaItem),
    outro: lines.slice(cursor).join("\n").trim(),
  }
}

function isLinkOnly(item: string) {
  return /^\[[^\]]+\]\([^)]+\)\s*$/.test(item.trim())
}

function parseIdeaSection(section: string): ParsedSection | null {
  const parsed =
    splitMarkedBlocks(section, /^#{2,3}\s*Big Idea\s+\d+/i) ||
    splitMarkedBlocks(section, /^\*\*Big Idea\s+\d+/i) ||
    splitMarkedBlocks(section, /^\*\*\d+\.\s/) ||
    splitMarkdownList(section)
  if (!parsed) return null
  if (parsed.ideas.length > 5 && parsed.ideas.every((idea) => isLinkOnly(idea.body) && !idea.title)) {
    return null
  }
  return parsed
}

function nextHeadingIndex(rest: string, mode: "default" | "terminal") {
  const headingRe = /\n##[^\n]+/g
  let match: RegExpExecArray | null
  while ((match = headingRe.exec(rest))) {
    const line = match[0].slice(1)
    if (mode === "terminal") {
      if (isTerminalHeading(line)) return match.index
      continue
    }
    if (isIdeaSubheading(line)) continue
    return match.index
  }
  return rest.length
}

export function splitBigIdeas(body: string): {
  before: string
  ideas: BigIdea[] | null
  after: string
} {
  const headingRe = /^##[^\n]+$/gm
  let match: RegExpExecArray | null

  while ((match = headingRe.exec(body))) {
    if (!isBigIdeasHeading(match[0])) continue

    const headingEnd = match.index + match[0].length
    const rest = body.slice(headingEnd)
    const firstEnd = nextHeadingIndex(rest, "default")
    let section = rest.slice(0, firstEnd).replace(/^\n+/, "")
    let parsed = parseIdeaSection(section)
    let usedEnd = firstEnd

    if (!parsed) {
      usedEnd = nextHeadingIndex(rest, "terminal")
      section = rest.slice(0, usedEnd).replace(/^\n+/, "")
      parsed = parseIdeaSection(section)
    }
    if (!parsed) continue

    const afterHeading = rest.slice(usedEnd)
    return {
      before: `${body.slice(0, headingEnd)}${parsed.intro ? `\n\n${parsed.intro}` : ""}`,
      ideas: parsed.ideas,
      after: [parsed.outro, afterHeading].filter(Boolean).join("\n\n"),
    }
  }

  return { before: body, ideas: null, after: "" }
}
