import { defineStore } from 'pinia'

type DialogsStore = { dialogs: Record<string, { open: boolean }> }

export const useDialogsStore = defineStore('dialogs', {
  state: (): DialogsStore => ({
    dialogs: {},
  }),
  actions: {
    openDialog(name: string) {
      this.dialogs[name] = { open: true }
    },
    closeDialog(name: string) {
      delete this.dialogs[name]
    },
    closeAllDialogs() {
      this.dialogs = {}
    },
  },
})
