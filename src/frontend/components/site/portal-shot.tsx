import Image from "next/image"

import { cn } from "@/lib/utils"

/** Intrinsic size of every capture in public/portal. */
const SHOT_WIDTH = 1747
const SHOT_HEIGHT = 1314

/**
 * A Portal screenshot in a window frame.
 *
 * Two things are worth knowing.
 *
 * Light and dark captures are swapped with CSS rather than by reading the theme
 * in JavaScript — a static export has no theme on the server, so anything
 * conditional in React renders the wrong one first and flashes.
 *
 * And `ratio` crops rather than scales. The captures are full 1747x1314 browser
 * windows, so how much of one is content varies wildly: the catalog fills it,
 * while the blueprint versions table is over half empty below the last row.
 * Cropping from the top keeps the figure tight to its subject without anyone
 * having to re-cut the files by hand.
 *
 * Below `sm` the image is widened past its frame and anchored top-left, so a
 * phone sees the left of the capture at roughly 1.7x instead of the whole
 * 1747px-wide window at a fifth of scale. Fitting the whole thing in produces a
 * strip nobody can read — and at the widest crops, one that looks broken rather
 * than deliberate.
 */
export function PortalShot({
  src,
  srcDark,
  alt,
  caption,
  ratio = SHOT_WIDTH / SHOT_HEIGHT,
  priority = false,
  className,
}: {
  src: string
  srcDark?: string
  alt: string
  caption?: string
  /** Width ÷ height of the visible crop. Higher is shorter. */
  ratio?: number
  priority?: boolean
  className?: string
}) {
  const imageClass =
    "absolute inset-y-0 left-0 h-full w-[170%] object-cover object-top-left sm:w-full sm:object-top"

  return (
    <figure className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-xl border bg-card shadow-2xl shadow-foreground/5">
        <div className="flex h-9 items-center gap-1.5 border-b bg-background-gray px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="ml-3 truncate font-mono text-[11px] text-muted-foreground">
            portal.lembos.dev
          </span>
        </div>

        <div className="relative w-full" style={{ aspectRatio: ratio }}>
          <Image
            src={src}
            alt={alt}
            width={SHOT_WIDTH}
            height={SHOT_HEIGHT}
            priority={priority}
            className={cn(imageClass, srcDark && "dark:hidden")}
          />
          {srcDark ? (
            <Image
              src={srcDark}
              alt={alt}
              width={SHOT_WIDTH}
              height={SHOT_HEIGHT}
              priority={priority}
              className={cn(imageClass, "hidden dark:block")}
            />
          ) : null}
        </div>
      </div>

      {caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
