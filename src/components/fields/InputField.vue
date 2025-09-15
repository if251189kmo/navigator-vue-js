<template>
  <div :class="classes || $style.field">
    <label v-if="label" :class="[$style.label, !!errors?.[name] ? $style.error : '']">{{
      label
    }}</label>
    <q-input
      :outlined="outlined"
      :type="type"
      :dense="dense"
      :error="!!errors?.[name]"
      :error-message="errors?.[name]"
      v-model="inputValue"
      v-bind="qInputProps"
      @update:model-value="onUpdate"
    >
      <template v-slot:before>
        <q-icon :name="beforeIcon" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputFieldProps } from './types'
import { computed } from 'vue'

const {
  name,
  label,
  classes,
  errors,
  value,
  onUpdate,
  beforeIcon,
  type = 'text',
  outlined = true,
  dense = true,
  ...qInputProps
} = defineProps<InputFieldProps>()

const field = useField<InputFieldProps['value']>(name)
const inputValue = computed({
  get: () => value || field.value.value,
  set: (v: InputFieldProps['value']) => (field.value.value = v),
})
</script>

<style module lang="scss">
.field {
  width: 300px;
}

.label {
  margin: 4px 4px 4px 34px;
  font-weight: 500;
}

.error {
  color: $negative;
}
</style>
