import { getRtsCover, splitHighlight } from "@/lib/rts-cover";
import type { Post } from "@/lib/content";

export function RtsCover({
  post,
  size = "sm",
  className = "",
}: {
  post: Pick<Post, "slug" | "title">
  size?: "sm" | "lg"
  className?: string
}) {
  const cover = getRtsCover(post);
  const line2 = splitHighlight(cover.line2, cover.highlight);
  const large = size === "lg";

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      aria-hidden="true"
    >
      <div
        className={`pointer-events-none absolute -bottom-20 -left-16 rounded-full bg-[#00ff88] blur-[90px] ${large ? "h-80 w-80 opacity-55" : "h-56 w-56 opacity-50"}`}
      />
      <div
        className={`pointer-events-none absolute -right-16 -top-20 rounded-full bg-[#3b9eff] blur-[90px] ${large ? "h-80 w-80 opacity-50" : "h-56 w-56 opacity-45"}`}
      />

      <div className={`absolute inset-0 flex flex-col justify-between ${large ? "p-6 md:p-8" : "p-4"}`}>
        <div
          className={`flex items-start justify-between gap-3 font-medium uppercase text-white/85 ${large ? "text-[10px] tracking-[0.22em]" : "text-[8px] tracking-[0.16em]"}`}
        >
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3b9eff]" />
            {cover.series}
          </span>
          <span className="flex items-center gap-1.5 text-right">
            {cover.brand}
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ff88]" />
          </span>
        </div>

        <div className="flex flex-col items-center justify-center px-2 text-center">
          <p
            className={`font-bold tracking-tight text-white ${large ? "text-[32px] leading-[1.15] md:text-[44px]" : "text-[22px] leading-[1.15] sm:text-[26px]"}`}
          >
            {cover.line1}
          </p>
          <div className={`bg-white/25 ${large ? "my-4 h-px w-16" : "my-2.5 h-px w-12"}`} />
          <p
            className={`font-bold tracking-tight text-white ${large ? "text-[32px] leading-[1.15] md:text-[44px]" : "text-[22px] leading-[1.15] sm:text-[26px]"}`}
          >
            {line2.before}
            <span className="text-[#5ad0ff]">{line2.highlight}</span>
            {line2.after}
          </p>
        </div>

        <div
          className={`flex items-end justify-between gap-4 uppercase text-white/45 ${large ? "text-[10px] tracking-[0.18em]" : "text-[7px] tracking-[0.14em]"}`}
        >
          <span className="max-w-[62%] leading-4">{cover.tagline}</span>
          <span className="shrink-0">{cover.url}</span>
        </div>
      </div>
    </div>
  );
}
