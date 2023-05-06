import { z } from 'zod'

export const configSchema = z.object({
  domain: z.string().optional(),
  prefix: z.string(),
  stripeApiToken: z.string().optional(),
  stripeWebhookTokenId: z.string().optional(),
})

export const config = configSchema.parse({
  domain: process.env.DOMAIN!,
  prefix: process.env.PREFIX!,
  stripeApiToken: process.env.STRIPE_API_TOKEN_ID,
  stripeWebhookTokenId: process.env.STRIPE_WEBHOOK_TOKEN_ID,
})
