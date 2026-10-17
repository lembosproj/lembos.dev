import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

import { Releases } from "@/components/releases"
import { PortalShot } from "@/components/site/portal-shot"

/**
 * A Portal capture from public/portal, by name: `catalog` shows
 * catalog-light.png or catalog-dark.png, whichever matches the reader's theme.
 * `ratio` crops from the top, as on the landing page, for captures whose lower
 * half is empty.
 */
function Screenshot({
  name,
  alt,
  ratio,
}: {
  name: string
  alt: string
  ratio?: number
}) {
  return (
    <PortalShot
      src={`/portal/${name}-light.png`}
      srcDark={`/portal/${name}-dark.png`}
      alt={alt}
      ratio={ratio}
      className="not-prose my-6"
    />
  )
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Releases,
    Screenshot,
    Tab,
    Tabs,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents
