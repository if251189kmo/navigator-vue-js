import type { Table } from 'dexie'
import Dexie from 'dexie'
import type { LinkServer, TabServer } from 'src/models'

export class MyDatabase extends Dexie {
  links!: Table<LinkServer, number>
  tabs!: Table<TabServer, number>

  constructor() {
    super('MyDatabase')
    this.version(1).stores({
      links: 'id, url, label, code, new, order',
      tabs: 'id, name, groups',
    })
  }
}

export const db = new MyDatabase()
