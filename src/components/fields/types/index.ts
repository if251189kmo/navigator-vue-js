import type { QInputProps } from 'quasar'

type InputFieldProps = {
  name: string
  classes?: string
  placeholder?: string
  label: QInputProps['label']
  errors?: Record<string, string | undefined>
  beforeIcon?: string
  type?: QInputProps['type']
  outlined?: QInputProps['outlined']
  dense?: QInputProps['dense']
}

export type { InputFieldProps }
