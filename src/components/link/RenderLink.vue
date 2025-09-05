<template>
  <q-card :class="$style.renderLinks" bordered>
    <ul :class="$style.group">
      <li :class="$style.link" v-for="link in group.links" :key="link.id">
        <span :class="$style.new" v-if="link.new"> New </span>
        <a :href="link.url"> &bull; {{ link.label }}</a>
      </li>
    </ul>
  </q-card>
</template>

<script setup lang="ts">
import type { RenderLinksProps } from './types/index.js'

const { group } = defineProps<RenderLinksProps>()
</script>

<style module lang="scss">
.renderLinks {
  margin: 5px 0;
  display: flex;
  align-items: center;

  .group {
    padding: 2px 5px;
    display: flex;
    flex-wrap: wrap;

    .link {
      color: $primary;

      .new {
        color: $negative;
        font-weight: bold;
      }
    }
  }

  .group > .link:hover {
    color: $positive;
  }
}
</style>
