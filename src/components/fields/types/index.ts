import type { QInputProps, QSelectProps } from 'quasar'

type FieldErrors = Record<string, string | undefined>

type InputFieldProps = {
  name: string
  classes?: string
  placeholder?: string
  label: QInputProps['label']
  errors?: FieldErrors
  beforeIcon: string
  type?: QInputProps['type']
  outlined?: QInputProps['outlined']
  dense?: QInputProps['dense']
}

type SelectFieldProps = {
  name: string
  classes?: string
  placeholder?: string
  value?: { id: number; label: string }[]
  label: QSelectProps['label']
  options: QSelectProps['options']
  errors?: FieldErrors
  beforeIcon: string
  outlined?: QInputProps['outlined']
  multiple?: QSelectProps['multiple']
  useChips?: QSelectProps['useChips']
  dense?: QSelectProps['dense']
}

export type { InputFieldProps, SelectFieldProps, FieldErrors }
