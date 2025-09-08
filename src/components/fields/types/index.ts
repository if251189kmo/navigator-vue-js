import type { QInputProps, QSelectProps } from 'quasar'

type InputFieldProps = {
  name: string
  classes?: string
  placeholder?: string
  label: QInputProps['label']
  errors?: Record<string, string | undefined>
  beforeIcon: string
  type?: QInputProps['type']
  outlined?: QInputProps['outlined']
  dense?: QInputProps['dense']
}

type SelectFieldProps = {
  name: string
  classes?: string
  placeholder?: string
  label: QSelectProps['label']
  options: QSelectProps['options']
  errors?: Record<string, string | undefined>
  beforeIcon: string
  outlined?: QInputProps['outlined']
  multiple?: QSelectProps['multiple']
  useChips?: QSelectProps['useChips']
  dense?: QSelectProps['dense']
}

export type { InputFieldProps, SelectFieldProps }
