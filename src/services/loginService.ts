import { api } from 'boot/axios'
import urls from 'src/constants/urls'
import type { LoginForm } from 'src/pages/login/types'
import { useProgressStore } from 'src/stores/progress'

const { post } = urls.login

const loginUser = async (formData: LoginForm) => {
  const progressStore = useProgressStore()

  try {
    progressStore.openProgress('page-progress')
    const { data } = await api.post<string | null>(post, formData)
    return data
  } catch (err) {
    console.error(err)
  } finally {
    progressStore.closeProgress('page-progress')
  }
}

export { loginUser }
