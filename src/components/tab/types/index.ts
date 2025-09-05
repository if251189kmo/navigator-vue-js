import type { Link, Tab } from "src/models"

type RenderTabProps = {
  tab: Omit<Tab, "groups"> & {
    groups: (Tab["groups"][number] & { links: Link[] })[]
  }
}


export type { RenderTabProps }
