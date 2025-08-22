import { api } from 'boot/axios'

export interface Tab {
  id: number
  label: string
  iconUrl: string
  order: number
}

export const getTabs = async (): Promise<Tab[]> => {
  const { data } = await api.get<Tab[]>('/navigator/tabs')
  return data
}
