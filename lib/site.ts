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
  // The platform repository is private until its first public release; the
  // chart that installs it is the public entry point until then.
  deploy: "https://github.com/lembosproj/deploy",
  org: "https://github.com/lembosproj",
  email: "info@lembos.dev",
  license: "Apache 2.0",
} as const

/** Section links on the landing page. `/docs` joins this list when it exists. */
export const nav = [
  { href: "/#what-it-is", label: "What it is" },
  { href: "/#model", label: "The model" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#how-it-is-used", label: "How it is used" },
] as const

export const docsLinks = [
  { href: site.deploy, label: "Installing Lembos" },
  { href: `${site.deploy}/blob/main/charts/lembos/README.md`, label: "The Helm chart" },
  { href: `${site.deploy}/blob/main/charts/lembos/README.md#running-on-a-local-k3s`, label: "Running on a local k3s" },
] as const

export const projectLinks = [
  { href: `${site.deploy}/blob/main/CONTRIBUTING.md`, label: "Contributing" },
  { href: `${site.deploy}/blob/main/CODE-OF-CONDUCT.md`, label: "Code of conduct" },
  { href: `${site.deploy}/blob/main/CLA.md`, label: "Contributor licence agreement" },
  { href: `${site.deploy}/blob/main/LICENSE`, label: "Apache 2.0 licence" },
] as const
