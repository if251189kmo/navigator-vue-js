<template>
  <q-card :class="$style.link" dark bordered>
    <div class="text-h6">{{ link.id }}</div>
    <div class="text-subtitle2">{{ link.name }}</div>
  </q-card>
</template>

<script setup lang="ts">
import type { Link } from '../../../../models/index.js'
defineProps<{ link: Link }>()
</script>

<style module lang="scss">
@import './styles.module.scss';
</style>
