import { api } from 'boot/axios'
import urls from 'src/constants/urls'
import type { HomeStore } from 'src/stores/home'
import { useProgressStore } from 'src/stores/progress'

const getTabs = async () => {
  const progressStore = useProgressStore()

  try {
    progressStore.openProgress('page-progress')

    const [{ data: tabs }, { data: links }] = await Promise.all([
      api.get<HomeStore['home']['tabs']>(urls.tabs.get),
      api.get<HomeStore['home']['links']>(urls.links.get),
    ])

    return { tabs, links }
  } catch (err) {
    console.error(err)
  } finally {
    progressStore.closeProgress('page-progress')
  }
}

const getLinks = async () => {
  try {
    const { data } = await api.get<HomeStore['home']['links']>(urls.links.get)

    return data
  } catch (err) {
    console.error(err)
  }
}

export { getTabs, getLinks }
