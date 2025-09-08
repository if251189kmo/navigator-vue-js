<template>
  <div :class="classes || $style.field">
    <label :class="[$style.label, !!errors?.[name] ? $style.error : '']">{{ label }}</label>
    <q-select
      :dense="dense"
      v-model="value"
      :error="!!errors?.[name]"
      :error-message="errors?.[name]"
      :outlined="outlined"
      :options="options"
      v-bind="qInputProps"
      use-input
      @popup-show="loadOptions"
      :loading="loading"
      :use-chips="useChips"
      :multiple="multiple"
    >
      <template v-slot:before>
        <q-icon :name="beforeIcon" />
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import type { SelectFieldProps } from './types'
import { useHomeStore } from 'src/stores/home'
import { ref } from 'vue'

const {
  name,
  label,
  classes,
  errors,
  beforeIcon,
  outlined = true,
  dense = true,
  options = [],
  multiple = false,
  useChips = false,
  ...qInputProps
} = defineProps<SelectFieldProps>()

const { value } = useField<string>(name)
const homeStore = useHomeStore()
const loading = ref(false)

const loadOptions = async () => {
  loading.value = true
  try {
    await homeStore.fetchLinks()
  } finally {
    loading.value = false
  }
}
</script>

<style module lang="scss">
.field {
  width: 250px;
}

.label {
  margin: 4px 4px 4px 34px;
  font-weight: 500;
}

.error {
  color: $negative;
}
</style>
