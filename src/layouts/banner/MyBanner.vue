<template>
  <div :class="$style.myBanner">
    <div :class="$style.box">
      <q-banner :class="$style.banner" dense inline-actions class="text-white bg-red">
        This app is offline.
        <template v-slot:action>
          <q-btn flat color="white" label="Turn ON Wifi" />
        </template>
      </q-banner>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
// import { useProgressStore } from 'src/stores/progress'
// import { computed } from 'vue'
// import type { ProgressProps } from './types'

// const { name } = defineProps<ProgressProps>()
// const store = useProgressStore()

// const show = computed(() => store.progresses[name]?.run)
</script>
<style module lang="scss">
.myBanner {
  position: relative;
  width: 100%;

  .box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9998;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .banner {
    margin: 5px;
  }
}
</style>
