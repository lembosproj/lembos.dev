import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"

import { BrandMark } from "@/components/site/brand"
import { WipBanner } from "@/components/site/wip-banner"
import { source } from "@/lib/source"
import { site } from "@/lib/site"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <WipBanner />
      <DocsLayout
        tree={source.getPageTree()}
        nav={{ title: <BrandMark size="sm" />, url: "/" }}
        githubUrl={site.org}
      >
        {children}
      </DocsLayout>
    </>
  )
}
