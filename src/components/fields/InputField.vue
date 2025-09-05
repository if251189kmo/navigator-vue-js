<template>
  <div :class="classes || $style.field">
    <label :class="[$style.label, !!errors?.[name] ? $style.error : '']">{{ label }}</label>
    <q-input
      :outlined="outlined"
      :type="type"
      :dense="dense"
      :error="!!errors?.[name]"
      :error-message="errors?.[name]"
      v-model="value"
      v-bind="qInputProps"
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

const {
  name,
  label,
  classes,
  errors,
  beforeIcon,
  type = 'text',
  outlined = true,
  dense = true,
  ...qInputProps
} = defineProps<InputFieldProps>()

const { value } = useField<string>(name)
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
