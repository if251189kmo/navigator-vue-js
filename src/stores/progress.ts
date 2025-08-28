import { defineStore } from 'pinia'

type Progresses = Record<string, { run: boolean }>

export const useProgressStore = defineStore('progresses', {
  state: () => ({
    progresses: {} as Progresses,
  }),
  actions: {
    openProgress(name: string) {
      this.progresses[name] = { run: true }
    },
    closeProgress(name: string) {
      delete this.progresses[name]
    },
    closeAllProgresses() {
      this.progresses = {}
    },
  },
})
