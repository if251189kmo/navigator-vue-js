import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { Bannerss } from 'src/constants/banners'
import { ServerStatuses } from 'src/constants/serverStatuses'
import { singeltonBanner } from 'src/layouts/banner/utils'
import type { ArrayBannerServer, BannerUi, SingeltonBannerServer } from 'src/models/banner'

const { ERROR, WARNING, SUCCESS, INFO } = Bannerss
const { UNAUTHORIZED, BAD_REQUEST, SUCCES } = ServerStatuses

type ResponseError = ArrayBannerServer[] | ServerStatuses
type BannerStore = {
  banners: { singelton: SingeltonBannerServer; array: ArrayBannerServer[] }
  errors: BannerUi[]
}

export const useBannerStore = defineStore('banner', {
  state: (): BannerStore => ({
    banners: { singelton: null, array: [] },
    errors: [
      { status: 100, message: "It's INFO message", type: INFO },
      { status: 300, message: "It's WARNING message", type: WARNING },
      { status: 200, statusType: SUCCES, message: 'Обновлено', type: SUCCESS },
      { status: 401, statusType: UNAUTHORIZED, message: 'Не авторизовано', type: ERROR },
      //   { status: 100, type: INFO },
      //   { status: 300, type: WARNING },
      //   { status: 200, statusType: SUCCES, type: SUCCESS },
      //   { status: 401, statusType: UNAUTHORIZED, type: ERROR },
      //   { status: 100, type: INFO },
      //   { status: 300, type: WARNING },
      //   { status: 200, statusType: SUCCES, type: SUCCESS },
      //   { status: 401, statusType: UNAUTHORIZED, type: ERROR },
      //   { status: 100, type: INFO },
      //   { status: 300, type: WARNING },
      //   { status: 200, statusType: SUCCES, type: SUCCESS },
      //   { status: 401, statusType: UNAUTHORIZED, type: ERROR },
      {
        status: 400,
        statusType: BAD_REQUEST,
        type: ERROR,
        instancePath: 'label',
        message:
          "must have required property 'label' must have required property 'label'must have required property 'label' must have required property 'label'",
      },
    ],
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
