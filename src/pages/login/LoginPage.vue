<template>
  <q-form @submit.prevent="onSubmit" :class="$style.form">
    <InputField name="login" label="Login" beforeIcon="person" :errors="errors" />
    <InputField
      name="password"
      label="Password"
      type="password"
      beforeIcon="lock"
      :errors="errors"
    />
    <q-btn type="submit" color="warning" icon="navigation" label="Login" />
  </q-form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useLoginStore } from 'src/stores/login'
import type { LoginForm } from './types'
import InputField from 'src/components/fields/InputField.vue'

const loginStore = useLoginStore()

const schema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
})

const { handleSubmit, errors } = useForm<LoginForm>({
  validationSchema: schema,
})

// "login": "us10351pr", "password": "123123123"
const onSubmit = handleSubmit((form: LoginForm) => {
  void loginStore.fetchLogin(form)
})
</script>

<style module lang="scss">
.form {
  background-color: red;
}
</style>
