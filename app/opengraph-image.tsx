import { ImageResponse } from "next/og";

export const alt = "Toby Sinclair | The Human Side of AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#00ff88" }}>
          Toby Sinclair · Founder, Real Talk Studio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.12,
              maxWidth: 1000,
            }}
          >
            AI is a technology problem for about six weeks. Then it's a people problem.
          </div>
          <div style={{ fontSize: 24, color: "#a1a1aa" }}>The human side of AI</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
