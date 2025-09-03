import { defineStore } from 'pinia'
import type { Tab } from 'src/models'
import { getTabs } from 'src/services/tabsService'

type HomeStore = {
  home: {
    tabs: Tab[]
  }
}

export const useHomeStore = defineStore('home', {
  state: (): HomeStore => ({
    home: {
      tabs: [],
    },
  }),
  actions: {
    async fetchTabs() {
      this.home.tabs = (await getTabs()) || []
    },
  },
  getters: {
    getTabs: (state) => state.home.tabs,
  },
})
