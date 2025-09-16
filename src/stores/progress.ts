import { defineStore } from 'pinia'
import type Progresses from 'src/constants/progresses'

type ProgressesStore = {
  progresses: { [Key in Progresses]?: { run: boolean } }
}

export const useProgressStore = defineStore('progresses', {
  state: (): ProgressesStore => ({
    progresses: {},
  }),
  actions: {
    openProgress(name: Progresses) {
      this.progresses[name] = { run: true }
    },
    closeProgress(name: Progresses) {
      delete this.progresses[name]
    },
    closeAllProgresses() {
      this.progresses = {}
    },
  },
})
