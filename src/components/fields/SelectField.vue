<template>
  <div :class="classes || $style.field">
    <label :class="[$style.label, !!errors?.[name] ? $style.error : '']">{{ label }}</label>

    <q-select
      :dense="dense"
      v-model="selectedValue"
      :error="!!errors?.[name]"
      :options="filteredOptions"
      :error-message="errors?.[name]"
      :outlined="outlined"
      :placeholder="placeholder"
      v-bind="qInputProps"
      :use-input="isUseInput"
      @popup-show="loadOptions"
      :loading="loading"
      :use-chips="useChips"
      :multiple="multiple"
      @filter="onSelectSearch"
    >
      <template v-if="multiple" v-slot:before-options>
        <InputField
          class="q-pa-sm"
          name="search"
          :value="search || ''"
          placeholder="Пошук..."
          beforeIcon="search"
          :onUpdate="onSearch"
        />
      </template>

      <template v-if="multiple" v-slot:no-option>
        <InputField
          class="q-pa-sm"
          name="search"
          :value="search || ''"
          placeholder="Пошук..."
          beforeIcon="search"
          :onUpdate="onSearch"
        />
        <q-item>
          <q-item-section class="text-grey"> Нема результатів </q-item-section>
        </q-item>
      </template>

      <template v-if="$slots.option" v-slot:option="scope">
        <slot name="option" v-bind="scope" />
      </template>

      <template v-if="$slots.selected" v-slot:selected-item="scope">
        <slot name="selected" v-bind="scope" />
      </template>

      <template v-slot:before>
        <q-icon :name="beforeIcon" />
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputFieldProps, SelectFieldProps, SelectValue } from './types'
import { useHomeStore } from 'src/stores/home'
import { computed, ref, watch } from 'vue'
import InputField from './InputField.vue'

const {
  name,
  label,
  classes,
  errors,
  beforeIcon,
  value,
  useInput,
  placeholder,
  outlined = true,
  dense = true,
  options = [],
  multiple = false,
  useChips = false,
  ...qInputProps
} = defineProps<SelectFieldProps>()

const field = useField<SelectValue>(name)
const homeStore = useHomeStore()
const loading = ref(false)
const search = ref<InputFieldProps['value']>('')

const selectedValue = computed({
  get: () => value || field.value.value,
  set: (v: SelectValue) => (field.value.value = v),
})

const filteredOptions = computed(() => options.filter(({ label }) => label.includes(search.value)))
const isUseInput = computed(
  () => useInput || (Array.isArray(selectedValue.value) && selectedValue.value.length === 0),
)

const onSearch = (val: InputFieldProps['value']) => {
  search.value = val
}

const onSelectSearch = (
  inputValue: string,
  doneFn: (callback: () => void) => void,
  abortFn: () => void,
) => {
  if (isUseInput.value) abortFn()
  search.value = inputValue
  doneFn(() => {})
}

const loadOptions = async () => {
  loading.value = true
  try {
    await homeStore.fetchLinks()
  } finally {
    loading.value = false
  }
}

watch(
  () => value,
  (val) => {
    if (val !== undefined) field.value.value = val
  },
)
</script>

<style module lang="scss">
.field {
  width: inherit;
}

.label {
  margin: 4px 4px 4px 34px;
  font-weight: 500;
}

.error {
  color: $negative;
}
</style>
