import { z } from 'zod'

export const configSchema = z.object({
  prefix: z.string(),
  stripeWebhookTokenId: z.string().optional(),
})

export const config = configSchema.parse({
  prefix: process.env.PREFIX!,
  stripeWebhookTokenId: process.env.STRIPE_WEBHOOK_TOKEN_ID,
})
