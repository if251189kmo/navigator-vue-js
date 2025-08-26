<template>
  <div :class="$style.header">
    <h1 :class="$style.title">{{ labels.title }}</h1>
    <div :class="$style.logo"><img src="./../../assets/logo.png" /></div>
  </div>
</template>

<script setup lang="ts">
import labels from './json/index.json'
</script>

<style module lang="scss">
@import './styles.module.scss';
</style>
