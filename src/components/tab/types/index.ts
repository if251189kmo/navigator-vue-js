import type { DialogProps } from 'src/components/dialog/types'
import type { LinkUi } from 'src/models'
import type { TabUi } from 'src/models/tab'

type TabProps = { tab: TabUi }
type TabLinks = TabUi['groups'][number]['links']

type LinksChipSlot = {
  opt: TabLinks[number]
  removeAtIndex: (index: number) => void
  index: number
  chips: number
}

type LinksOptionsSlot = {
  opt: Record<string, TabLinks>
  selected: boolean
  toggleOption: (opt: Record<string, TabLinks>) => void
  itemProps: Record<string, TabLinks>
}

type CreateTabForm = {
  order: TabUi['order']
  iconUrl: TabUi['iconUrl']
  label: TabUi['label']
  groups: Record<
    string,
    Omit<TabUi['groups'][number], 'linksIds' | 'links'> & {
      linksIds: LinkUi[]
    }
  >
}

type RenderTabProps = TabProps
type EditTabProps = TabProps['tab']
type DeleteTabProps = TabProps['tab']
type CreateTabProps = { dialogName: DialogProps['name'] }

export type {
  RenderTabProps,
  EditTabProps,
  DeleteTabProps,
  CreateTabProps,
  CreateTabForm,
  LinksChipSlot,
  LinksOptionsSlot,
}
