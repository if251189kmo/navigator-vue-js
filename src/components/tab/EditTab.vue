<template>
  <div>
    <div>Назва таби</div>
    <div>{{ tab.label }}</div>
  </div>
  <div>
    <q-btn color="warning" icon="navigation">Змінити іконку</q-btn>
    <q-btn color="primary" icon="eco">Добавити блок із ссилками</q-btn>
  </div>
  <div>Блок ссилок</div>
  <div>
    <q-btn color="warning" icon="navigation">Зберегти</q-btn>
    <q-btn color="primary" icon="eco">Видалити</q-btn>
  </div>
</template>

<script setup lang="ts">
import type { Tab } from '../../models/index.js'

const tab = defineProps<Tab>()
</script>
