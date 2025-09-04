<template>
  <div :class="$style.tabs">
    <RenderTab v-for="tab in getTabs" :key="tab.id" :tab="tab" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import RenderTab from '../../components/tab/RenderTab.vue'
import { useHomeStore } from 'src/stores/home'

const homeStore = useHomeStore()
const { getTabs } = storeToRefs(homeStore)
// TODO: почитати за життя компонента на Vue
void homeStore.fetchTabs()
</script>

<style module lang="scss">
.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  background-color: rgba(255, 255, 255, 0.699);
  border-radius: 4px 4px 50px 50px;
  padding: 20px;
}
</style>
