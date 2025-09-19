<template>
  <q-intersection transition="scale">
    <ul :class="$style.webAppsList" v-for="link in getLinks" :key="link.id">
      <li>
        <div>{{ link.id }}</div>
        <div>{{ link.code }}</div>
        <div>{{ link.label }}</div>
        <div>{{ link.new }}</div>
      </li>
    </ul>
    <q-btn to="/" style="background: #ff0080; color: white" label="go home" />
  </q-intersection>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Progresses from 'src/constants/progresses'
import { useHomeStore } from 'src/stores/home'

const homeStore = useHomeStore()
const { getLinks } = storeToRefs(homeStore)

void homeStore.fetchLinks({ progressName: Progresses.PROGRESS_PAGE })
</script>

<style module lang="scss">
.webAppsList {
  background-color: rgba(233, 40, 217, 0.733);

  li {
    display: flex;
    align-items: center;

    div {
      margin: 5px;
    }
  }
}
</style>
