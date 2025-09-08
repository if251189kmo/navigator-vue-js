import type { DialogProps } from "src/components/dialog/types"
import type { TabUi } from "src/models/tab"

type TabProps = {
  tab: TabUi
}

type RenderTabProps = TabProps
type EditTabProps = TabProps['tab']
type DeleteTabProps = TabProps['tab']
type CreateTabProps = { dialogName: DialogProps['name'] }

export type { RenderTabProps, EditTabProps, DeleteTabProps, CreateTabProps }
