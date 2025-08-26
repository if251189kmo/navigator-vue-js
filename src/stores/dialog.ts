import { defineStore } from 'pinia'

type Dialogs = Record<string, { open: boolean }>

export const useDialogsStore = defineStore('dialogs', {
  state: () => ({
    dialogs: { first: { name: 'first', open: true } } as Dialogs,
  }),
  actions: {
    openDialog(name: string) {
      this.dialogs[name] = { open: true }
    },
    closeDialog(name: string) {
      delete this.dialogs[name]
    },
    closeAll() {
      this.dialogs = {}
    },
  },
})
