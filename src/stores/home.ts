import { defineStore } from 'pinia'
import type { FetchOptions } from 'src/boot/axios'
import { db } from 'src/db'
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
    // TODO: Зарефакторити
    async fetchTabs(params?: FetchOptions) {
      try {
        const { tabs, links } = await getTabs(params)

        this.home.tabs = tabs
        this.home.links = links

        await db.tabs.clear()
        await db.tabs.bulkAdd(tabs)

        await db.links.clear()
        await db.links.bulkAdd(links)
      } catch {
        this.home.tabs = await db.tabs.toArray()
        this.home.links = await db.links.toArray()
      }
    },
    async fetchLinks(params?: FetchOptions) {
      try {
        const links = await getLinks(params)

        this.home.links = links

        await db.links.clear()
        await db.links.bulkAdd(links)
      } catch {
        this.home.links = await db.links.toArray()
      }
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
    getLinks: (state) => {
      return state.home.links
    },
  },
})

export type { HomeStore }
