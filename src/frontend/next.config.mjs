import path from "node:path"
import { fileURLToPath } from "node:url"

import { createMDX } from "fumadocs-mdx/next"

const basePath = process.env.PAGES_BASE_PATH ?? ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Only the exported build goes to dist/ — the Pages workflow uploads that
  // directory. Development keeps the default .next, so running `pnpm build`
  // while `pnpm dev` is up no longer pulls the manifests out from under it.
  distDir: process.env.NODE_ENV === "production" ? "dist" : ".next",
  basePath,
  // The docs live at the repository root, outside this app; Turbopack reads
  // nothing above its root.
  turbopack: {
    root: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."),
  },
  env: {
    // The docs search downloads its index by URL, which Next does not prefix.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default createMDX()(nextConfig)
