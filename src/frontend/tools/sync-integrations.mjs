// Copies the files the platform keeps for its chat apps into public/integrations/, so the install page can link what it
// asks an administrator to upload: Slack's app manifest and icon, and the Teams app's manifest and icons.
//
// The platform's integrations/ folder is the source and this one only ever mirrors it: a file the platform no longer
// keeps is removed here too. Its READMEs stay behind — they describe the repository, and the install page says the same.
//
// Run after the platform's integrations change, from a checkout beside the platform's, and commit what it writes:
//   pnpm --filter frontend sync-integrations [path/to/platform]

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const APPS = ["slack", "teams"]
const KEPT = /\.(json|png)$/

const frontend = join(dirname(fileURLToPath(import.meta.url)), "..")
const platform = resolve(process.argv[2] ?? join(frontend, "..", "..", "..", "platform"))
const source = join(platform, "integrations")
const target = join(frontend, "public", "integrations")

if (!existsSync(source)) {
  console.error(`No integrations at ${source}. Pass the platform repository's path.`)
  process.exit(1)
}

let copied = 0

for (const app of APPS) {
  const from = join(source, app)
  const to = join(target, app)
  const wanted = existsSync(from) ? readdirSync(from).filter((name) => KEPT.test(name)) : []

  mkdirSync(to, { recursive: true })

  for (const stale of readdirSync(to).filter((name) => !wanted.includes(name))) {
    rmSync(join(to, stale))
    console.log(`removed ${app}/${stale}`)
  }

  for (const name of wanted) {
    copyFileSync(join(from, name), join(to, name))
    copied++
  }
}

console.log(`${copied} files in public/integrations`)
