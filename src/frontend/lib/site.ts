import release from "./release.json"

/**
 * One description of the site, so the header, the footer, the metadata and any
 * page added later all agree. Docs pages are expected to join `nav` here rather
 * than growing a second navigation of their own.
 */
export const site = {
  name: "Lembos",
  domain: "lembos.dev",
  url: "https://lembos.dev",
  tagline: "The control plane for how software is deployed, configured and governed.",
  description:
    "Lembos is an open-source internal developer platform built on versioned building blocks. It records what should be running, observes what is, and closes the gap.",
  // The platform repository is private for now, so the chart that installs it
  // is the public entry point.
  deploy: "https://github.com/lembosproj/deploy",
  org: "https://github.com/lembosproj",
  email: "info@lembos.dev",
  license: "Apache 2.0",
  // The platform release the latest chart installs, as the banner announces it — fetched from the deploy
  // repository's releases before every build (tools/release.mjs), so nobody bumps it.
  release: release.latest.platform,
} as const

/** Section links on the landing page, then the docs. */
export const nav = [
  { href: "/#what-it-is", label: "What it is" },
  { href: "/#portal", label: "The Portal" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#how-it-is-used", label: "How it is used" },
  { href: "/docs", label: "Docs" },
] as const

export const docsLinks = [
  { href: "/docs/concepts", label: "Concepts" },
  { href: "/docs/quickstart", label: "Quickstart" },
  { href: "/docs/install", label: "Install" },
  { href: "/docs/use", label: "Using Lembos" },
] as const

export const projectLinks = [
  { href: `${site.deploy}/blob/main/CONTRIBUTING.md`, label: "Contributing" },
  { href: `${site.deploy}/blob/main/CODE-OF-CONDUCT.md`, label: "Code of conduct" },
  { href: `${site.deploy}/blob/main/CLA.md`, label: "Contributor licence agreement" },
  { href: `${site.deploy}/blob/main/LICENSE`, label: "Apache 2.0 licence" },
] as const
