import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site/site-header"
import { WipBanner } from "@/components/site/wip-banner"
import { SiteFooter } from "@/components/site/site-footer"
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

// The Portal's three areas, as a reader meets them — not the modules the code is split into.
const areas = [
  {
    name: "Workspace",
    who: "For product teams",
    answers: "What software do we have, who owns it, and how does it ship?",
    holds: ["Business domains", "Systems", "Components", "APIs", "Resources", "Releases"],
  },
  {
    name: "Platform",
    who: "For platform, security and operations teams",
    answers: "How is it built, where does it run, and what is allowed?",
    holds: ["Blueprints", "Environments", "Execution targets", "Placement rules", "Policies", "Audit log"],
  },
  {
    name: "Organization",
    who: "For administrators",
    answers: "Who is involved, and what may each of them do?",
    holds: ["Users", "Groups", "Roles", "Service accounts"],
  },
]

const capabilities = [
  {
    title: "Software catalog",
    body: "Business areas, capabilities, systems, components, APIs and resources — with owners and dependencies, so you know what you have and who to ask.",
  },
  {
    title: "Configuration that ships with the code",
    body: "A component's settings are part of its versioned spec, so a release pins them and a rollback takes them back. Values layer common → environment → slot, and secrets stay in your vault — Lembos holds only where to find them.",
  },
  {
    title: "Golden paths",
    body: "Blueprints pin the tool, its version and where the recipe lives, and are offered only once Lembos has fetched them — a recipe that cannot be retrieved never reaches a team.",
  },
  {
    title: "Environments and slots",
    body: "Split an environment by country for data residency or by region for latency, and let each workload say which slots it needs. Review environments carry a lease and expire on their own.",
  },
  {
    title: "Progressive delivery",
    body: "Traffic weights, analysis windows and abort thresholds live in the blueprint. A promotion can name specific slots, so a regional rollout is a series of steps with a look in between.",
  },
  {
    title: "Rollback as its own step",
    body: "Rolling back is recorded differently from deploying an old version, so policies can treat it differently — a rollback often has to skip gates a new release must pass.",
  },
  {
    title: "Release history",
    body: "A release freezes its contents when it is ready and records every promotion, so “in which environments was this version tested before production?” has an answer.",
  },
  {
    title: "Policy you can look back on",
    body: "Every policy decision remembers the exact policy version that made it, so a later edit cannot change what was enforced. Policies are checked before work starts, not audited after.",
  },
  {
    title: "A complete audit trail",
    body: "Every change, by a person or by a machine, is recorded — whether or not anything else reacts to it. Nobody has to remember to turn it on.",
  },
]

const journeys = [
  {
    role: "A developer",
    arrives: "“I need this service running in staging.”",
    does: "Describes the component on a blueprint and picks where it should run. Lembos works out its settings, checks the policies and starts the deployment.",
    because:
      "The blueprint already carries the chart, the traffic weights and the dashboards — none of the runtime has to be learned to use it.",
  },
  {
    role: "A platform engineer",
    arrives: "“I need to change how every service is deployed.”",
    does: "Publishes a new blueprint version. Nothing on the old one moves until its owner moves it, and where each version is still in use stays visible.",
    because:
      "Published versions never change, so the golden path can move forward without every team migrating on the same day.",
  },
  {
    role: "Security and compliance",
    arrives: "“Show me what was running in production in March.”",
    does: "Reads the release, the promotions that carried it, and the policy version that was checked at the time.",
    because:
      "Every change is recorded, and every policy decision remembers the exact version of the policy it applied.",
  },
]

const scenarios = [
  {
    title: "A review environment that cleans itself up",
    body: "Ephemeral environments carry a lease, so a pull-request environment expires on its own instead of running up a bill until someone notices.",
  },
  {
    title: "A payment provider that differs per country",
    body: "An override on that country's slot — not a fork of the component, and not a copy of the environment. The most specific setting wins and the rest is shared.",
  },
  {
    title: "A regulated workload that cannot land anywhere",
    body: "The component requires a capability, and only the clusters or accounts that declare it can take it. Policy is checked before anything runs, not audited after.",
  },
  {
    title: "Germany before France, with a look in between",
    body: "A promotion names the slots it goes to, so a regional rollout is a series of promotions with a person able to check between them.",
  },
]

