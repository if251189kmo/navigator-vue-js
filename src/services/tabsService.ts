import { api } from 'boot/axios'
import urls from 'src/constants/urls'
import type { Tab } from 'src/models'
import { useProgressStore } from 'src/stores/progress'

const { get } = urls.tabs

const getTabs = async () => {
  const progressStore = useProgressStore()

  try {
    progressStore.openProgress('page-progress')
    const { data } = await api.get<Tab[]>(get)
    return data
  } catch (err) {
    console.error(err)
  } finally {
    progressStore.closeProgress('page-progress')
  }
}

export { getTabs }
