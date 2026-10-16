import Link from "next/link"

import { Brand } from "@/components/site/brand"
import { GitHubIcon } from "@/components/site/icons"
import { docsLinks, projectLinks, site } from "@/lib/site"

function Column({
  heading,
  links,
}: {
  heading: string
  links: readonly { href: string; label: string }[]
}) {
  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {heading}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-background-gray">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-16">
        <div>
          <Brand size="sm" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>
          <div className="mt-5 flex items-center gap-4">
            <Link
              href={site.org}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Lembos on GitHub"
            >
              <GitHubIcon className="h-5 w-5" />
            </Link>
            <Link
              href={`mailto:${site.email}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {site.email}
            </Link>
          </div>
        </div>

        <Column heading="Documentation" links={docsLinks} />
        <Column heading="Project" links={projectLinks} />
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; 2024&ndash;{new Date().getFullYear()} The Lembos Project Owners.
          </p>
          <p>
            Released under the{" "}
            <Link
              href={`${site.deploy}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {site.license} licence
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
