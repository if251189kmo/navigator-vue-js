import { defineStore } from 'pinia'
import type { Tab } from 'src/services/tabsService'
import { getTabs } from 'src/services/tabsService'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    list: [] as Tab[],
  }),
  actions: {
    async fetchTabs() {
      this.list = await getTabs()
    },
  },
})
