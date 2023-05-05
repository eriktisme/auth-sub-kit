import { z } from 'zod'

const environmentVariablesSchema = z.object({
  PREFIX: z.string(),
  API: z.string(),
  COGNITO_USER_POOL_ID: z.string(),
  COGNITO_USER_POOL_CLIENT_ID: z.string(),
  COGNITO_USER_POOL_DOMAIN: z.string(),
  COGNITO_REDIRECT_URL: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
})

export const environmentVariables = environmentVariablesSchema.parse({
  PREFIX: process.env.NEXT_PUBLIC_PREFIX!,
  API: process.env.NEXT_PUBLIC_API!,
  COGNITO_USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  COGNITO_USER_POOL_CLIENT_ID:
    process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!,
  COGNITO_USER_POOL_DOMAIN: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_DOMAIN!,
  COGNITO_REDIRECT_URL: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URL!,
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
})
