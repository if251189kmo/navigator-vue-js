<template>
  <!-- // TODO: пеотрібно подумати над винесенням списку 
                Links можливо у компонент типу RenderAdminLinks -->
  <q-intersection transition="scale">
    <div :class="$style.webAppsList">
      <q-table :rows="getLinks" :columns="columns" row-key="index">
        <template v-slot:top>
          <!-- // TODO: допрацювати THeader -->
          <div class="row items-center justify-between q-pa-sm full-width">
            <div class="text-h6 text-primary">
              {{ title }}
            </div>
            <q-btn color="primary" @click="onCreate" label="Додати" icon="add" flat />
            <MyDialog v-bind="createDialog">
              <template #content>
                <CreateLink :dialogName="createDialog.name" />
              </template>
            </MyDialog>
          </div>
        </template>
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
            <q-btn
              round
              size="0.5rem"
              @click="onEdit(editDialog(props.row).name)"
              color="warning"
              icon="edit"
            />
            <q-btn
              round
              size="0.5rem"
              @click="onDelete(editDialog(props.row).name)"
              color="negative"
              icon="delete"
            />
            <MyDialog v-bind="editDialog(props.row)">
              <template #content>
                <EditLink :dialogName="editDialog(props.row).name" :link="props.row" />
              </template>
            </MyDialog>
            <MyDialog v-bind="deleteDialog(props.row)">
              <template #content>
                <DeleteLink :dialogName="deleteDialog(props.row).name" :id="props.row.id" />
              </template>
            </MyDialog>
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
import { computed } from 'vue'
import { title, dialogs, table, buttons } from './json/index.json'
import Dialogs from 'src/constants/dialogs'
import EditLink from 'src/components/link/EditLink.vue'
import DeleteLink from 'src/components/link/DeleteLink.vue'
import CreateLink from 'src/components/link/CreateLink.vue'
import MyDialog from 'src/components/dialog/MyDialog.vue'
import { useDialogsStore } from 'src/stores/dialog'

const { PROGRESS_PAGE } = Progresses
const { EDIT_LINK, DELETE_LINK, CREATE_LINK } = Dialogs
const homeStore = useHomeStore()
const loginStore = useLoginStore()
const dialogsStore = useDialogsStore()
const { getAuth } = storeToRefs(loginStore)
const { getLinks } = storeToRefs(homeStore)

const editDialog = (link: LinkUi) => ({
  name: `${EDIT_LINK}${link.id}`,
  title: `${dialogs.edit.title} ${link.id} «${link.label}»`,
})

const deleteDialog = (link: LinkUi) => ({
  name: `${DELETE_LINK}${link.id}`,
  title: `${dialogs.delete.title} ${link.id} «${link.label}»`,
})

const createDialog = {
  name: `${CREATE_LINK}`,
  title: `${dialogs.create.title}`,
}

const columns = computed(() => {
  const base = [
    { name: 'id', align: 'left' as const, ...table.columns.id, field: (row: LinkUi) => row.id },
    {
      name: 'code',
      align: 'center' as const,
      ...table.columns.code,
      field: ({ code }: LinkUi) => code,
    },
    {
      name: 'label',
      align: 'left' as const,
      ...table.columns.label,
      field: ({ label }: LinkUi) => label,
    },
    { name: 'url', align: 'left' as const, ...table.columns.url, field: ({ url }: LinkUi) => url },
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
      field: ({ order }: LinkUi) => order,
    },
  ]

  if (getAuth.value) {
    base.push({
      name: 'actions',
      align: 'center' as const,
      ...table.columns.actions,
      field: ({ id }: LinkUi) => id,
    })
  }

  return base
})

const onCreate = () => {
  dialogsStore.openDialog(createDialog.name)
}
const onEdit = (name: string) => {
  dialogsStore.openDialog(name)
}
const onDelete = (name: string) => {
  dialogsStore.openDialog(name)
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
