<template>
  <q-intersection transition="scale">
    <div v-if="getTabs.length > 0" :class="$style.tabs">
      <RenderTab
        v-for="(tab, i) in getTabs"
        :index="i + 1"
        :length="getTabs.length"
        :key="tab.id"
        :tab="tab"
      />
    </div>
    <div v-else :class="$style.skeletons">
      <TabSkeleton :classes="$style.tabSkeletonFirst" />
      <TabSkeleton :classes="$style.tabSkeletonLust" />
    </div>
  </q-intersection>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import RenderTab from '../../components/tab/RenderTab.vue'
import { useHomeStore } from 'src/stores/home'
import TabSkeleton from 'src/components/skeletons/TabSkeleton.vue'

const homeStore = useHomeStore()
const { getTabs } = storeToRefs(homeStore)

void homeStore.fetchTabs()
</script>

<style module lang="scss">
.tabs,
.skeletons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  background-color: rgba(255, 255, 255, 0.841);
  border-radius: 4px 4px 50px 50px;
  padding: 20px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.309);
}

.skeletons {
  .tabSkeletonFirst,
  .tabSkeletonLust {
    width: 49%;
    height: 300px;
  }

  .tabSkeletonFirst {
    border-radius: 4px 4px 4px 30px;
  }

  .tabSkeletonLust {
    border-radius: 4px 4px 30px 4px;
  }
}
</style>
