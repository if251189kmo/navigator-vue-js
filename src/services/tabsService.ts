import { api } from 'boot/axios'
import urls from 'src/constants/urls'
import type { Link, Tab } from 'src/models'
import { useProgressStore } from 'src/stores/progress'

const getTabs = async () => {
  const progressStore = useProgressStore()

  try {
    progressStore.openProgress('page-progress')

    const [{ data: tabs }, { data: links }] = await Promise.all([
      api.get<Tab[]>(urls.tabs.get),
      api.get<Link[]>(urls.links.get),
    ])

    return { tabs, links }
  } catch (err) {
    console.error(err)
  } finally {
    progressStore.closeProgress('page-progress')
  }
}

export { getTabs }
