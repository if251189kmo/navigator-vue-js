import * as yup from 'yup'
import { fields } from './../json/index.json'

const { label, ['group.linksIds']: groupLinksIds } = fields

const groupSchema = yup.object({
  linksIds: yup.array().min(1, groupLinksIds.validation.required),
})

const tabFormValidationSchema = yup.object({
  label: yup.string().required(label.validation.required),
  groups: yup.lazy((value) =>
    yup.object(Object.fromEntries(Object.entries(value || {}).map(([k]) => [k, groupSchema]))),
  ),
})

export { tabFormValidationSchema }
