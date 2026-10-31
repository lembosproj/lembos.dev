// Copies the platform's webhook event schemas into public/schemas/events/, where the site serves them at the address
// every event names as its dataschema: https://lembos.dev/schemas/events/<type>.v<version>.json.
//
// The platform exports them to contracts/events/<type>.v<version>.schema.json and CI there fails on a stale copy, so
// that folder is the source and this one only ever mirrors it: a schema the platform no longer has is removed here too.
// Each file's $id must be the address it is served at, or a receiver resolving dataschema would fetch something that
// says it is something else.
//
// Run after the platform's catalog changes, from a checkout beside the platform's, and commit what it writes:
//   pnpm --filter frontend sync-event-schemas [path/to/platform]

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ORIGIN = "https://lembos.dev"
const SERVED = "schemas/events"

const frontend = join(dirname(fileURLToPath(import.meta.url)), "..")
const platform = resolve(process.argv[2] ?? join(frontend, "..", "..", "..", "platform"))
const source = join(platform, "contracts", "events")
const target = join(frontend, "public", SERVED)

if (!existsSync(source)) {
  console.error(`No event schemas at ${source}. Pass the platform repository's path.`)
  process.exit(1)
}

const wanted = new Map()

for (const file of readdirSync(source).filter((name) => name.endsWith(".schema.json"))) {
  const served = file.replace(/\.schema\.json$/, ".json")
  const text = readFileSync(join(source, file), "utf8")
  const id = JSON.parse(text).$id
  const address = `${ORIGIN}/${SERVED}/${served}`

  if (id !== address) {
    console.error(`${file} says its $id is ${id}, but it would be served at ${address}.`)
    process.exit(1)
  }

  wanted.set(served, text)
}

mkdirSync(target, { recursive: true })

for (const stale of readdirSync(target).filter((name) => name.endsWith(".json") && !wanted.has(name))) {
  rmSync(join(target, stale))
  console.log(`removed ${stale}`)
}

for (const [name, text] of wanted) writeFileSync(join(target, name), text)

console.log(`${wanted.size} event schemas in public/${SERVED}`)
