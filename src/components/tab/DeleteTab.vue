<template>
  <div>Видалити?</div>
  <div>
    <q-btn color="warning" icon="navigation">Зберегти</q-btn>
    <q-btn color="primary" icon="eco">Видалити {{ tab.id }}</q-btn>
  </div>
</template>

<script setup lang="ts">
import type { Tab } from '../../models/index.js'

const tab = defineProps<Tab>()
</script>
