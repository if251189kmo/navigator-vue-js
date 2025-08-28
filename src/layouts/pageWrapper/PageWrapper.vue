<template>
  <MyProgress :name="pageProgressName">
    <q-layout :class="$style.pageWrapper">
      <div :class="$style.container">
        <PageHeader />

        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </q-layout>
  </MyProgress>
</template>

<script setup lang="ts">
import PageHeader from '../../components/header/PageHeader.vue'
import MyProgress from '../progress/MyProgress.vue'

const pageProgressName = 'page-progress'
</script>

<style module lang="scss">
.pageWrapper {
  display: flex;
  justify-content: center;

  background-image: url(../../assets//page-background.jpg);
  background-repeat: no-repeat;
  background-size: cover;

  .container {
    width: 1024px;
  }
}
</style>
