import { api, fetchWrapper } from 'boot/axios'
import Dialogs from 'src/constants/dialogs'
import urls from 'src/constants/urls'
import type { LoginForm } from 'src/pages/login/types'
import { useDialogsStore } from 'src/stores/dialog'
import type { LoginStore } from 'src/stores/login'

const { LOGIN_DIALOG } = Dialogs
const { post } = urls.login

const loginUser = async (formData: LoginForm) => {
  const dialogsStore = useDialogsStore()
  const { data } = await fetchWrapper(api.post<LoginStore['token']>(post, formData))

  void dialogsStore.closeDialog(LOGIN_DIALOG)
  return data
}

export { loginUser }
