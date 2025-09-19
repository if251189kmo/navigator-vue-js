<template>
  <q-card flat bordered :class="classes">
    <q-item :class="$style.title">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" animation="fade" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" animation="fade" />
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-skeleton square :class="$style.content" animation="fade" />
  </q-card>
</template>

<script setup lang="ts">
import type { TabSkeletonProps } from './types'

const { classes } = defineProps<TabSkeletonProps>()
</script>

<style module lang="scss">
.title {
  height: 30%;
}

.content {
  height: 70%;
}
</style>
