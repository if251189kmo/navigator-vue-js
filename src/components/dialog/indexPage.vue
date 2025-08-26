<template>
  <q-dialog v-model="toolbarOpen">
    <q-card>
      <q-toolbar>
        <q-icon name="warning" color="warning" size="2rem" />

        <q-toolbar-title>
          <span>{{ title }}</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="toolbarOpen = false" />
      </q-toolbar>

      <q-card-section><slot name="content" /></q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDialogsStore } from 'src/stores/dialog'
import type { DialogProps } from './types'

const tab = defineProps<DialogProps>()
const { name, title } = tab
const openDialog = useDialogsStore()

const toolbarOpen = computed({
  get: () => openDialog.dialogs[name]?.open ?? false,
  set: (val: boolean) => {
    if (val) void openDialog.openDialog(name)
    else void openDialog.closeDialog(name)
  },
})
</script>

<style module lang="scss">
@import './styles.module.scss';
</style>
