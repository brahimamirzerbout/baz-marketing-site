import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "BAZventures";
    const subtitle = searchParams.get("subtitle") || "The growth partner for ambitious businesses.";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#111111",
            padding: "80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "2px",
                backgroundColor: "#888888",
              }}
            />
            <span style={{ color: "#888888", fontSize: "18px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              BAZventures
            </span>
          </div>
          <h1
            style={{
              color: "#e0e0e0",
              fontSize: "64px",
              fontWeight: 600,
              fontFamily: "Outfit",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 16px 0",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: "#e0e0e0",
              fontSize: "28px",
              fontFamily: "Poppins",
              fontWeight: 300,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Outfit",
            data: await fetch(
              "https://fonts.gstatic.com/s/outfit/v11/QGYvz_MVcBeNP4NJtEtqUYLknw.woff2"
            ).then((r) => r.arrayBuffer()),
            weight: 600,
            style: "normal",
          },
          {
            name: "Poppins",
            data: await fetch(
              "https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm21lVF9eO.woff2"
            ).then((r) => r.arrayBuffer()),
            weight: 300,
            style: "normal",
          },
        ],
      }
    );
  } catch {
    return new Response("OG image generation failed", { status: 500 });
  }
}
