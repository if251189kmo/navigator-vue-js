import type { Ref } from 'vue'
import { computed, unref } from 'vue'
import type { FieldErrors } from '../types'
import patterns from 'src/constants/patterns'

const formattedErrors = (errors: Ref<FieldErrors> | FieldErrors) =>
  computed(() => {
    const raw = unref(errors)
    const result: FieldErrors = {}

    Object.entries(raw).forEach(([key, msg]) => {
      if (!msg) return
      result[key.replace(patterns.errorsPath, '.$1')] = msg
    })

    return result
  })

export { formattedErrors }
