import type { DialogProps } from 'src/components/dialog/types'
import type { TabUi } from 'src/models/tab'

type TabProps = { tab: TabUi }
type TabLinks = Record<string, TabUi['groups'][number]['links']>

type LinksChipSlot = {
  opt: TabLinks
  index: number
  chips: number
  removeAtIndex: (index: LinksChipSlot['index']) => void
}

type LinksOptionsSlot = {
  opt: TabLinks
  selected: boolean
  toggleOption: (opt: LinksOptionsSlot['opt']) => void
  itemProps: TabLinks
}

type CreateTabForm = {
  order: TabUi['order']
  iconUrl: TabUi['iconUrl']
  label: TabUi['label']
  groups: Record<string, TabUi['groups'][number]>
}

type DeleteTabForm = TabUi['id']

type EditTabForm = {
  id: TabUi['id']
  order: TabUi['order']
  iconUrl: TabUi['iconUrl']
  label: TabUi['label']
  groups: Record<string, TabUi['groups'][number]>
}

type RenderTabProps = TabProps
type EditTabProps = { tab: TabProps['tab']; dialogName: DialogProps['name'] }
type DeleteTabProps = { id: TabProps['tab']['id']; dialogName: DialogProps['name'] }
type CreateTabProps = { dialogName: DialogProps['name'] }

export type {
  RenderTabProps,
  EditTabProps,
  DeleteTabProps,
  CreateTabProps,
  CreateTabForm,
  EditTabForm,
  DeleteTabForm,
  LinksChipSlot,
  LinksOptionsSlot,
  TabLinks,
}
