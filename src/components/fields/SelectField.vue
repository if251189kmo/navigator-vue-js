<template>
  <div :class="classes || $style.field">
    <label :class="[$style.label, !!errors?.[name] ? $style.error : '']">{{ label }}</label>

    <q-select
      :dense="dense"
      v-model="selectedValue"
      :error="!!errors?.[name]"
      :error-message="errors?.[name]"
      :outlined="outlined"
      :options="options"
      :placeholder="placeholder"
      v-bind="qInputProps"
      :use-input="useInput || (Array.isArray(selectedValue) && selectedValue.length === 0)"
      @popup-show="loadOptions"
      :loading="loading"
      :use-chips="useChips"
      :multiple="multiple"
    >
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
import type { SelectFieldProps, SelectValue } from './types'
import { useHomeStore } from 'src/stores/home'
import { computed, ref, watch } from 'vue'

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

const selectedValue = computed({
  get: () => value || field.value.value,
  set: (v: SelectValue) => (field.value.value = v),
})

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
