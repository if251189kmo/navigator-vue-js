import { defineStore } from 'pinia'

// TODO: допрацювати
export const useLoginStore = defineStore('login', {
  state: () => ({
    token: null as string | null,
    isAuth: false,
  }),
  actions: {
    fetchLogin() {
      this.isAuth = !this.isAuth
    },
  },
})
