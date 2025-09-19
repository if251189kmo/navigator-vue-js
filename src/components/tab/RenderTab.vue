<template>
  <q-card
    :class="[$style.tab, isTabLast && $style.tabLast, isTabBeforeLast && $style.tabBeforeLast]"
    dark
    bordered
  >
    <q-card-section :class="$style.title">
      <div :class="$style.label">
        <div :class="$style.icon" v-if="tab.iconUrl !== ''"><img src="{{tab.iconUrl}}" /></div>
        <q-icon :class="$style.icon" v-else name="dvr" color="teal" size="3em" />
        <div :class="$style.text">{{ tab.label }}</div>
      </div>

      <q-btn-dropdown :class="$style.actions" v-if="getAuth" flat color="positive" icon="settings">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-btn
                flat
                label="Create"
                title="Create"
                @click="dialogsStore.openDialog(createDialog.name)"
                color="positive"
                icon="add"
              />
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-btn
                flat
                label="Edit"
                title="Edit"
                @click="dialogsStore.openDialog(editDialog.name)"
                color="warning"
                icon="edit"
              />
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-btn
                flat
                label="Delete"
                title="Delete"
                @click="dialogsStore.openDialog(deleteDialog.name)"
                color="negative"
                icon="delete"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section :class="$style.links">
      <RenderLink v-for="group in tab.groups" :key="group.id" :group="group" />
    </q-card-section>
  </q-card>

  <MyDialog v-bind="editDialog">
    <template #content><EditTab :dialogName="editDialog.name" :tab="tab" /></template>
  </MyDialog>
  <MyDialog v-bind="deleteDialog">
    <template #content><DeleteTab :dialogName="deleteDialog.name" :id="tab.id" /></template>
  </MyDialog>
  <MyDialog v-bind="createDialog">
    <template #content><CreateTab :dialogName="createDialog.name" /></template>
  </MyDialog>
</template>

<script setup lang="ts">
import MyDialog from '../../components/dialog/MyDialog.vue'
import RenderLink from '../../components/link/RenderLink.vue'
import EditTab from '../../components/tab/EditTab.vue'
import DeleteTab from '../../components/tab/DeleteTab.vue'
import { useDialogsStore } from 'src/stores/dialog'
import { useLoginStore } from 'src/stores/login'
import { storeToRefs } from 'pinia'
import Dialogs from 'src/constants/dialogs'
import type { RenderTabProps } from './types'
import { dialogs } from './json/index.json'
import CreateTab from './CreateTab.vue'
import { computed } from 'vue'

const { EDIT_TAB, CREATE_TAB, DELETE_TAB } = Dialogs
const { tab, index, length } = defineProps<RenderTabProps>()
const dialogsStore = useDialogsStore()
const loginStore = useLoginStore()
const { getAuth } = storeToRefs(loginStore)

const isTabLast = computed(() => length % 2 === 0 && length === index)
const isTabBeforeLast = computed(() => length % 2 === 0 && length - 1 === index)

const editDialog = {
  name: `${EDIT_TAB}${tab.id}`,
  title: `${dialogs.edit.title} ${tab.id} «${tab.label}»`,
}

const deleteDialog = {
  name: `${DELETE_TAB}${tab.id}`,
  title: `${dialogs.delete.title} ${tab.id} «${tab.label}»`,
}

const createDialog = {
  name: `${CREATE_TAB}${tab.id}`,
  title: `${dialogs.create.title}`,
}
</script>

<style module lang="scss">
.tabLast {
  border-radius: 4px 4px 25px 4px;
}

.tabBeforeLast {
  border-radius: 4px 4px 4px 25px;
}

.tab {
  margin: 10px;
  width: 47%;
  background-color: rgba(255, 255, 255, 0.431);
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.179);

  .title {
    padding: 16px 16px 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label {
      margin: 0 20px;
      display: flex;

      .icon {
        margin-right: 10px;
      }

      .text {
        padding: 0 0 5px 0;
        display: flex;
        align-items: end;
        color: black;
      }
    }

    .actions {
      display: flex;
      justify-content: flex-start;
    }
  }

  .links {
    padding: 8px 16px 16px 16px;
  }
}
</style>
