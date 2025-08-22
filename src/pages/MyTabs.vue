<template>
  <div :class="$style.cards">
    <!-- <TabCard v-for="tab in tabsStore.list" :key="tab.id" :tab="tab" /> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTabsStore } from '../store/tabs'

const tabsStore = useTabsStore()

onMounted(async () => {
  try {
    await tabsStore.fetchTabs()
    console.log('tabs:', tabsStore.list)
  } catch (err) {
    console.error('Error fetching tabs:', err)
  }
})
</script>

<!-- <template #TabCard="{ tab }">
  <q-card dark bordered :class="$style.card">
    <q-card-section>
      <div class="text-h6">{{ tab.label }}</div>
      <div class="text-subtitle2">{{ tab.author }}</div>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section>{{ tab.content }}</q-card-section>
  </q-card>
</template> -->

<style module lang="scss">
@import '../css/tabs.module.scss';
</style>
