import * as yup from 'yup'
import { fields } from './../json/index.json'

const { label, ['group.links']: groupLinks } = fields

const groupSchema = yup.object({
  links: yup.array().min(1, groupLinks.validation.required),
})

const tabFormValidationSchema = yup.object({
  label: yup.string().required(label.validation.required),
  groups: yup.lazy((value) =>
    yup.object(Object.fromEntries(Object.entries(value || {}).map(([k]) => [k, groupSchema]))),
  ),
})

export { tabFormValidationSchema }
