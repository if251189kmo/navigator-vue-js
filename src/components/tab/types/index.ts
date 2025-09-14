import type { DialogProps } from 'src/components/dialog/types'
import type { TabUi } from 'src/models/tab'

type TabProps = {
  tab: TabUi
}

type LinksChipSlot = {
  opt: TabUi['groups'][number]['links'][number]
  removeAtIndex: (index: number) => void
  index: number
  chips: number
}

type LinksOptionsSlot = {
  opt: Record<string, TabUi['groups'][number]['links']>
  selected: boolean
  toggleOption: (opt: Record<string, TabUi['groups'][number]['links']>) => void
  itemProps: Record<string, unknown>
}

type CreateTabForm = {
  label: string
  groups: {
    [key: string]: {
      id: number
      name: string
      linksIds: Record<string, TabUi['groups'][number]['links']>
    }
  }
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
