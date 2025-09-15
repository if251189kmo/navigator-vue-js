<template>
  <q-chip
    v-if="index < 3"
    dense
    square
    removable
    color="secondary"
    text-color="white"
    @remove="removeAtIndex(index)"
  >
    {{ opt.label }}
  </q-chip>
  <span v-if="chips && index === 3"> +{{ chips - 3 }} ще </span>
</template>

<script setup lang="ts">
import type { LinksChipSlot } from './types'

const { index, chips, opt } = defineProps<LinksChipSlot>()
</script>
