import { defineStore } from 'pinia'
import type { LinkServer, TabServer } from 'src/models'
import { getTabs } from 'src/services/tabsService'

type HomeStore = {
  home: {
    tabs: TabServer[]
    links: LinkServer[]
  }
}

export const useHomeStore = defineStore('home', {
  state: (): HomeStore => ({
    home: {
      tabs: [],
      links: []
    },
  }),
  actions: {
    async fetchTabs() {
      const data = await getTabs()

      this.home.tabs = data?.tabs || []
      this.home.links = data?.links || []
    },
  },
  getters: {
    getTabs: (state) => {
      return state.home.tabs.map(tab => ({
        ...tab,
        groups: tab.groups.map(group => ({
          ...group,
          links: state.home.links.filter(l => group.linksIds.includes(l.id))
        }))
      }))
    }
  }
})

export type { HomeStore }
