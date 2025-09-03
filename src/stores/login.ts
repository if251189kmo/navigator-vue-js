import { defineStore } from 'pinia'
import LocalStorage from 'src/constants/localStorage'
import type { LoginForm } from 'src/pages/login/types'
import { loginUser } from 'src/services/loginService'

const { AUTH_USER } = LocalStorage

type LoginStore = {
  token: string | null
  isAuth: boolean
}

// TODO: допрацювати
export const useLoginStore = defineStore('login', {
  state: (): LoginStore => ({
    token: localStorage.getItem(AUTH_USER) ?? null,
    isAuth: !!localStorage.getItem(AUTH_USER),
  }),
  actions: {
    async fetchLogin(form: LoginForm) {
      const data = await loginUser(form)

      const token = data ?? ''
      localStorage.setItem(AUTH_USER, token)

      this.token = token
      this.isAuth = true
    },
    logout() {
      localStorage.removeItem(AUTH_USER)

      this.token = null
      this.isAuth = false
    },
  },
  getters: {
    getAuth: (state) => state.isAuth,
  },
})

export type { LoginStore }
