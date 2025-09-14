<template>
  <div :class="$style.createTab">
    <q-form @submit.prevent="onSubmit" :class="$style.form">
      <section :class="$style.tabName">
        <InputField
          name="label"
          :classes="$style.fieldInput"
          v-bind="fields.label"
          beforeIcon="inventory"
          :errors="errors"
        />
        <div>
          <q-btn color="warning" @click="onChangeIcon" v-bind="buttons.changeIcon" />
          <q-btn color="primary" @click="onCreateBlock" v-bind="buttons.createBlock" />
        </div>
      </section>

      <div v-if="groups.length">
        <section v-for="groupKey in groups" :key="groupKey" :class="$style.groups">
          <div :class="$style.groupTitle">
            <div>{{ values.groups[groupKey]?.name }}</div>
            <q-btn color="negative" @click="onDeleteBlock(groupKey)" v-bind="buttons.deleteBlock" />
          </div>
          <SelectField
            :name="`groups.${groupKey}.linksIds`"
            :classes="$style.fieldSelect"
            multiple
            useChips
            :options="getLinks"
            :errors="formattedErrors(errors).value"
            beforeIcon="inventory"
            v-bind="fields.groups"
          >
            <template #option="option">
              <q-item v-bind="option.itemProps">
                <q-item-section side>
                  <q-checkbox
                    :model-value="option.selected"
                    @update:model-value="option.toggleOption(option.opt)"
                  />
                </q-item-section>
                <q-item-label :class="$style.itemLabel">{{ option.opt.id }}</q-item-label>
                <q-item-label :class="$style.itemLabel">{{ option.opt.code }}</q-item-label>
                <q-item-label :class="$style.itemLabel">{{ option.opt.label }}</q-item-label>
                <q-item-label :class="$style.itemLabel">{{ option.opt.new }}</q-item-label>
                <q-item-label :class="$style.itemLabel">{{ option.opt.url }}</q-item-label>
              </q-item>
            </template>

            <template #selected="selected">
              <q-chip
                v-if="selected.index < 3"
                dense
                square
                removable
                color="secondary"
                text-color="white"
                @remove="selected.removeAtIndex(selected.index)"
              >
                {{ selected.opt.label }}
              </q-chip>
              <span
                v-else-if="Array.isArray(values.groups[groupKey]?.linksIds) && selected.index === 3"
              >
                +{{ values.groups[groupKey].linksIds.length - 3 }} ще
              </span>
            </template>
          </SelectField>
        </section>
      </div>
      <div v-else :class="$style.groups">Створіть блоки із ссилками</div>

      <section :class="$style.buttons">
        <q-btn type="submit" color="positive" v-bind="buttons.save" />
        <q-btn color="negative" @click="onClose" v-bind="buttons.cancel" />
      </section>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { fields, buttons, titles } from './json/index.json'
import InputField from '../fields/InputField.vue'
import SelectField from '../fields/SelectField.vue'
import { useDialogsStore } from 'src/stores/dialog.js'
import { useHomeStore } from 'src/stores/home'
import type { CreateTabForm, CreateTabProps } from './types/index.js'
import { tabFormValidationSchema as validationSchema } from './validation/index.js'
import { formattedErrors } from '../fields/utils/formattedErrors'

const openDialog = useDialogsStore()
const homeStore = useHomeStore()
const { getLinks } = storeToRefs(homeStore)
const { dialogName } = defineProps<CreateTabProps>()

const { handleSubmit, errors, values, setFieldValue } = useForm<CreateTabForm>({
  validationSchema,
  initialValues: { label: '', groups: {} },
})

const groups = computed(() => Object.keys(values.groups || {}))

const onChangeIcon = () => console.log('onChangeIcon')
const onSubmit = handleSubmit((form: CreateTabForm) => console.log(form))
const onClose = () => void openDialog.closeDialog(dialogName)

const onCreateBlock = () => {
  const oldGroups = groups.value
  const id = oldGroups.length ? Math.max(...oldGroups.map(Number)) + 1 : 1
  const newGroups = { ...values.groups, [id]: { id, name: `${titles.create}${id}`, linksIds: [] } }

  setFieldValue('groups', newGroups)
}

const onDeleteBlock = (id: string) => {
  const oldGroups = { ...values.groups }
  delete oldGroups[id]

  setFieldValue('groups', oldGroups)
}
</script>

<style module lang="scss">
.createTab {
  .form > .tabName {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .fieldInput {
      margin-right: 20px;
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
      width: inherit;

      .itemLabel {
        margin: 5px;
      }
    }
  }

  .form > .buttons {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
