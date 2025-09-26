<template>
  <q-intersection transition="scale">
    <div :class="$style.webAppsList">
      <q-table :title="title" :rows="getLinks" :columns="columns" row-key="index">
        <template v-slot:body-cell-code="props">
          <q-td :class="$style.code" :props="props">
            <div>{{ props.row.code }}</div>
          </q-td>
        </template>
        <template v-slot:body-cell-label="props">
          <q-td :class="$style.label" :props="props">
            {{ props.row.label }}
          </q-td>
        </template>
        <template v-slot:body-cell-url="props">
          <q-td :class="$style.url" :props="props">
            <a :href="props.row.url" target="_blank" rel="noopener noreferrer">
              {{ props.row.url }}
            </a>
          </q-td>
        </template>
        <template v-slot:body-cell-new="props">
          <q-td :props="props">
            <q-icon v-if="props.row.new" color="positive" name="done" />
            <q-icon v-else color="negative" name="cancel" />
          </q-td>
        </template>
        <template v-if="getAuth" v-slot:body-cell-actions="props">
          <q-td :class="$style.actions" :props="props">
            <q-btn round size="0.5rem" @click="onEdit(props.row)" color="warning" icon="edit" />
            <q-btn
              round
              size="0.5rem"
              @click="onDelete(props.row.id)"
              color="negative"
              icon="delete"
            />
          </q-td>
        </template>
      </q-table>

      <div :class="$style.navigateBtn">
        <q-btn to="/" color="primary" v-bind="buttons.goHome" />
      </div>
    </div>
  </q-intersection>
</template>

// TODO: Доробити
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Progresses from 'src/constants/progresses'
import type { LinkUi } from 'src/models'
import { useHomeStore } from 'src/stores/home'
import { useLoginStore } from 'src/stores/login'
import { computed, toRaw } from 'vue'
import { title, table, buttons } from './json/index.json'

const { PROGRESS_PAGE } = Progresses
const homeStore = useHomeStore()
const loginStore = useLoginStore()
const { getAuth } = storeToRefs(loginStore)
const { getLinks } = storeToRefs(homeStore)

const columns = computed(() => {
  const base = [
    { name: 'id', align: 'left' as const, ...table.columns.id, field: (row: LinkUi) => row.id },
    {
      name: 'code',
      align: 'center' as const,
      ...table.columns.code,
      field: (row: LinkUi) => row.code,
    },
    {
      name: 'label',
      align: 'left' as const,
      ...table.columns.label,
      field: (row: LinkUi) => row.label,
    },
    { name: 'url', align: 'left' as const, ...table.columns.url, field: (row: LinkUi) => row.url },
    {
      name: 'new',
      align: 'center' as const,
      ...table.columns.new,
      field: (row: LinkUi) => row.new,
    },
    {
      name: 'order',
      align: 'center' as const,
      ...table.columns.order,
      field: (row: LinkUi) => row.order,
    },
  ]

  if (getAuth.value) {
    base.push({
      name: 'actions',
      align: 'center' as const,
      ...table.columns.actions,
      field: (row: LinkUi) => row.id,
    })
  }

  return base
})

const onEdit = (link: LinkUi) => {
  const raw = toRaw(link)

  console.log('onEdit', raw)
}
const onDelete = (id: LinkUi['id']) => {
  console.log('onDelete', id)
}

void homeStore.fetchLinks({ progressName: PROGRESS_PAGE })
</script>

<style module lang="scss">
.webAppsList {
  .navigateBtn {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .code > div {
    border-radius: 4px;
    border: 1px solid $accent;
  }

  .label {
    font-style: italic;
  }

  .url {
    color: $primary;
  }

  .url:hover {
    text-decoration: underline;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
