import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { docsLinks, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="relative flex flex-1 items-center overflow-hidden border-b">
        <div
          className="grid-backdrop pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="container relative py-24 md:py-32">
          <div className="mx-auto max-w-xl text-center">
            <p className="font-mono text-sm text-primary">404</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Nothing is declared at this address
            </h1>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              The page has moved, or it never existed. The install guide lives in
              the deploy repository, and the links below go straight to it.
            </p>

            <div className="mt-8 flex justify-center">
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to the home page
                </Link>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {docsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-muted-foreground">
              Think this is a broken link?{" "}
              <Link
                href={`mailto:${site.email}`}
                className="text-primary hover:underline"
              >
                {site.email}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
