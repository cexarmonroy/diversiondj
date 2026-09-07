import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name} — ${siteConfig.brand}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatarData = await readFile(
    join(process.cwd(), "public/images/profile-avatar.png")
  );
  const avatarSrc = `data:image/png;base64,${avatarData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(236,72,153,0.35), transparent 45%), radial-gradient(circle at 88% 78%, rgba(34,211,238,0.3), transparent 45%), radial-gradient(circle at 50% 100%, rgba(168,85,247,0.25), transparent 55%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 220,
              height: 220,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              width={220}
              height={220}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#a1a1aa",
              }}
            >
              Press Kit
            </span>
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.05,
                marginTop: 8,
              }}
            >
              {siteConfig.name}
            </span>
            <span
              style={{
                fontSize: 58,
                fontWeight: 800,
                backgroundImage:
                  "linear-gradient(90deg, #f472b6, #a855f7, #22d3ee)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {siteConfig.brand}
            </span>
            <span style={{ fontSize: 30, color: "#d4d4d8", marginTop: 22 }}>
              {siteConfig.tagline}
            </span>
            <span style={{ fontSize: 26, color: "#71717a", marginTop: 8 }}>
              {siteConfig.location} · Matrimonios · Empresas · Eventos privados
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
