<template>
  <div :class="$style.buttons">
    <q-btn flat color="primary" icon="cancel" v-bind="buttons.cancelDelete" />
    <q-btn flat color="negative" @click="onDelete" v-bind="buttons.delete" icon="delete" />
  </div>
</template>

<script setup lang="ts">
import { deleteTab } from 'src/services/tabsService.js'
import type { DeleteTabProps } from './types/index.js'
import { buttons } from './json/index.json'

const onDelete = () => {
  void deleteTab(tab.id)
}

const tab = defineProps<DeleteTabProps>()
</script>

<style module lang="scss">
.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>
