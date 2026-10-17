// Writes lib/release.json: the chart releases lembosproj/deploy has published, newest first, each with the
// platform release it installs. The docs read their version numbers from it (lib/remark-release.mjs), and the
// banner its "is out" line, so a release reaches the site on its next build without anybody editing a page.
//
// The chart version is the release's tag. The platform version is the chart's appVersion at that tag, read
// from Chart.yaml rather than parsed out of the release notes: the notes are prose and have changed shape
// before, and Chart.yaml is what the chart actually installs.
//
// Run before `next build` and `next dev`. In CI a failure fails the build, so the site is never published
// with numbers nobody fetched. Locally, offline or rate-limited, the last file written is kept.

import { existsSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const REPOSITORY = "lembosproj/deploy"
const KEEP = 10

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "lib", "release.json")

async function get(url, accept) {
  const headers = { Accept: accept, "User-Agent": "lembos.dev" }
  // Authenticated in CI, where an anonymous runner shares its rate limit with every other job on its address.
  if (process.env.GITHUB_TOKEN && url.startsWith("https://api.github.com/"))
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error(`${url} answered ${response.status}`)
  return response
}

async function appVersionAt(tag) {
  const chart = await get(
    `https://raw.githubusercontent.com/${REPOSITORY}/${tag}/charts/lembos/Chart.yaml`,
    "text/plain",
  ).then((r) => r.text())

  const match = chart.match(/^appVersion:\s*["']?([^"'\s]+)["']?\s*$/m)
  if (!match) throw new Error(`charts/lembos/Chart.yaml at ${tag} names no appVersion`)
  return match[1]
}

async function fetchReleases() {
  const published = await get(
    `https://api.github.com/repos/${REPOSITORY}/releases?per_page=30`,
    "application/vnd.github+json",
  ).then((r) => r.json())

  // Drafts are not out, and a pre-release is not what the docs should tell anyone to install.
  const releases = published.filter((r) => !r.draft && !r.prerelease).slice(0, KEEP)
  if (releases.length === 0) throw new Error(`${REPOSITORY} has published no release`)

  return Promise.all(
    releases.map(async (r) => ({
      chart: r.tag_name.replace(/^v/, ""),
      platform: await appVersionAt(r.tag_name),
      publishedAt: r.published_at,
      url: r.html_url,
    })),
  )
}

try {
  const releases = await fetchReleases()
  writeFileSync(out, JSON.stringify({ latest: releases[0], releases }, null, 2) + "\n")
  console.log(`release.json: chart ${releases[0].chart}, platform ${releases[0].platform}`)
} catch (error) {
  if (process.env.CI || !existsSync(out)) {
    console.error(`Could not read ${REPOSITORY}'s releases: ${error.message}`)
    process.exit(1)
  }
  console.warn(`Could not read ${REPOSITORY}'s releases (${error.message}); keeping the last release.json.`)
}
