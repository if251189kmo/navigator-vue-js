import { api } from 'boot/axios'
import urls from 'src/constants/urls'
import type { Tab } from 'src/models'

const getTabs = async () => {
  try {
    console.log('start progress')
    const { data } = await api.get<Tab[]>(urls.tabs.get)
    return data
  } catch (err) {
    console.error(err)
  } finally {
    console.log('finish progress')
  }
}

export { getTabs }
