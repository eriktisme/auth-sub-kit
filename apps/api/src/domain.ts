import { any, z } from 'zod'

export const StripePriceSchema = z.object({
  priceId: z.string(),
  productId: z.string(),
  active: z.boolean(),
  currency: z.string(),
  description: z.string().optional(),
  type: z.string(),
  unitAmount: z.number(),
  interval: z.string().optional(),
  intervalCount: z.number().optional(),
  trialPeriodDays: z.number().optional(),
  metadata: z.record(any()).optional(),
})

export type StripePrice = z.infer<typeof StripePriceSchema>

export const StripeProductSchema = z.object({
  productId: z.string(),
  active: z.boolean(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  metadata: z.record(any()).optional(),
})

export type StripeProduct = z.infer<typeof StripeProductSchema>
