import { z } from 'zod'

export const configSchema = z.object({
  stripeWebhookTokenId: z.string().optional(),
})

export const config = configSchema.parse({
  stripeWebhookTokenId: process.env.STRIPE_WEBHOOK_TOKEN_ID,
})
