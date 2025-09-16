import { defineBoot } from '#q-app/wrappers'
import axios, { type AxiosInstance } from 'axios'
import LocalStorage from 'src/constants/localStorage'
import Progresses from 'src/constants/progresses'
import { useProgressStore } from 'src/stores/progress'

const { AUTH_USER } = LocalStorage
const { PROGRESS_PAGE, NO_PROGRESS } = Progresses

const evn = {
  isDEV: process.env.NODE_ENV === 'development',
  dev: process.env.APP_DEV_BASE_URL || '',
  prod: process.env.APP_PROD_BASE_URL || '',
}

const baseURL = evn.isDEV ? evn.dev : evn.prod

type FetchOptions = { progressName?: Progresses }

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const api = axios.create({ baseURL })

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_USER)
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => error,
)

async function fetchWrapper<T>(promise: Promise<T>, options: FetchOptions = {}) {
  const progressStore = useProgressStore()
  const { progressName = PROGRESS_PAGE } = options

  if (progressName !== NO_PROGRESS) progressStore.openProgress(progressName)

  try {
    const response = await promise
    return response
  } catch (err) {
    console.error('Request failed:', err)
    throw err
  } finally {
    if (progressName !== NO_PROGRESS) progressStore.closeProgress(progressName)
  }
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, fetchWrapper }
export type { FetchOptions }
