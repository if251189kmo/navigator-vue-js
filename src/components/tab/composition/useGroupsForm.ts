import { computed } from 'vue'
import { titles } from './../json/index.json'
import type { CreateTabForm, EditTabForm } from '../types'

type Values = CreateTabForm | EditTabForm
type UseGroupsForm = {
  values: Values
  setFieldValue: (field: keyof Values, value: Values[keyof Values]) => void
}

export function useGroupsForm({ values, setFieldValue }: UseGroupsForm) {
  const groups = computed(() => Object.keys(values.groups || {}))

  const getChipsLength = (groupKey: string) =>
    Array.isArray(values.groups[groupKey]?.links) ? values.groups[groupKey]?.links.length : 0

  const onCreateBlock = () => {
    const oldGroups = groups.value
    const id = oldGroups.length ? Math.max(...oldGroups.map(Number)) + 1 : 1
    const newGroups = {
      ...values.groups,
      [id]: { id, name: `${titles.create}${id}`, links: [] },
    }
    setFieldValue('groups', newGroups)
  }

  const onDeleteBlock = (id: string) => {
    const oldGroups = { ...values.groups }
    delete oldGroups[id]
    setFieldValue('groups', oldGroups)
  }

  return {
    groups,
    getChipsLength,
    onCreateBlock,
    onDeleteBlock,
  }
}
