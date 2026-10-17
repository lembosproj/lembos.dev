import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { site } from "@/lib/site"

/* A static export has no request to render on, so the card is baked at build time. */
export const dynamic = "force-static"

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/*
  The source of public/og-image.png.

  Deliberately not a route. As app/opengraph-image.tsx this renders correctly,
  but `output: export` writes it to dist/opengraph-image with no extension, and
  GitHub Pages then serves it as application/octet-stream — which the crawlers
  that want the card refuse. So the card is generated once and committed.

  To regenerate after changing the wording: copy this file back to
  app/opengraph-image.tsx, run `pnpm build`, then

      cp dist/opengraph-image public/og-image.png

  and move it back here.
*/
export default function OpengraphImage() {
  const logo = readFileSync(join(process.cwd(), "public", "logo.svg")).toString(
    "base64",
  )

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(70% 70% at 50% 0%, rgba(139,124,255,0.28) 0%, rgba(10,10,10,0) 70%)",
          color: "#EDEDED",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;base64,${logo}`}
            width={64}
            height={48}
            alt=""
          />
          <span
            style={{
              marginLeft: 22,
              fontSize: 34,
              letterSpacing: "0.2rem",
              color: "#EDEDED",
            }}
          >
            Lembos
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Know what is running.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#8B7CFF",
            }}
          >
            And what should be.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 27,
              color: "#A1A1A1",
            }}
          >
            An open-source internal developer platform, built on versioned
            building blocks.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#A1A1A1",
            borderTop: "1px solid #262626",
            paddingTop: 26,
          }}
        >
          <span>lembos.dev</span>
          <span>Apache 2.0</span>
        </div>
      </div>
    ),
    size,
  )
}
