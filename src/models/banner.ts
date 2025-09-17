import type { Bannerss, Statuses } from 'src/constants/banners'

type SingeltonBannerServer = Statuses | null
type ArrayBannerServer = {
  instancePath: string
  message: string
}

type BannerUi = { status: number; statusType: Statuses; type: Bannerss; message?: string }

export type { SingeltonBannerServer, ArrayBannerServer, BannerUi }
