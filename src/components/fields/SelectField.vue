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
import { computed, ref, watch } from 'vue'

const {
  name,
  label,
  classes,
  errors,
  beforeIcon,
  value,
  outlined = true,
  dense = true,
  options = [],
  multiple = false,
  useChips = false,
  ...qInputProps
} = defineProps<SelectFieldProps>()

type SelectItem = { id: number; label: string }
type SelectValue = SelectItem | SelectItem[]

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
