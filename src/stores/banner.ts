import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ServerStatuses } from 'src/constants/serverStatuses'
import { singeltonBanner } from 'src/layouts/banner/utils'
import type { ArrayBannerServer, BannerUi, SingeltonBannerServer } from 'src/models/banner'

const { INTERNAL_SERVER } = ServerStatuses

type ResponseError = ArrayBannerServer[] | ServerStatuses
type BannerStore = {
  banners: { singelton: SingeltonBannerServer; array: ArrayBannerServer[] }
  errors: BannerUi[]
}

export const useBannerStore = defineStore('banner', {
  state: (): BannerStore => ({
    banners: { singelton: null, array: [] },
    errors: [],
  }),
  actions: {
    setBanners(error: AxiosError<ResponseError>) {
      const { response } = error

      if (response) {
        const { status, data } = response

        // TODO: обробити помилки валідації порм
        if (Array.isArray(data)) this.banners.array = data
        else {
          this.banners.singelton = data
          this.errors = [...this.errors, singeltonBanner({ status, statusType: data })]
        }
      } else {
        const err = { status: 500, statusType: INTERNAL_SERVER }

        this.banners.singelton = err.statusType
        this.errors = [...this.errors, singeltonBanner(err)]
      }
    },
    resetBanners(index?: number) {
      if (typeof index === 'number') this.errors = this.errors.filter((_, i) => i !== index)
      else this.errors = []
    },
  },
  getters: {
    getBannerErrors: (state) => state.errors,
  },
})

export type { ResponseError }
