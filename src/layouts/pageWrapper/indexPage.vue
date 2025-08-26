<template>
  <q-layout :class="$style.pageWrapper">
    <div :class="$style.container">
      <Header />

      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import Header from '../../components/header/indexPage.vue'
</script>

<style module lang="scss">
@import './styles.module.scss';
</style>
