<template>
  <div :class="$style.header">
    <h1 :class="$style.title">{{ labels.title }}</h1>
    <div :class="$style.logo"><img src="./../../assets/logo.png" /></div>
    <q-btn round color="secondary" @click="openLoginModal()" icon="navigation" />
  </div>
  <MyDialog v-bind="loginDialog">
    <template #content>
      <form>login: <input type="text" /> password: <input type="password" /></form>
      <q-btn color="warning" @click="login()" icon="navigation">login</q-btn>
    </template>
  </MyDialog>
</template>

<script setup lang="ts">
import MyDialog from '../../components/dialog/MyDialog.vue'
import { useLoginStore } from 'src/stores/login'
import labels from './json/index.json'
import { useDialogsStore } from 'src/stores/dialog'

const dialogsStore = useDialogsStore()
const loginStore = useLoginStore()

const openLoginModal = () => {
  dialogsStore.openDialog(`login`)
}

const login = () => {
  loginStore.fetchLogin()
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
