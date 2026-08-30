export type TocItem = {
  label: string
  href: string
};

export function ArticleToc({ items }: { items: TocItem[] }) {
  if (!items.length) return null;

  return (
    <nav className="article-toc" aria-labelledby="table-of-contents">
      <h2 className="eyebrow" id="table-of-contents">
        In this guide
      </h2>
      <ol>
        {items.map((item, index) => (
          <li key={item.href}>
            <a href={item.href}>
              <span className="article-toc-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="article-toc-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
