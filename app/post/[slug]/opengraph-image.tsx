import { ImageResponse } from "next/og";
import { getPost } from "@/lib/content";
import { getRtsCover, isRtsPost, splitHighlight } from "@/lib/rts-cover";
import { categoryLabel } from "@/lib/site";

export const alt = "Toby Sinclair";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (post && isRtsPost(post)) {
    const cover = getRtsCover(post);
    const line2 = splitHighlight(cover.line2, cover.highlight);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            background:
              "radial-gradient(ellipse 520px 420px at 8% 92%, rgba(0,255,136,0.42), transparent 70%), radial-gradient(ellipse 520px 420px at 94% 6%, rgba(0,180,255,0.38), transparent 70%), #000",
            color: "white",
            padding: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              fontSize: 18,
              letterSpacing: 3.2,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#3b9eff",
                  marginRight: 10,
                }}
              />
              {cover.series}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {cover.brand}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#00ff88",
                  marginLeft: 10,
                }}
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 80,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: -1.5,
                lineHeight: 1.1,
                textAlign: "center",
              }}
            >
              {cover.line1}
            </div>
            <div
              style={{
                width: 72,
                height: 1,
                background: "rgba(255,255,255,0.28)",
                margin: "28px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: -1.5,
                lineHeight: 1.1,
                textAlign: "center",
              }}
            >
              <span>{line2.before}</span>
              <span style={{ color: "#5ad0ff" }}>{line2.highlight}</span>
              <span>{line2.after}</span>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 56,
              right: 56,
              bottom: 48,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              letterSpacing: 2.6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.42)",
            }}
          >
            <div style={{ display: "flex", maxWidth: 640 }}>{cover.tagline}</div>
            <div style={{ display: "flex" }}>{cover.url}</div>
          </div>
        </div>
      ),
      { ...size },
    );
  }

  const title = post?.title || "Toby Sinclair";
  const category = post?.categories[0] ? categoryLabel(post.categories[0]) : "Articles";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0f",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#00ff88" }}>
          <span>Toby Sinclair</span>
          <span>{category}</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 80 ? 48 : 60,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size },
  );
}
