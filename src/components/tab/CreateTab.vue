<template>
  <div :class="$style.createTab">
    <q-form @submit.prevent="onSubmit" :class="$style.form">
      <section :class="$style.tabName">
        <InputField
          :classes="$style.fieldInput"
          name="label"
          v-bind="labels.fields.label"
          beforeIcon="inventory"
          :errors="errors"
        />
        <div>
          <q-btn color="warning" @click="onChangeIcon" v-bind="labels.buttons.changeIcon" />
          <q-btn color="primary" @click="onCreateBlock" v-bind="labels.buttons.createBlock" />
        </div>
      </section>

      <div v-if="groups.length > 0">
        <section
          :class="$style.groups"
          v-for="group in groups"
          :key="group"
          :group="values.groups[group]"
        >
          <div :class="$style.groupTitle">
            <div>{{ values.groups[group]?.name }}</div>
            <q-btn
              color="negative"
              @click="onDeleteBlock(group)"
              v-bind="labels.buttons.deleteBlock"
            />
          </div>
          <SelectField
            :classes="$style.fieldSelect"
            :name="`groups.${group}.linksIds`"
            beforeIcon="inventory"
            v-bind="labels.fields.groups"
            multiple
            useChips
            :options="getLinks"
            :errors="errors"
          />
          <pre>{{ `groups.${group}.linksIds` }}</pre>
          <pre>{{ errors }}</pre>
        </section>
      </div>
      <div :class="$style.groups" v-else>Створіть блоки із ссилками</div>
      <section :class="$style.buttons">
        <q-btn type="submit" color="positive" v-bind="labels.buttons.save" />
        <q-btn color="negative" @click="onClose" v-bind="labels.buttons.cancel" />
      </section>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import labels from './json/index.json'
import { useDialogsStore } from 'src/stores/dialog.js'
import type { CreateTabProps } from './types/index.js'
import InputField from '../fields/InputField.vue'
import { useHomeStore } from 'src/stores/home'
import { storeToRefs } from 'pinia'
import SelectField from '../fields/SelectField.vue'
import { computed } from 'vue'

type Group = {
  id: number
  name: string
  linksIds: number[]
}

type CreateTabForm = {
  label: string
  groups: Record<string, Group>
}

const openDialog = useDialogsStore()
const homeStore = useHomeStore()
const { dialogName } = defineProps<CreateTabProps>()
const { getLinks } = storeToRefs(homeStore)
const groups = computed(() => Object.keys(values.groups || {}))

const schema = yup.object({
  label: yup.string().required(labels.fields.label.validation.required),
  groups: yup.object().shape({
    '1': yup
      .object({
        id: yup.number().required(),
        name: yup.string().required(),
        linksIds: yup.array().of(yup.number()).min(1, 'Виберіть хоча б один елемент'),
      })
      .required(),
  }),
})

const { handleSubmit, errors, values, setFieldValue } = useForm<CreateTabForm>({
  validationSchema: schema,
  initialValues: {
    label: '',
    groups: {},
  },
})

const onCreateBlock = () => {
  const ids = groups.value.map(Number)
  const id = ids.length > 0 ? Math.max(...ids) + 1 : 1

  const newGroup = { id, name: `Блок №${id}`, linksIds: [] }
  setFieldValue('groups', { ...values.groups, [id]: newGroup })
}

const onDeleteBlock = (id: string) => {
  const newData = { ...values.groups }
  delete newData[id]
  setFieldValue('groups', newData)
}

const onChangeIcon = () => {
  console.log('onChangeIcon')
}

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

    .fieldInput {
      margin: 0 20px 0 0;
      width: 250px;
    }
  }

  .form .groups {
    background-color: rgba(81, 255, 0, 0.192);
    border: 1px solid brown;
    margin-bottom: 10px;
    padding: 5px;

    .groupTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .fieldSelect {
      width: 100%;
    }
  }

  .form > .buttons {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
