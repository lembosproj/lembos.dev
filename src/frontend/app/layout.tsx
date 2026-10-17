import type React from "react"
import type { Metadata, Viewport } from "next"
import { Public_Sans, Roboto } from "next/font/google"

import { RootProvider } from "fumadocs-ui/provider/next"

import "./globals.css"
import DocsSearchDialog from "@/components/search"
import { site } from "@/lib/site"

/* The Portal's pairing: Public Sans for everything, Roboto for the wordmark. */
const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-roboto",
})

const title = `${site.name} — ${site.tagline}`

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  applicationName: site.name,
  keywords: [
    "internal developer platform",
    "IDP",
    "platform engineering",
    "developer portal",
    "software catalog",
    "progressive delivery",
    "drift detection",
    "open source",
  ],
  authors: [{ name: "The Lembos Project Owners", url: site.org }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title,
    description: site.description,
    siteName: site.name,
    images: [
      {
        // Generated from tools/og-image.tsx — see the note in that file.
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — internal developer platform`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og-image.png"],
  },
  icons: {
    shortcut: "/favicon.ico",
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#5B46E5",
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${publicSans.variable} ${roboto.variable}`}
    >
      <body className="font-sans">
        {/* Fumadocs' provider runs next-themes, so it is the site's theme
            provider too; two would fight over the class on <html>. */}
        <RootProvider
          theme={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
          search={{ SearchDialog: DocsSearchDialog }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
