<template>
  <div>Видалити?</div>
  <div>
    <q-btn color="warning" icon="navigation">Зберегти</q-btn>
    <q-btn color="primary" icon="eco">Видалити {{ tab.id }}</q-btn>
  </div>
</template>

<script setup lang="ts">
import type { DeleteTabProps } from './types/index.js'

const tab = defineProps<DeleteTabProps>()
</script>
