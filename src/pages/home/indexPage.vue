<template>
  <div :class="$style.tabs">
    <Tab v-for="tab in tabsStore.home.tabs" :key="tab.id" :tab="tab" />
  </div>
</template>

<script setup lang="ts">
import Tab from './components/tab/indexPage.vue'
import { useTabs } from './composables/useTabs'

const { tabsStore } = useTabs()
</script>

<style module lang="scss">
@import './styles.module.scss';
</style>
