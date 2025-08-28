<template>
  <div :class="$style.header">
    <h1 :class="$style.title">{{ labels.title }}</h1>
    <div :class="$style.logo"><img src="./../../assets/logo.png" /></div>
    <q-btn round color="secondary" @click="openLoginModal()" icon="navigation" />
  </div>
  <MyDialog v-bind="loginDialog">
    <template #content><LoginPage /></template>
  </MyDialog>
</template>

<script setup lang="ts">
import LoginPage from 'src/pages/login/LoginPage.vue'
import MyDialog from '../../components/dialog/MyDialog.vue'
import labels from './json/index.json'
import { useDialogsStore } from 'src/stores/dialog'

const dialogsStore = useDialogsStore()

const openLoginModal = () => {
  dialogsStore.openDialog(`login`)
}

const loginDialog = {
  name: `login`,
  title: `Вхід до системи`,
}
</script>

<style module lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .title {
    font-size: 25px;
  }

  .logo {
    width: 250px;
  }
}
</style>
