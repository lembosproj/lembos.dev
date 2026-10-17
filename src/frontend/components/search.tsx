"use client"

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search"
import { useStaticSearch } from "fumadocs-core/search/client"

/**
 * Search over the index the export writes to /api/search. The site has no
 * server, so the whole index is downloaded once and queried in the browser.
 */
export default function DocsSearchDialog(props: SharedProps) {
  const search = useStaticSearch({
    from: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/search`,
  })

  return (
    <SearchDialog {...search} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList />
      </SearchDialogContent>
    </SearchDialog>
  )
}
