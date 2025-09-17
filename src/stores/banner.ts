import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { Bannerss, type Statuses } from 'src/constants/banners'
import type { ArrayBannerServer, BannerUi, SingeltonBannerServer } from 'src/models/banner'

const { ERROR } = Bannerss

type ResponseError = ArrayBannerServer[] | Statuses
type BannerStore = {
  banners: { singelton: SingeltonBannerServer; array: ArrayBannerServer[] }
  errors: BannerUi[]
}

// UNAUTHORIZED
// [
//     {
//         "instancePath": "",
//         "message": "must have required property 'label'"
//     }
// ]

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

        if (Array.isArray(data)) this.banners.array = data
        else {
          this.banners.singelton = data
          this.errors = [...this.errors, { status, statusType: data, type: ERROR }]
        }
      }
    },
  },
  getters: {
    getBannerErrors: (state) => state.errors,
  },
})

export type { ResponseError }
