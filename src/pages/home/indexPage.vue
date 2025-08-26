<template>
  <div :class="$style.tabs">
    <Tab v-for="tab in homeStore.home.tabs" :key="tab.id" :tab="tab" />
  </div>
</template>

<script setup lang="ts">
import Tab from './components/tab/indexPage.vue'
import { useHomeStore } from 'src/stores/home'

const homeStore = useHomeStore()

// TODO: почитати за життя компонента на Vue
void homeStore.fetchTabs()
</script>

<style module lang="scss">
@import './styles.module.scss';
</style>
