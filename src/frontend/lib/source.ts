import { loader } from "fumadocs-core/source"
import { applyMdxPreset } from "fumadocs-mdx/config"
import { defineDocs } from "fumadocs-mdx/macro"

import { remarkRelease } from "./remark-release.mjs"

// First, so the numbers are in place before the preset reads the text for headings, search and code blocks.
const docs = defineDocs({
  dir: "../../docs",
  docs: {
    mdxOptions: applyMdxPreset({ remarkPlugins: (preset) => [remarkRelease, ...preset] }),
  },
})

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})
