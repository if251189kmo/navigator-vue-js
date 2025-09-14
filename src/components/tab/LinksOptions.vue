<template>
  <q-item :class="$style.linksOptions" v-bind="itemProps">
    <q-item-section :class="$style.items" side>
      <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
    </q-item-section>
    <q-item-section :class="$style.items">
      <q-item-label :class="$style.id">{{ opt.id }}</q-item-label>

      <q-item-label :class="$style.new" v-if="opt.new"
        ><q-icon name="fiber_new" size="sm" color="negative"
      /></q-item-label>

      <q-item-label :class="$style.label">{{ opt.label }}</q-item-label>
      <q-item-label :class="$style.code">{{ opt.code }}</q-item-label>
      <q-item-label :class="$style.url">{{ opt.url }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { LinksOptionsSlot } from './types'

const { selected, opt, itemProps } = defineProps<LinksOptionsSlot>()
</script>

<style module lang="scss">
.linksOptions {
  .items {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    .id,
    .code,
    .label,
    .new,
    .url {
      margin: 5px;
    }

    .code {
      padding: 5px;
      border-radius: 4px;
      border: 1px solid $primary;
    }
    .url {
      color: $primary;
    }
  }
}
</style>
