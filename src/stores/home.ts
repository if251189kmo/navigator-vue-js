import { defineStore } from 'pinia'
import type { Tab } from 'src/models'
import { getTabs } from 'src/services/tabsService'

export const useHomeStore = defineStore('home', {
  state: () => ({
    home: {
      tabs: [] as Tab[],
    },
  }),
  actions: {
    async fetchTabs() {
      this.home.tabs = (await getTabs()) || []
    },
  },
  // TODO: Selectors
  getters: {
    getTabs: (state) => state.home.tabs,
  },
})
