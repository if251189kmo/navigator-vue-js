type LinkServer = {
  id: number
  code?: number
  label: string
  url: string
  new: boolean
  order: number
}

type LinkUi = LinkServer

export type { LinkServer, LinkUi }