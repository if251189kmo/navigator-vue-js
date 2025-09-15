<template>
  <div :class="$style.buttons">
    <q-btn flat color="primary" @click="onClose" icon="cancel" v-bind="buttons.cancelDelete" />
    <q-btn flat color="negative" @click="onDelete" v-bind="buttons.delete" icon="delete" />
  </div>
</template>

<script setup lang="ts">
import { deleteTab } from 'src/services/tabsService.js'
import type { DeleteTabProps } from './types/index.js'
import { buttons } from './json/index.json'
import { useDialogsStore } from 'src/stores/dialog.js'

const openDialog = useDialogsStore()
const { id, dialogName } = defineProps<DeleteTabProps>()

const onClose = () => void openDialog.closeDialog(dialogName)

const onDelete = () => {
  void deleteTab(id)
}
</script>

<style module lang="scss">
.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>
