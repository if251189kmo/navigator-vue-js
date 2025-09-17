import type { Bannerss } from 'src/constants/banners'
import type { ServerStatuses } from 'src/constants/serverStatuses'

type SingeltonBannerServer = ServerStatuses | null
type ArrayBannerServer = {
  instancePath: string
  message: string
}

type BannerUi = {
  status: number
  statusType?: ServerStatuses
  type: Bannerss
  instancePath?: string
  message?: string
}

export type { SingeltonBannerServer, ArrayBannerServer, BannerUi }
