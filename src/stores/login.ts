import { defineStore } from 'pinia'
import type { LoginForm } from 'src/pages/login/types'
import { loginUser } from 'src/services/loginService'

// TODO: допрацювати
export const useLoginStore = defineStore('login', {
  state: () => ({
    token: null as string | null,
    isAuth: false,
  }),
  actions: {
    async fetchLogin(form: LoginForm) {
      const token = await loginUser(form)

      this.token = token || null
      this.isAuth = !!token
    },
  },
  getters: {
    getAuth: (state) => state.isAuth,
  },
})
