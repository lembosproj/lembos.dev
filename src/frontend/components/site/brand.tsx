import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

/**
 * Mark plus wordmark, set the way the Portal sets it: Roboto at 0.2rem tracking
 * beside a 38px mark. Unlinked, for places that wrap it in a link of their own.
 */
export function BrandMark({ size = "default" }: { size?: "default" | "sm" }) {
  const px = size === "sm" ? 30 : 36

  return (
    <>
      <Image
        src="/logo.svg"
        alt=""
        width={px}
        height={px}
        priority
        style={{ width: px, height: px }}
      />
      <span
        className={cn(
          "brand-text ml-3",
          size === "sm" ? "text-lg" : "text-xl",
        )}
      >
        {site.name}
      </span>
    </>
  )
}

export function Brand({
  className,
  href = "/",
  size = "default",
}: {
  className?: string
  href?: string
  size?: "default" | "sm"
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-sm outline-hidden transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={`${site.name} home`}
    >
      <BrandMark size={size} />
    </Link>
  )
}
