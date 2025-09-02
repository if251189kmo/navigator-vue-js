<template>
  <div :class="$style.login">
    <header :class="$style.header">
      <h1>Авторизуватись</h1>
    </header>
    <q-form @submit.prevent="onSubmit" :class="$style.form">
      <InputField
        :classes="$style.field"
        name="login"
        label="Login"
        beforeIcon="person"
        :errors="errors"
      />
      <InputField
        :classes="$style.field"
        name="password"
        label="Password"
        type="password"
        beforeIcon="lock"
        :errors="errors"
      />
      <section :class="$style.buttons">
        <q-btn type="submit" color="positive" label="Авторизуватись" />
        <q-btn color="negative" @click="onClose" label="Відмінити" />
      </section>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useLoginStore } from 'src/stores/login'
import type { LoginForm } from './types'
import InputField from 'src/components/fields/InputField.vue'
import { useDialogsStore } from 'src/stores/dialog'

const loginStore = useLoginStore()
const openDialog = useDialogsStore()

const schema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
})

const { handleSubmit, errors } = useForm<LoginForm>({
  validationSchema: schema,
})

const onSubmit = handleSubmit((form: LoginForm) => {
  // "login": "us10351pr", "password": "123123123"
  void loginStore.fetchLogin(form)
})

const onClose = () => {
  void openDialog.closeDialog(`login`)
}
</script>

<style module lang="scss">
.login {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .header > h1 {
    text-align: center;
  }

  .form > .field {
    width: 100%;
  }

  .buttons {
    margin-left: 30px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
