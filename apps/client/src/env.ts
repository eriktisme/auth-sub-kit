import { z } from 'zod'

const environmentVariablesSchema = z.object({
  PREFIX: z.string(),
})

export const environmentVariables = environmentVariablesSchema.parse({
  PREFIX: process.env.NEXT_PUBLIC_PREFIX!,
})
