import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Pill } from "@/components/site/primitives"

/**
 * Desired against observed, and the gap between them.
 *
 * The point of the figure is that the right column is not a log of the left —
 * it is reported by the target, and the difference is the work.
 */
export function ConvergeFigure() {
  const desired = [
    ["artifact", "cart-service@sha256:9f2c…"],
    ["blueprint", "helm-web-service 2.4.0"],
    ["config", "revision 17"],
    ["replicas", "6"],
  ]

  const observed = [
    ["artifact", "cart-service@sha256:9f2c…", true],
    ["blueprint", "helm-web-service 2.2.0", false],
    ["config", "revision 15", false],
    ["replicas", "6", true],
  ] as const

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <div className="rounded-xl border bg-card">
        <div className="border-b px-5 py-3">
          <p className="text-sm font-medium">Desired state</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            What was declared and published
          </p>
        </div>
        <dl className="divide-y">
          {desired.map(([key, value]) => (
            <div
              key={key}
              className="flex items-baseline justify-between gap-4 px-5 py-2.5"
            >
              <dt className="font-mono text-xs text-muted-foreground">{key}</dt>
              <dd className="truncate font-mono text-xs">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex items-center justify-center gap-2 md:flex-col">
        <span className="h-px w-8 bg-border md:h-8 md:w-px" />
        <span className="whitespace-nowrap rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
          drift
        </span>
        <span className="h-px w-8 bg-border md:h-8 md:w-px" />
      </div>

      <div className="rounded-xl border bg-card">
        <div className="border-b px-5 py-3">
          <p className="text-sm font-medium">Observed state</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            What the execution target reports
          </p>
        </div>
        <dl className="divide-y">
          {observed.map(([key, value, matches]) => (
            <div
              key={key}
              className="flex items-baseline justify-between gap-4 px-5 py-2.5"
            >
              <dt className="font-mono text-xs text-muted-foreground">{key}</dt>
              <dd
                className={cn(
                  "truncate font-mono text-xs",
                  matches ? "text-muted-foreground" : "text-warning",
                )}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

/** Permission, ownership, policy — three questions, three mechanisms. */
export function AuthorizationLayers() {
  const layers = [
    {
      name: "Permission",
      question: "May this person or machine do this kind of thing?",
      how: "Roles grant permissions, so “who may deploy?” is answered by a list rather than an investigation.",
    },
    {
      name: "Ownership",
      question: "Do they reach this particular thing?",
      how: "Group membership, inherited down the hierarchy, so a member of a parent group reaches what its children own.",
    },
    {
      name: "Policy",
      question: "Is this particular change allowed right now?",
      how: "Policies check the facts of the change at the moment it is asked for, and record which version decided.",
    },
  ]

  return (
    <ol className="space-y-px overflow-hidden rounded-xl border bg-card">
      {layers.map((layer, index) => (
        <li
          key={layer.name}
          className={cn(
            "grid gap-2 px-5 py-5 sm:grid-cols-[auto_1fr] sm:gap-6",
            index > 0 && "border-t",
          )}
        >
          <span className="font-mono text-xs text-muted-foreground sm:pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-medium">{layer.name}</p>
            <p className="mt-1 text-sm text-foreground/80">{layer.question}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {layer.how}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Work routes to targets that can actually run it. */
export function RoutingFigure() {
  const targets = [
    {
      name: "platform/aws-production",
      capabilities: ["hardened-runtime", "backup-enabled", "pci-dss"],
      accepts: true,
    },
    {
      name: "platform/aws-nonproduction",
      capabilities: [],
      accepts: false,
    },
  ]

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b px-5 py-4 text-xs text-muted-foreground">
        <span className="font-mono text-foreground">checkout/cart-service</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span>requires</span>
        <Pill tone="primary">pci-dss</Pill>
      </div>

      <ul className="divide-y">
        {targets.map((target) => (
          <li key={target.name} className="px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-sm">{target.name}</p>
              <span
                className={cn(
                  "text-xs font-medium",
                  target.accepts ? "text-success" : "text-muted-foreground",
                )}
              >
                {target.accepts ? "eligible" : "not eligible"}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {target.capabilities.length > 0 ? (
                target.capabilities.map((capability) => (
                  <Pill
                    key={capability}
                    tone={capability === "pci-dss" ? "primary" : "muted"}
                  >
                    {capability}
                  </Pill>
                ))
              ) : (
                <Pill tone="muted">no capabilities declared</Pill>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
