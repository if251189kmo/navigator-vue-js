<template>
  <div :class="$style.myProgress">
    <div :class="$style.progress" v-if="show">
      <div :class="$style.box">
        <q-circular-progress rounded indeterminate size="50px" color="orange" />
        <div>Progress ...</div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useProgressStore } from 'src/stores/progress'
import { computed } from 'vue'
import type { ProgressProps } from './types'

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
    z-index: 1000;
    background-color: rgba(221, 221, 221, 0.685);
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
      text-align: center;
    }

    .box > div {
      margin: 10px;
      letter-spacing: 2px;
    }
  }
}
</style>
