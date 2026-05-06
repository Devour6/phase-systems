import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Phase Systems — Built for the next generation of compute";

async function loadFont(family: string, url: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
    { headers: { "user-agent": "Mozilla/5.0" } }
  ).then((r) => r.text());
  const match = css.match(/url\((https:\/\/[^)]+\.(?:woff2|ttf))\)/);
  const fontUrl = match?.[1] ?? url;
  return fetch(fontUrl).then((r) => r.arrayBuffer());
}

export default async function OG() {
  const [audiowide, outfit, kodeMono, logoBuf] = await Promise.all([
    loadFont(
      "Audiowide",
      "https://fonts.gstatic.com/s/audiowide/v20/l7gdbjpo0cum0ckerWCdlg_O.ttf"
    ),
    loadFont(
      "Outfit:wght@400;600",
      "https://fonts.gstatic.com/s/outfit/v11/QGYvz_MVcBeNP4NJuktqkA.ttf"
    ),
    loadFont(
      "Kode+Mono",
      "https://fonts.gstatic.com/s/kodemono/v2/A2BLn5pb0QgtVEPFnlYkkaoBgw4qv9odq5myxDqQzdBP.ttf"
    ),
    readFile(join(process.cwd(), "public", "logo-mark-512.png")),
  ]);

  const logoSrc = `data:image/png;base64,${Buffer.from(logoBuf).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0F0E0C",
          color: "#F3EED9",
          padding: 64,
          position: "relative",
          fontFamily: "Outfit",
        }}
      >
        {/* aurora */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 720,
            height: 720,
            background:
              "radial-gradient(circle, rgba(124,255,168,0.20), rgba(124,255,168,0) 60%)",
            display: "flex",
          }}
        />
        {/* hairline frame */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: "1px solid rgba(243,238,217,0.12)",
            display: "flex",
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "Kode Mono",
            fontSize: 20,
            letterSpacing: 6,
            color: "rgba(243,238,217,0.55)",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              background: "#7CFFA8",
              transform: "rotate(45deg)",
              display: "flex",
            }}
          />
          <span style={{ marginLeft: 6 }}>Des Moines / Iowa</span>
        </div>

        {/* main row: logo + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            marginTop: 56,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={220} height={220} alt="" />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.95 }}>
            <div
              style={{
                fontFamily: "Audiowide",
                fontSize: 110,
                letterSpacing: 4,
                color: "#F3EED9",
              }}
            >
              PHASE
            </div>
            <div
              style={{
                fontFamily: "Audiowide",
                fontSize: 110,
                letterSpacing: 4,
                color: "#7CFFA8",
              }}
            >
              SYSTEMS
            </div>
          </div>
        </div>

        {/* tagline */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontFamily: "Outfit",
            fontSize: 28,
            color: "rgba(243,238,217,0.75)",
          }}
        >
          Built for the next generation of compute.
        </div>

        {/* coordinates */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            fontFamily: "Kode Mono",
            fontSize: 16,
            letterSpacing: 3,
            color: "rgba(243,238,217,0.45)",
            textTransform: "uppercase",
          }}
        >
          <span>Phase Systems</span>
          <span>41.6867°N · 93.5988°W</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Audiowide", data: audiowide, weight: 400, style: "normal" },
        { name: "Outfit", data: outfit, weight: 400, style: "normal" },
        { name: "Kode Mono", data: kodeMono, weight: 400, style: "normal" },
      ],
    }
  );
}
