<template>
  <q-intersection transition="scale">
    <div :class="$style.webAppsList">
      <q-table title="Treats" :rows="getLinks" :columns="columns" row-key="index">
        <template v-slot:body-cell-url="props">
          <q-td :props="props">
            <q-badge class="my-table-url">
              <a href="{{ props.row.url }}" target="_blank" rel="noopener noreferrer">{{
                props.row.url
              }}</a>
            </q-badge>
          </q-td>
        </template>
      </q-table>

      <div :class="$style.navigateBtn">
        <q-btn to="/" color="primary" label="Повернутись на головну сторінку" />
      </div>
    </div>
  </q-intersection>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Progresses from 'src/constants/progresses'
import type { LinkUi } from 'src/models'
import { useHomeStore } from 'src/stores/home'

const homeStore = useHomeStore()
const { getLinks } = storeToRefs(homeStore)

const columns = [
  { name: 'id', align: 'left' as const, label: 'id', field: (row: LinkUi) => row.id },
  { name: 'code', align: 'left' as const, label: 'code', field: (row: LinkUi) => row.code },
  { name: 'label', align: 'left' as const, label: 'label', field: (row: LinkUi) => row.label },
  { name: 'url', align: 'left' as const, label: 'url', field: (row: LinkUi) => row.url },
  { name: 'new', align: 'left' as const, label: 'new', field: (row: LinkUi) => row.new },
  {
    name: 'order',
    align: 'left' as const,
    label: 'order',
    field: (row: LinkUi) => row.order,
  },
]

void homeStore.fetchLinks({ progressName: Progresses.PROGRESS_PAGE })
</script>

<style module lang="scss">
.webAppsList {
  .navigateBtn {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
