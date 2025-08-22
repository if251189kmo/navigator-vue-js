import { defineBoot } from '#q-app/wrappers'
import axios, { type AxiosInstance } from 'axios'

const evn = {
  isDEV: process.env.NODE_ENV === 'development',
  dev: process.env.APP_DEV_BASE_URL || '',
  prod: process.env.APP_PROD_BASE_URL || '',
}

const baseURL = evn.isDEV ? evn.dev : evn.prod

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const api = axios.create({ baseURL })

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
