import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site/site-header"
import { WipBanner } from "@/components/site/wip-banner"
import { SiteFooter } from "@/components/site/site-footer"
import { GitHubIcon } from "@/components/site/icons"
import { PortalShot } from "@/components/site/portal-shot"
import {
  AuthorizationLayers,
  ConvergeFigure,
  RoutingFigure,
} from "@/components/site/figures"
import {
  Card,
  Pill,
  Section,
  SectionHeading,
  Term,
} from "@/components/site/primitives"
import { site } from "@/lib/site"

const modules = [
  {
    name: "Catalog",
    answers: "What software exists, and how is it related?",
    holds: ["BusinessDomain", "SoftwareSystem", "Component", "Api", "Resource"],
  },
  {
    name: "Infrastructure",
    answers: "What is it delivered with?",
    holds: ["Blueprint", "ExecutionTarget", "Artifact"],
  },
  {
    name: "Delivery",
    answers: "How does a declaration become running software?",
    holds: [
      "InstanceSpec",
      "Environment",
      "RuntimeInstance",
      "Deployment",
      "Release",
    ],
  },
  {
    name: "Governance",
    answers: "Should this happen?",
    holds: ["Policy", "PolicyVersion", "AuditLog"],
  },
  {
    name: "Organization",
    answers: "Who is involved, and what may they do?",
    holds: ["User", "Group", "Role", "Permission"],
  },
]

const capabilities = [
  {
    title: "Software catalog",
    body: "Business domains nest into a validated ladder; systems group the components, APIs and resources that form a capability. Purely definitional — declarations, never runtime facts.",
  },
  {
    title: "Configuration management",
    body: "Immutable, content-hashed revisions pinned per runtime instance, layered system → component → environment → stamp. Secrets referenced by vault path, never carried.",
  },
  {
    title: "Infrastructure orchestration",
    body: "Blueprints pin their provisioner and source, and are only offered once confirmed fetchable. A version that cannot be retrieved is never handed out and then failed on.",
  },
  {
    title: "Environments and stamps",
    body: "An environment subdivides into stamps — per country for residency, per region for latency — and the workload declares how many it occupies. Ephemeral ones carry a lease and expire.",
  },
  {
    title: "Progressive delivery",
    body: "Traffic weights, analysis windows and abort thresholds are blueprint parameters, not control-plane assertions. A promotion names a stamp scope, so a geographic wave is an ordered sequence.",
  },
  {
    title: "Rollback as its own transition",
    body: "A rollback is a distinct kind of event from deploying an older artifact, because policy has to tell them apart — a rollback frequently bypasses gates a forward deployment must pass.",
  },
  {
    title: "Release provenance",
    body: "A release freezes its contents when it is ready and records every promotion, so “in which environments was this version tested before production?” has an answer.",
  },
  {
    title: "Policy that can be reconstructed",
    body: "An evaluation pins the exact policy version it enforced, so a later edit cannot silently rewrite what was applied. Policy is evaluated before dispatch, not audited after it lands.",
  },
  {
    title: "Audit by construction",
    body: "Every domain event is persisted as an audit entry unconditionally, whether or not anything reacts to it. The trail is a property of the model, not a feature bolted beside it.",
  },
]

const journeys = [
  {
    role: "A developer",
    arrives: "“I need this service running in staging.”",
    does: "Declares the component against a blueprint and names where it belongs. The configuration layers resolve, policy is evaluated, and the work is dispatched.",
    because:
      "The blueprint already carries the chart, the traffic weights and the dashboards — none of the runtime has to be learned to use it.",
  },
  {
    role: "A platform engineer",
    arrives: "“I need to change how every service is deployed.”",
    does: "Publishes a new blueprint version. Nothing pinned to the old one moves until its owner moves it, and where each version is in force stays visible.",
    because:
      "Versions are immutable and pinned, so the golden path can change without a synchronised migration across every team at once.",
  },
  {
    role: "Security and compliance",
    arrives: "“Show me what was running in production in March.”",
    does: "Reads the release, the promotions that carried it, and the policy version that was evaluated at the time.",
    because:
      "Every domain event is persisted as an audit entry unconditionally, and an evaluation pins the exact policy version it enforced.",
  },
]

