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

export const StripeCustomerSchema = z.object({
  customerId: z.string(),
  email: z.string().email(),
  userId: z.string(),
})

export type StripeCustomer = z.infer<typeof StripeCustomerSchema>

export const StripeSubscriptionSchema = z.object({
  subscriptionId: z.string(),
  userId: z.string(),
  productId: z.string(),
  priceId: z.string(),
  canceledAt: z.string().optional(),
  status: z.string(),
  cancelAtPeriodEnd: z.string().optional(),
  currentPeriodEnd: z.string(),
  startedAt: z.string(),
  endedAt: z.string().optional(),
})

export type StripeSubscription = z.infer<typeof StripeSubscriptionSchema>
