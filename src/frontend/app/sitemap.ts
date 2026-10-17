import type { MetadataRoute } from "next"

import { site } from "@/lib/site"
import { source } from "@/lib/source"

/* A static export has no request to generate this on. */
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...source.getPages().map((page) => ({
      url: `${site.url}${page.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
