import type { FetchOptions } from 'boot/axios'
import { api, fetchWrapper } from 'boot/axios'
import type { CreateTabForm, DeleteTabForm, EditTabForm } from 'src/components/tab/types'
import Progresses from 'src/constants/progresses'
import urls from 'src/constants/urls'
import type { LinkServer, TabServer } from 'src/models'
import { useDialogsStore } from 'src/stores/dialog'
import { useHomeStore } from 'src/stores/home'
import { reselectTabForm } from './helpers'

const { NO_PROGRESS } = Progresses

const getTabs = async (params?: FetchOptions) => {
  const [{ data: tabs }, { data: links }] = await fetchWrapper(
    Promise.all([api.get<TabServer[]>(urls.tabs.get), api.get<LinkServer[]>(urls.links.get)]),
    params,
  )

  return { tabs, links }
}

const createTab = async (form: CreateTabForm) => {
  const homeStore = useHomeStore()
  const dialogsStore = useDialogsStore()

  await fetchWrapper(api.post(urls.tabs.post, reselectTabForm(form)))
  await homeStore.fetchTabs({ progressName: NO_PROGRESS })
  dialogsStore.closeAllDialogs()
}

const editTab = async (form: EditTabForm) => {
  const homeStore = useHomeStore()
  const dialogsStore = useDialogsStore()

  await fetchWrapper(api.put(urls.tabs.put(form.id), reselectTabForm(form)))
  await homeStore.fetchTabs({ progressName: NO_PROGRESS })
  dialogsStore.closeAllDialogs()
}

const deleteTab = async (id: DeleteTabForm) => {
  const homeStore = useHomeStore()
  const dialogsStore = useDialogsStore()

  await fetchWrapper(api.delete(urls.tabs.delete(id)))
  await homeStore.fetchTabs({ progressName: NO_PROGRESS })
  dialogsStore.closeAllDialogs()
}

const getLinks = async () => {
  const { data } = await fetchWrapper(api.get<LinkServer[]>(urls.links.get), {
    progressName: NO_PROGRESS,
  })
  return data
}

export { getTabs, editTab, createTab, deleteTab, getLinks }
