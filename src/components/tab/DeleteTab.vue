<template>
  <div>Видалити?</div>
  <div>
    <q-btn color="warning" icon="navigation">Зберегти</q-btn>
    <q-btn color="primary" @click="onDelete" icon="eco">Видалити {{ tab.id }}</q-btn>
  </div>
</template>

<script setup lang="ts">
import { deleteTab } from 'src/services/tabsService.js'
import type { DeleteTabProps } from './types/index.js'

const onDelete = () => {
  void deleteTab(tab.id)
}

const tab = defineProps<DeleteTabProps>()
</script>
