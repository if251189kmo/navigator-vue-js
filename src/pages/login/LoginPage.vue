<template>
  <div :class="$style.login">
    <header :class="$style.header">
      <h1>{{ title }}</h1>
    </header>
    <q-form @submit.prevent="onSubmit" :class="$style.form">
      <InputField
        :classes="$style.field"
        name="login"
        v-bind="fields.login"
        beforeIcon="person"
        :errors="errors"
      />
      <InputField
        :classes="$style.field"
        name="password"
        v-bind="fields.password"
        type="password"
        beforeIcon="lock"
        :errors="errors"
      />
      <section :class="$style.buttons">
        <q-btn type="submit" color="positive" v-bind="buttons.login" />
        <q-btn color="negative" @click="onClose" v-bind="buttons.cancel" />
      </section>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { title, buttons, fields } from './json/index.json'
import { useLoginStore } from 'src/stores/login'
import type { LoginForm } from './types'
import InputField from 'src/components/fields/InputField.vue'
import { useDialogsStore } from 'src/stores/dialog'
import Dialogs from 'src/constants/dialogs'

const { LOGIN_DIALOG } = Dialogs
const loginStore = useLoginStore()
const openDialog = useDialogsStore()

const schema = yup.object({
  login: yup.string().required(fields.login.validation.required),
  password: yup.string().required(fields.password.validation.required),
})

const { handleSubmit, errors } = useForm<LoginForm>({
  validationSchema: schema,
  initialValues: {
    login: 'us10351pr',
    password: '123123123',
  },
})

const onSubmit = handleSubmit((form: LoginForm) => {
  void loginStore.fetchLogin(form)
})

const onClose = () => {
  void openDialog.closeDialog(LOGIN_DIALOG)
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
