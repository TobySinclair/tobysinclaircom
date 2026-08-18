import { ImageResponse } from "next/og";

export const alt = "Toby Sinclair Personal Development Coach | Coaching and Mentoring";
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
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#00ff88" }}>Toby Sinclair</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              maxWidth: 960,
            }}
          >
            Helping leaders become more coach-like
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>Founder, Real Talk Studio</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
