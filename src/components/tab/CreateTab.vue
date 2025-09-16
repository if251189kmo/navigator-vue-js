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
        <div :class="$style.tabNameButtons">
          <q-btn color="warning" flat @click="onChangeIcon" v-bind="buttons.changeIcon" />
          <q-btn color="primary" flat @click="onCreateBlock" v-bind="buttons.createBlock" />
        </div>
      </section>

      <div v-if="groups.length">
        <section v-for="groupKey in groups" :key="groupKey" :class="$style.groups">
          <div :class="$style.groupTitle">
            <div>{{ values.groups[groupKey]?.name }}</div>
            <q-btn color="negative" @click="onDeleteBlock(groupKey)" round flat icon="delete" />
          </div>
          <SelectField
            :name="`groups.${groupKey}.links`"
            :classes="$style.fieldSelect"
            multiple
            useChips
            :options="getLinks"
            :errors="formattedErrors(errors).value"
            v-bind="fields.groups"
          >
            <template #option="option">
              <LinksOptions v-bind="option" />
            </template>

            <template #selected="{ opt, index, removeAtIndex }">
              <LinksChip
                :opt="opt"
                :index="index"
                :removeAtIndex="removeAtIndex"
                :chips="getChipsLength(groupKey)"
              />
            </template>
          </SelectField>
        </section>
      </div>
      <div v-else :class="$style.noGroups">
        <q-icon name="dvr" color="teal" size="4em" />
        <div>{{ titles.noGroups }}</div>
      </div>

      <section :class="$style.buttons">
        <q-btn type="submit" flat color="positive" v-bind="buttons.create" />
        <q-btn color="negative" flat @click="onClose" v-bind="buttons.cancelCreate" />
      </section>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { fields, buttons, titles } from './json/index.json'
import InputField from '../fields/InputField.vue'
import SelectField from '../fields/SelectField.vue'
import { useDialogsStore } from 'src/stores/dialog.js'
import { useHomeStore } from 'src/stores/home'
import type { CreateTabForm, CreateTabProps } from './types/index.js'
import { tabFormValidationSchema as validationSchema } from './validation/index.js'
import { formattedErrors } from '../fields/utils/formattedErrors'
import LinksOptions from './shared/LinksOptions.vue'
import LinksChip from './shared/LinksChip.vue'
import { createTab } from 'src/services/tabsService'
import { useGroupsForm } from './composition/useGroupsForm'

const openDialog = useDialogsStore()
const homeStore = useHomeStore()
const { getLinks } = storeToRefs(homeStore)
const { dialogName } = defineProps<CreateTabProps>()

const { handleSubmit, errors, values, setFieldValue } = useForm<CreateTabForm>({
  validationSchema,
  initialValues: {
    label: '',
    groups: {},
    iconUrl: '',
    order: 0,
  },
})

const { groups, getChipsLength, onCreateBlock, onDeleteBlock } = useGroupsForm({
  values,
  setFieldValue,
})

const onChangeIcon = () => console.log('onChangeIcon')
const onClose = () => void openDialog.closeDialog(dialogName)

const onSubmit = handleSubmit((form: CreateTabForm) => {
  void createTab(form)
})
</script>

<style module lang="scss">
.createTab {
  min-width: 700px;

  .form > .tabName {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tabNameButtons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .fieldInput {
      margin-right: 20px;
      width: 250px;
    }
  }

  .form .groups {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.356);
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 20px;

    .groupTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 4px;
    }
    .fieldSelect {
      width: inherit;
    }
  }

  .form .noGroups {
    padding: 43px 0;
    color: rgba(0, 0, 0, 0.696);
    text-align: center;
  }

  .form > .buttons {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
