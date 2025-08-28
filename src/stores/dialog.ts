import { defineStore } from 'pinia'

type Dialogs = Record<string, { open: boolean }>

export const useDialogsStore = defineStore('dialogs', {
  state: () => ({
    dialogs: {} as Dialogs,
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
