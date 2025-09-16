<template>
  <MyProgress :name="Progresses.PROGRESS_PAGE">
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
import Progresses from 'src/constants/progresses'
import PageHeader from '../../components/header/PageHeader.vue'
import MyProgress from '../progress/MyProgress.vue'
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