const scenarios = [
  {
    title: "A review environment that cleans itself up",
    body: "Ephemeral environments carry a lease and a TTL, so a pull-request environment expires on its own instead of accruing cost until someone notices.",
  },
  {
    title: "A payment provider that differs per country",
    body: "A stamp-layer override, not a reason to fork the component or duplicate the environment. The narrowest layer wins and the rest is shared.",
  },
  {
    title: "A regulated workload that cannot land anywhere",
    body: "The component requires a capability; only execution targets declaring it are eligible. Policy is evaluated before dispatch, not audited after it lands.",
  },
  {
    title: "Germany before France, with a look in between",
    body: "A promotion names a stamp scope, so a geographic wave is an ordered sequence of promotions with a human able to check between them.",
  },
]

const stack = [
  { name: ".NET 10", role: "Every service" },
  { name: "Aspire", role: "Composition and local run" },
  { name: "HotChocolate", role: "The GraphQL surface" },
  { name: "Temporal", role: "Durable workflows" },
  { name: "PostgreSQL", role: "Persistence, via EF Core" },
  { name: "OpenIddict", role: "Identity and tokens" },
  { name: "Blazor + MudBlazor", role: "The Portal" },
  { name: "YARP", role: "The gateway" },
  { name: "OpenTelemetry", role: "Traces, metrics, logs" },
  { name: "Redis", role: "Cache and subscriptions" },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <WipBanner />
      <SiteHeader />

      <main className="flex-1">
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative overflow-hidden border-b">
          <div
            className="grid-backdrop pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div
            className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[38rem]"
            aria-hidden="true"
          />

          <div className="container relative pb-16 pt-20 md:pb-24 md:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <Link
                  href={site.org}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex max-w-full items-center gap-2 rounded-full border bg-card/80 py-1 pl-1.5 pr-3 text-xs backdrop-blur transition-colors hover:border-foreground/20"
                >
                  <Pill tone="primary" className="whitespace-nowrap">
                    Open source
                  </Pill>
                  <span className="whitespace-nowrap text-muted-foreground">
                    Apache 2.0
                    <span className="hidden xs:inline">
                      , and in active development
                    </span>
                  </span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                Know what is running.
                <br />
                <span className="text-primary">And what should be.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Lembos is an internal developer platform built on versioned
                building blocks. It records the software you have and the shape
                it should take in every environment, observes what is actually
                there, and closes the gap between the two.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href={site.deploy} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon className="mr-2 h-4 w-4" />
                    Install Lembos
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#what-it-is">
                    See what it does
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <PortalShot
                src="/portal/catalog-light.png"
                srcDark="/portal/catalog-dark.png"
                alt="The Lembos Portal listing business domains, each with its type, parent, owner and status."
                ratio={1.6}
                priority
              />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                The Portal, showing the catalog of a sample retailer the platform
                seeds in development.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* What it is                                                        */}
        {/* ---------------------------------------------------------------- */}
        <Section id="what-it-is">
          <SectionHeading
            eyebrow="What it is"
            title="Not only a portal. Not only a catalog."
            lead="Lembos is the system that controls how software is deployed, configured and governed. A portal is how people reach it, and a catalog is part of what it knows — neither is the thing itself."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                A catalog says
              </p>
              <p className="mt-3 text-lg leading-snug">
                this component exists, and this team owns it.
              </p>
            </Card>
            <Card>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                A pipeline says
              </p>
              <p className="mt-3 text-lg leading-snug">
                this ran, and it exited zero.
              </p>
            </Card>
            <Card className="border-primary/30 bg-primary/[0.04]">
              <p className="font-mono text-xs uppercase tracking-wider text-primary">
                Lembos says
              </p>
              <p className="mt-3 text-lg leading-snug">
                this is what should be running here, this is what is, and here is
                what closes the difference.
              </p>
            </Card>
          </div>

          <div className="mt-12 rounded-xl border bg-background-gray p-6 md:p-8">
            <p className="text-pretty leading-relaxed text-muted-foreground">
              <span className="text-foreground">
                The catalog is purely definitional.
              </span>{" "}
              It holds declarations and never runtime facts. That boundary is
              what lets one component run a different version in every place it
              runs, with the per-environment truth living on a runtime instance
              instead of forcing the catalog to describe every case.
            </p>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Versioned building blocks                                         */}
        {/* ---------------------------------------------------------------- */}
        <Section className="bg-background-gray">
          <SectionHeading
            eyebrow="The idea underneath"
            title="Every building block is an entity plus immutable revisions"
            lead="The entity is what everything names. The revision is what a deployment pins. Blueprints, configuration, API contracts, policies and environments all work this way, which is what makes the rest of the platform expressible rather than aspirational."
          />

          <div className="mt-12">
            <PortalShot
              src="/portal/blueprint-versions-light.png"
              srcDark="/portal/blueprint-versions-dark.png"
              alt="The versions of a blueprint in the Portal: 2.5.0-rc.1 draft, 2.4.0 published and current, 2.3.0 withdrawn, 2.2.0 deprecated."
              ratio={2.6}
              caption="One status machine across every versioned thing. Draft is part of it, so everything has somewhere to sit before it is live — and a version whose artifact cannot be fetched is never handed out."
            />
          </div>

          <dl className="mt-14 grid gap-8 md:grid-cols-3">
            <Term name="Reproducibility">
              A published revision cannot change under anything pinned to it, so
              replaying a deployment a month later produces the same result.
            </Term>
            <Term name="Divergence on purpose">
              Staging a version ahead, a canary stamp on a newer artifact, a
              region on an older blueprint — environments differing <em>is</em>{" "}
              progressive delivery, not a failure to converge.
            </Term>
            <Term name="One question, one answer">
              “Which version is in effect here” means the same thing whether the
              block is a blueprint, a configuration, an API contract, a policy or
              a workload declaration.
            </Term>
          </dl>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Convergence                                                       */}
        {/* ---------------------------------------------------------------- */}
        <Section>
          <SectionHeading
            eyebrow="Convergence"
            title="Lembos converges rather than merely deploys"
            lead="Recording current state alone answers “what is running” but not “is that what we asked for” — which is precisely the question when a configuration was published and never deployed, a rollout half-completed, or someone edited a cluster by hand."
          />

          <div className="mt-12">
            <ConvergeFigure />
          </div>

          <p className="mt-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            Every building block records both what should be running and what is.
            The difference between the two is drift, and closing it is the work.
            Automated deployment is one way to close it. Reconciliation, rollback
            and progressive rollout are others.
          </p>

          <div className="mt-12">
            <PortalShot
              src="/portal/environment-prod-light.png"
              srcDark="/portal/environment-prod-dark.png"
              alt="A production environment in the Portal, subdivided into eu-north and eu-west slots, each reporting live and healthy."
              ratio={1.5}
              caption="A production environment subdivided into two regional slots, each reporting for itself. Drift is a field with an answer in it — here, “matches what was asked for”."
            />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* The model                                                         */}
        {/* ---------------------------------------------------------------- */}
        <Section id="model" className="bg-background-gray">
          <SectionHeading
            eyebrow="The model"
            title="Five modules, each an invariant boundary"
            lead="Aggregates inside a module enforce rules over each other. Anything across a boundary is referenced rather than navigated to. Read them in order: what software exists, what it is delivered with, how it gets there, whether it may, and who is involved."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.name} className="flex flex-col">
                <h3 className="text-lg font-semibold">{module.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {module.answers}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {module.holds.map((aggregate) => (
                    <span
                      key={aggregate}
                      className="rounded border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {aggregate}
                    </span>
                  ))}
                </div>
              </Card>
            ))}

            <Card className="flex flex-col justify-between border-dashed">
              <div>
                <h3 className="text-lg font-semibold">The whole model</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Aggregates, lifecycles, behaviours and the events they raise —
                  documented per module and kept current with the code.
                </p>
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Published with the platform source
              </p>
            </Card>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Typed by contract, not by label
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                A component or resource declares the blueprint that defines it,
                so “what is this thing” resolves to a shape the platform can act
                on rather than a string someone typed. What each entity provides,
                consumes and depends on is held as references, so the graph can
                be traversed without loading half the catalog.
              </p>
            </div>
            <PortalShot
              src="/portal/component-light.png"
              srcDark="/portal/component-dark.png"
              alt="A component page in the Portal showing its blueprint, owner and a relations graph of what it consumes and depends on."
              ratio={1.6}
            />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Capabilities                                                      */}
        {/* ---------------------------------------------------------------- */}
        <Section id="capabilities">
          <SectionHeading
            eyebrow="Capabilities"
            title="What the platform carries"
            lead="Each of these is a feature of the model rather than an integration sitting beside it."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <div key={capability.title} className="bg-card p-6">
                <h3 className="font-semibold">{capability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {capability.body}
                </p>
              </div>
            ))}
          </div>

        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Governance                                                        */}
        {/* ---------------------------------------------------------------- */}
        <Section className="bg-background-gray">
          <SectionHeading
            eyebrow="Guardrails"
            title="Access control is three layers, not one"
            lead="Each answers a different question, and collapsing them into one mechanism fails whichever mechanism is chosen. RBAC alone cannot express “production is restricted to a few people while anyone may create a dev environment”."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <AuthorizationLayers />

            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                And work only routes where it can run
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Execution targets declare capabilities, and intent is matched
                against them before anything is dispatched. Adding a runtime
                surface means adding a target, not changing orchestration logic.
              </p>
              <div className="mt-6">
                <RoutingFigure />
              </div>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* How it is used                                                    */}
        {/* ---------------------------------------------------------------- */}
        <Section id="how-it-is-used">
          <SectionHeading
            eyebrow="How it is used"
            title="Three people, one system of record"
            lead="Lembos is adopted by a whole engineering organisation rather than by one team, because the three questions below are usually answered by three different systems that disagree with each other."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {journeys.map((journey) => (
              <Card key={journey.role} className="flex flex-col">
                <h3 className="font-semibold">{journey.role}</h3>
                <p className="mt-3 text-pretty leading-snug text-foreground/90">
                  {journey.arrives}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {journey.does}
                </p>
                <p className="mt-auto border-t pt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="text-foreground">Because </span>
                  {journey.because}
                </p>
              </Card>
            ))}
          </div>

          <h3 className="mt-16 text-2xl font-semibold tracking-tight">
            What that looks like in practice
          </h3>

          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
            {scenarios.map((scenario) => (
              <div key={scenario.title} className="bg-card p-6">
                <h4 className="font-medium">{scenario.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {scenario.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <PortalShot
              src="/portal/releases-light.png"
              srcDark="/portal/releases-dark.png"
              alt="A release in the Portal walking from dev through test and staging, with production waiting on an ordered deployment across its eu-west and eu-north slots."
              ratio={2.6}
              caption="One release, frozen to an artifact digest, walking the environments. Production is the last stop and takes its slots in order — which is what makes “where was this tested before production” a question with an answer."
            />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* What you operate                                                  */}
        {/* ---------------------------------------------------------------- */}
        <Section id="built-with">
          <SectionHeading
            eyebrow="What you operate"
            title="A platform you run yourself"
            lead="There is no hosted Lembos. It is one .NET solution composed by Aspire — an orchestrator behind a single GraphQL endpoint, an identity server, a worker running durable workflows, and the Portal — provisioning into execution targets you own."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {stack.map((item) => (
              <div key={item.name} className="bg-card px-5 py-4">
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.role}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            It installs with a Helm chart — the four services, a setup job that
            makes every secret and key, and PostgreSQL, Redis and Temporal run
            simply, highly available or as services you already have. The{" "}
            <Link
              href={site.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              deploy repository
            </Link>{" "}
            covers it, down to running it on a local k3s.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* CTA                                                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative overflow-hidden border-b">
          <div
            className="brand-glow pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div className="container relative py-20 text-center md:py-28">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              The reasoning will be in the open too
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Decision records state why the architecture is the way it is, one
              document per decision. Enhancement proposals hold the changes not
              yet decided. Both are published with the platform source; until
              then, the chart that installs it is public.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href={site.deploy} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="mr-2 h-4 w-4" />
                  lembosproj/deploy
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={site.org} target="_blank" rel="noopener noreferrer">
                  Follow on GitHub
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Questions, or interested in contributing?{" "}
              <Link
                href={`mailto:${site.email}`}
                className="text-primary hover:underline"
              >
                {site.email}
              </Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
