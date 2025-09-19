<template>
  <div :class="$style.myProgress">
    <div :class="$style.progress" v-if="show">
      <div :class="$style.box">
        <q-spinner-gears size="100px" color="orange" />
        <div :class="$style.title">{{ title }}</div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useProgressStore } from 'src/stores/progress'
import { computed } from 'vue'
import type { ProgressProps } from './types'
import { title } from './json/index.json'

const { name } = defineProps<ProgressProps>()
const store = useProgressStore()

const show = computed(() => store.progresses[name]?.run)
</script>
<style module lang="scss">
.myProgress {
  position: relative;

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(221, 221, 221, 0.685);
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
      text-align: center;
    }

    .box > .title {
      margin: 10px;
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
}
</style>
