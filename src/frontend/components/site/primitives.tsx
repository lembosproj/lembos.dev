import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("border-b py-20 md:py-28", className)}>
      <div className="container">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold tracking-tight md:text-4xl",
          eyebrow && "mt-3",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  )
}

/** A small bordered label. Used for status words and vocabulary terms. */
export function Pill({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode
  tone?: "default" | "primary" | "success" | "warning" | "destructive" | "muted"
  className?: string
}) {
  const tones = {
    default: "border-border text-foreground",
    primary: "border-primary/40 bg-primary/10 text-primary",
    success: "border-success/40 bg-success/10 text-success",
    warning: "border-warning/40 bg-warning/10 text-warning",
    destructive: "border-destructive/40 bg-destructive/10 text-destructive",
    muted: "border-border bg-muted text-muted-foreground",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Card({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 transition-colors hover:border-foreground/20",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** A term and its one-line definition, as the domain docs write them. */
export function Term({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-border pl-4">
      <dt className="font-mono text-sm text-foreground">{name}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {children}
      </dd>
    </div>
  )
}
