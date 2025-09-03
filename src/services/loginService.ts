import { api } from 'boot/axios'
import Dialogs from 'src/constants/dialogs'
import urls from 'src/constants/urls'
import type { LoginForm } from 'src/pages/login/types'
import { useDialogsStore } from 'src/stores/dialog'
import type { LoginStore } from 'src/stores/login'
import { useProgressStore } from 'src/stores/progress'

const { LOGIN_DIALOG, PROGRESS_PAGE } = Dialogs
const { post } = urls.login

const loginUser = async (formData: LoginForm) => {
  const progressStore = useProgressStore()
  const dialogsStore = useDialogsStore()

  try {
    progressStore.openProgress(PROGRESS_PAGE)
    const { data } = await api.post<LoginStore['token']>(post, formData)

    void dialogsStore.closeDialog(LOGIN_DIALOG)
    return data
  } catch (err) {
    console.error(err)
  } finally {
    progressStore.closeProgress(PROGRESS_PAGE)
  }
}

export { loginUser }
