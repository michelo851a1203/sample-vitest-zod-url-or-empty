import * as zod from 'zod'

export const testValidator = zod.object({
  name: zod.string({
    required_error: 'this is error required',
    invalid_type_error: 'type error',
  })
    .url('need url')
    .min(1, 'name required')
    .or(zod.literal('')),
})

export type testType = zod.infer<typeof testValidator>
