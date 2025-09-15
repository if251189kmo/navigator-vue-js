import type { QInputProps, QSelectProps } from 'quasar'

type FieldErrors = Record<string, string | undefined>

type InputValue = string | number | null
type SelectItem = { id: number; label: string }
type SelectValue = SelectItem | SelectItem[]

type InputFieldProps = {
  name: string
  classes?: string
  placeholder?: string
  label?: QInputProps['label']
  errors?: FieldErrors
  value?: InputValue
  onUpdate?: QInputProps['onUpdate:modelValue']
  beforeIcon: string
  type?: QInputProps['type']
  outlined?: QInputProps['outlined']
  dense?: QInputProps['dense']
}

type SelectFieldProps = {
  name: string
  classes?: string
  placeholder?: string
  value?: SelectValue
  label: QSelectProps['label']
  options: QSelectProps['options']
  errors?: FieldErrors
  beforeIcon?: string
  useInput?: QSelectProps['useInput']
  outlined?: QInputProps['outlined']
  multiple?: QSelectProps['multiple']
  useChips?: QSelectProps['useChips']
  dense?: QSelectProps['dense']
}

export type { InputFieldProps, SelectFieldProps, SelectValue, FieldErrors }
