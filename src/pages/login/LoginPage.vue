<template>
  <form>login: <input type="text" /> password: <input type="password" /></form>
  <q-btn color="warning" @click="login()" icon="navigation">login</q-btn>
</template>

<script setup lang="ts">
import { useLoginStore } from 'src/stores/login'

const loginStore = useLoginStore()

const login = () => {
  loginStore.fetchLogin()
}
</script>
