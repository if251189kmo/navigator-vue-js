<template>
  <q-card :class="$style.tab" dark bordered>
    <q-card-section :class="$style.title">
      <div :class="$style.label">
        <div><img src="{{tab.iconUrl}}" /></div>
        <div>{{ tab.label }}</div>
      </div>
      <div v-if="getAuth" :class="$style.actions">
        <q-btn
          padding="xs"
          @click="dialogsStore.openDialog(editDialog.name)"
          color="warning"
          icon="navigation"
        />
        <q-btn
          padding="xs"
          @click="dialogsStore.openDialog(deleteDialog.name)"
          color="primary"
          icon="eco"
        />
      </div>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section>
      <RenderLink v-for="link in tab.groups" :key="link.id" :link="link" />
    </q-card-section>
  </q-card>

  <MyDialog v-bind="editDialog">
    <template #content><EditTab v-bind="tab" /></template>
  </MyDialog>
  <MyDialog v-bind="deleteDialog">
    <template #content><DeleteTab v-bind="tab" /></template>
  </MyDialog>
</template>

<script setup lang="ts">
import MyDialog from '../../components/dialog/MyDialog.vue'
import RenderLink from '../../components/link/RenderLink.vue'
import EditTab from '../../components/tab/EditTab.vue'
import DeleteTab from '../../components/tab/DeleteTab.vue'
import type { Tab } from '../../models/index.js'
import { useDialogsStore } from 'src/stores/dialog'
import { useLoginStore } from 'src/stores/login'
import { storeToRefs } from 'pinia'

const { tab } = defineProps<{ tab: Tab }>()
const dialogsStore = useDialogsStore()
const loginStore = useLoginStore()
const { getAuth } = storeToRefs(loginStore)

const editDialog = {
  name: `edit_${tab.id}`,
  title: `Редагування таби №- ${tab.id} «${tab.label}»`,
}
const deleteDialog = {
  name: `delete_${tab.id}`,
  title: `Редагування таби №- ${tab.id} «${tab.label}»`,
}
</script>

<style module lang="scss">
.tab {
  margin: 10px;
  width: 45%;
  background-color: rgba(127, 255, 212, 0.151);
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.315);
  color: green;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label {
      display: flex;
    }

    .actions {
      display: flex;
    }
  }
}
</style>