// What an organisation brings to run Lembos, rather than what Lembos is built with.
const operates = [
  { name: "A Kubernetes cluster", role: "Lembos installs into it with one Helm chart" },
  { name: "Your clouds and clusters", role: "Where it builds and deploys" },
  { name: "Your sign-in", role: "Invitations, or your GitHub organisation" },
  { name: "Your vault", role: "Secrets stay where they are" },
  { name: "Its own data stores", role: "PostgreSQL, Redis and Temporal — or yours" },
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
            className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-152"
            aria-hidden="true"
          />

          <div className="container relative pb-16 pt-20 md:pb-24 md:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <Link
                  href={site.org}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex max-w-full items-center gap-2 rounded-full border bg-card/80 py-1 pl-1.5 pr-3 text-xs backdrop-blur-sm transition-colors hover:border-foreground/20"
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
                  <Link href="/docs/quickstart">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
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
            <Card className="border-primary/30 bg-primary/4">
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
                One component, different everywhere it runs.
              </span>{" "}
              The catalog says what a component is; each environment records
              which version of it is running there. So staging can run a version
              ahead of production, one region can stay on an older build, and
              every one of those answers is true at once.
            </p>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Versioned building blocks                                         */}
        {/* ---------------------------------------------------------------- */}
        <Section className="bg-background-gray">
          <SectionHeading
            eyebrow="The idea underneath"
            title="Everything is versioned, so nothing changes under you"
            lead="Blueprints, configuration, API contracts, policies and environments are each published as versions. A deployment pins a version, and a published version never changes — so what you deployed is exactly what you can deploy again."
          />

          <div className="mt-12">
            <PortalShot
              src="/portal/blueprint-versions-light.png"
              srcDark="/portal/blueprint-versions-dark.png"
              alt="The versions of a blueprint in the Portal: 2.6.0 published and current, 2.5.0-rc.1 draft, 2.4.0 and 2.2.0 deprecated, 2.3.0 withdrawn because its artifact cannot be found."
              ratio={2.6}
              caption="Every version starts as a draft, so a change has somewhere to be reviewed before it is live — and a version whose source cannot be fetched is never offered to anyone."
            />
          </div>

          <dl className="mt-14 grid gap-8 md:grid-cols-3">
            <Term name="Reproducibility">
              A published version cannot change under anything that uses it, so
              repeating a deployment a month later produces the same result.
            </Term>
            <Term name="Divergence on purpose">
              Staging a version ahead, a canary slot on a newer build, a region
              on an older blueprint — differences between environments are
              deliberate, and you can see every one of them.
            </Term>
            <Term name="One question, one answer">
              “Which version is in effect here?” is asked and answered the same
              way for a blueprint, a configuration, an API contract or a policy.
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
            For everything it delivers, Lembos records both what should be
            running and what is.
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
        <Section id="portal" className="bg-background-gray">
          <SectionHeading
            eyebrow="In the Portal"
            title="Three areas, one for each kind of work"
            lead="Everything in Lembos is owned by a team and visible to the people who need it. Product teams describe and ship their software, platform teams publish the paths they ship on, and administrators decide who is involved."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {areas.map((area) => (
              <Card key={area.name} className="flex flex-col">
                <h3 className="text-lg font-semibold">{area.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {area.who}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {area.answers}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {area.holds.map((thing) => (
                    <span
                      key={thing}
                      className="rounded border px-1.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {thing}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
            <Card className="flex flex-col justify-between border-dashed">
              <div>
                <h3 className="text-lg font-semibold">A tour of each area</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  What every page is for and who uses it, with screenshots — from
                  describing your software to shipping it.
                </p>
              </div>
              <Link
                href="/docs/use"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Using Lembos
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Card>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Every component knows what it is
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                A component names the blueprint it is built from, so Lembos knows
                how to build, configure and deploy it — not just what it is
                called. What it provides, consumes and depends on is drawn as a
                graph, so you can see what a change might touch before you make
                it.
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
            lead="Built in from the start, rather than integrations sitting beside it."
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
            lead="Each answers a different question, and folding them into one mechanism fails whichever one is chosen. Roles alone cannot express “production is restricted to a few people while anyone may create a dev environment”."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <AuthorizationLayers />

            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                And work only goes where it can run
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Clusters and cloud accounts say what they can do, and each piece
                of work goes only where it can run. Adding a new kind of runtime
                means registering it, not rewriting how deployment works.
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
              alt="A release in the Portal that went from the sandbox into production, where it deployed to the eu-west slot first and eu-north second."
              ratio={2.6}
              caption="One release, frozen to an artifact and a spec version, walking the environments. Production is the last stop and takes its slots in order — which is what makes “where was this tested before production” a question with an answer."
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
            lead="There is no hosted Lembos. It runs in a Kubernetes cluster you operate, and builds into the cloud accounts and clusters you already own."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {operates.map((item) => (
              <div key={item.name} className="bg-card px-5 py-4">
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.role}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            One Helm chart installs it, makes every secret and key it needs, and
            runs simply or highly available. The{" "}
            <Link href="/docs/install" className="text-primary hover:underline">
              install guide
            </Link>{" "}
            covers it, and the{" "}
            <Link href="/docs/quickstart" className="text-primary hover:underline">
              quickstart
            </Link>{" "}
            runs it on a laptop.
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
              See it for yourself
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              The quickstart puts a complete Lembos on a local Kubernetes in about
              fifteen minutes — with a sample organisation to explore, if you
              want one.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/docs/quickstart">
                  Start the quickstart
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">Read the docs</Link>
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
