import { defineStore } from 'pinia'

type ProgressesStore = {
  progresses: Record<string, { run: boolean }>
}

export const useProgressStore = defineStore('progresses', {
  state: (): ProgressesStore => ({
    progresses: {},
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
