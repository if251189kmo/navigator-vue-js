import { api } from 'boot/axios'
import type { CreateTabForm } from 'src/components/tab/types'
import LocalStorage from 'src/constants/localStorage'
import urls from 'src/constants/urls'
import type { LinkUi } from 'src/models'
import { useDialogsStore } from 'src/stores/dialog'
import { useHomeStore, type HomeStore } from 'src/stores/home'
import { useProgressStore } from 'src/stores/progress'

const { AUTH_USER } = LocalStorage

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

const createTab = async ({ groups, ...rest }: CreateTabForm) => {
  const progressStore = useProgressStore()
  const homeStore = useHomeStore()
  const dialogsStore = useDialogsStore()

  const token = localStorage.getItem(AUTH_USER)
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const newForm = {
    ...rest,
    groups: Object.values(groups).map(({ linksIds, ...other }) => ({
      ...other,
      linksIds: linksIds.map((link: LinkUi) => link.id),
    })),
  }

  try {
    await api.post(urls.tabs.post, newForm, { headers })

    await homeStore.fetchTabs()
    dialogsStore.closeAllDialogs()
  } catch (err) {
    console.error(err)
  } finally {
    progressStore.closeProgress('page-progress')
  }
}

const deleteTab = async (id: number) => {
  const progressStore = useProgressStore()
  const homeStore = useHomeStore()
  const dialogsStore = useDialogsStore()

  const token = localStorage.getItem(AUTH_USER)
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    progressStore.openProgress('page-progress')

    await api.delete(urls.tabs.delete(id), { headers })

    await homeStore.fetchTabs()
    dialogsStore.closeAllDialogs()
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

export { getTabs, createTab, deleteTab, getLinks }
