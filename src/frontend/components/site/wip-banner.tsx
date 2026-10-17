"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { site } from "@/lib/site"

/**
 * The honest status line: what has been released, and that it is early.
 *
 * Above the sticky header rather than inside it, so it scrolls away and the
 * notice is not permanently spending the top of every viewport.
 */
export function WipBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="relative border-b border-primary/20 bg-primary/[0.07]">
      <div className="container flex items-center justify-center gap-x-2 py-2 pr-8 text-center text-xs sm:text-sm">
        <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-primary sm:block" />
        <p className="text-pretty text-muted-foreground">
          <span className="text-foreground">Lembos {site.release} is out.</span>{" "}
          <span className="hidden sm:inline">
            An early release: pre-1.0, so expect changes between versions.{" "}
          </span>
          <span className="sm:hidden">Pre-1.0. </span>
          <Link
            href="/docs/quickstart"
            className="whitespace-nowrap text-primary underline-offset-4 hover:underline"
          >
            Try it
          </Link>
          .
        </p>
      </div>

      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss notice"
        className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
