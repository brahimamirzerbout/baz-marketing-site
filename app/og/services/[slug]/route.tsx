import { ImageResponse } from "next/og";
import { services, getService } from "@/content/services";

export const dynamic = "force-static";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  const name = service?.name ?? "BAZventures";
  const tagline = service?.tagline ?? "Senior-led growth marketing.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          color: "#f5f5f4",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#f5f5f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#020617",
              fontWeight: 700,
              fontSize: "24px",
            }}
          >
            B
          </div>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            BAZventures · Service
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "76px", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            {name}
          </div>
          <div style={{ fontSize: "30px", color: "#a1a1aa", marginTop: "20px", maxWidth: "900px" }}>
            {tagline}
          </div>
        </div>
        <div style={{ fontSize: "22px", color: "#71717a" }}>baz.agency</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
