<template>
  <div :class="$style.tabs">
    <RenderTab v-for="tab in homeStore.home.tabs" :key="tab.id" :tab="tab" />
  </div>
</template>

<script setup lang="ts">
import RenderTab from '../../components/tab/RenderTab.vue'
import { useHomeStore } from 'src/stores/home'

const homeStore = useHomeStore()

// TODO: почитати за життя компонента на Vue
void homeStore.fetchTabs()
</script>

<style module lang="scss">
.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  background-color: rgba(255, 255, 255, 0.699);
  padding: 20px;
}
</style>
