import { defineStore } from 'pinia'
import type { FetchOptions } from 'src/boot/axios'
import type { LinkServer, TabServer } from 'src/models'
import { getLinks, getTabs } from 'src/services/tabsService'

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
      links: [],
    },
  }),
  actions: {
    async fetchTabs(params?: FetchOptions) {
      const data = await getTabs(params)

      this.home.tabs = data?.tabs
      this.home.links = data?.links
    },
    async fetchLinks() {
      const links = await getLinks()

      this.home.links = links
    },
  },
  getters: {
    getTabs: (state) => {
      return state.home.tabs.map((tab) => ({
        ...tab,
        groups: tab.groups.map(({ linksIds, ...rest }) => ({
          ...rest,
          links: state.home.links.filter((l) => linksIds.includes(l.id)),
        })),
      }))
    },
    getLinks: (state) => state.home.links,
  },
})

export type { HomeStore }
