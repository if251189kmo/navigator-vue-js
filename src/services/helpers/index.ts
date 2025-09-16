import type { CreateTabForm, EditTabForm } from 'src/components/tab/types'

const reselectTabForm = ({ groups, ...rest }: CreateTabForm | EditTabForm) => ({
  ...rest,
  groups: Object.values(groups).map(({ links, ...other }) => ({
    ...other,
    linksIds: links.map((link) => link.id),
  })),
})

export { reselectTabForm }
