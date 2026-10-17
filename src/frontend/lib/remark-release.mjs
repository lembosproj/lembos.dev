// Replaces {{chartVersion}} and {{platformVersion}} in the docs with the latest release's numbers, from
// lib/release.json (tools/release.mjs writes it before every build). A remark plugin rather than an MDX
// component, because the numbers matter most inside code blocks — `helm upgrade … --version` — where a
// component cannot go.
//
// It rewrites the source before it is parsed rather than the tree after. In prose MDX would read {{name}} as a
// JavaScript expression, and the search index is sliced from the source by position, so anything done to the
// tree leaves the placeholder in the index. Rewriting the source first, and handing the parser and everything
// after it the rewritten text, keeps the page, its positions and its search entry in agreement.
//
// Only the known names are replaced, and any other bare {{name}} fails the build instead of being published as
// it is. A JSX object literal — style={{ color: "red" }} — has more in it than a name, so it is left alone.

import { readFileSync } from "node:fs"
import { join } from "node:path"

function readValues() {
  // From the app's directory, where `next` runs: fumadocs-mdx bundles this module into .source/ before running
  // it, so a path relative to the module would point there.
  const file = join(process.cwd(), "lib", "release.json")
  const { latest } = JSON.parse(readFileSync(file, "utf8"))
  return { chartVersion: latest.chart, platformVersion: latest.platform }
}

export function remarkRelease() {
  const parse = this.parser

  this.parser = (document, file) => {
    // Read per file rather than once, so a dev server picks up a newly fetched release.
    const values = readValues()

    let text = String(document)
    for (const [name, value] of Object.entries(values))
      text = text.replace(new RegExp(`\\{\\{\\s*${name}\\s*\\}\\}`, "g"), value)

    const unknown = text.match(/\{\{\s*[A-Za-z]+\s*\}\}/)
    if (unknown)
      throw new Error(`${file.path}: unknown placeholder ${unknown[0]}; known: ${Object.keys(values).join(", ")}`)

    file.value = text
    return parse(text, file)
  }
}
