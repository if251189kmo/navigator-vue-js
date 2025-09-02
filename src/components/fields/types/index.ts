import type { QInputProps } from 'quasar'

type InputField = {
  name: string
  classes?: string
  label: QInputProps['label']
  errors?: Record<string, string | undefined>
  beforeIcon?: string
  type?: QInputProps['type']
  outlined?: QInputProps['outlined']
  dense?: QInputProps['dense']
}

export type { InputField }
