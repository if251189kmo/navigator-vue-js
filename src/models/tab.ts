import type { LinkServer, LinkUi } from './link'

type TabServer = {
  id: number
  label: string
  iconUrl: string
  order: number
  groups: {
    id: number
    name: string
    linksIds: LinkServer['id'][]
  }[]
}

type TabUi = {
  id: TabServer['id']
  label: TabServer['label']
  iconUrl: TabServer['iconUrl']
  order: TabServer['order']
  groups: {
    id: TabServer['groups'][number]['id']
    name: TabServer['groups'][number]['name']
    links: LinkUi[]
  }[]
}

export type { TabServer, TabUi }
