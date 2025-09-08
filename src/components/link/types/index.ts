import type { RenderTabProps } from "src/components/tab/types"

type LinksProps = {
  group: RenderTabProps['tab']['groups'][number]
}

type RenderLinksProps = LinksProps
type EditLinksProps = LinksProps
type DeleteLinksProps = LinksProps

export type { EditLinksProps, DeleteLinksProps, RenderLinksProps }