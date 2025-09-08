<template>
  <div :class="$style.createTab">
    <q-form @submit.prevent="onSubmit" :class="$style.form">
      <section :class="$style.tabName">
        <InputField
          :classes="$style.field"
          name="label"
          v-bind="fields.label"
          beforeIcon="inventory"
          :errors="errors"
        />
        <div>
          <q-btn color="warning">Змінити іконку</q-btn>
          <q-btn color="primary">Добавити блок із ссилками</q-btn>
        </div>
      </section>
      <section :class="$style.groups">groups</section>
      <section :class="$style.buttons">
        <q-btn type="submit" color="positive" v-bind="buttons.save" />
        <q-btn color="negative" @click="onClose" v-bind="buttons.cancel" />
      </section>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { fields, buttons } from './json/index.json'
import { useDialogsStore } from 'src/stores/dialog.js'
import type { CreateTabProps } from './types/index.js'
import InputField from '../fields/InputField.vue'

type CreateTabForm = {
  label: string
  groups: {
    id: number
    name: string
    linksIds: number[]
  }[]
}

const openDialog = useDialogsStore()
const { dialogName } = defineProps<CreateTabProps>()

const schema = yup.object({
  label: yup.string().required(fields.label.validation.required),
})

const { handleSubmit, errors } = useForm<CreateTabForm>({
  validationSchema: schema,
  initialValues: {
    label: 'us10351pr',
    groups: [
      {
        id: 1,
        name: 'string',
        linksIds: [2],
      },
    ],
  },
})

const onSubmit = handleSubmit((form: CreateTabForm) => {
  console.log(form)
})

const onClose = () => {
  void openDialog.closeDialog(dialogName)
}
</script>

<style module lang="scss">
.createTab {
  .form > .tabName {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .field {
      margin: 0 20px 0 0;
      width: 250px;
    }
  }

  .form > .groups {
    background-color: rgba(255, 0, 0, 0.452);
  }

  .form > .buttons {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
