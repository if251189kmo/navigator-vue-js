<template>
  <div :class="$style.header">
    <h1 :class="$style.title">{{ labels.title }}</h1>
    <div :class="$style.logoBox">
      <div :class="$style.logo"><img src="./../../assets/logo.png" /></div>
      <div :class="$style.buttons">
        <q-btn v-if="getAuth" padding="sm" color="negative" @click="logout" icon="logout" />
        <q-btn v-else padding="sm" color="primary" @click="openLoginModal" icon="login" />
      </div>
    </div>
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
import { useLoginStore } from 'src/stores/login'
import { storeToRefs } from 'pinia'
import Dialogs from 'src/constants/dialogs'

const { LOGIN_DIALOG } = Dialogs
const dialogsStore = useDialogsStore()
const loginStore = useLoginStore()

const { getAuth } = storeToRefs(loginStore)

const openLoginModal = () => {
  dialogsStore.openDialog(LOGIN_DIALOG)
}

const logout = () => {
  void loginStore.logout()
}

const loginDialog = {
  name: LOGIN_DIALOG,
}
</script>

<style module lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 50px 0 20px 0;
  padding: 20px 50px;
  border-radius: 50px 50px 4px 4px;
  background-color: rgba(255, 255, 255, 0.699);

  .title {
    font-size: 25px;
  }

  .logoBox {
    display: flex;
    align-items: center;

    .logo {
      width: 250px;
    }

    .buttons {
      margin: 0 0 0 10px;
    }
  }
}
</style>
