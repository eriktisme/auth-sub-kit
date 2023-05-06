import { z } from 'zod'
import {
  StripeCustomerSchema,
  StripePriceSchema,
  StripeProductSchema,
  StripeSubscriptionSchema,
} from '../../../domain'

export type PriceModel = z.infer<typeof StripePriceSchema>

export type PriceKey = Pick<
  z.infer<typeof StripePriceSchema>,
  'priceId' | 'productId'
>

export type ProductModel = z.infer<typeof StripeProductSchema>

export type ProductKey = Pick<z.infer<typeof StripeProductSchema>, 'productId'>

export type CustomerModel = z.infer<typeof StripeCustomerSchema>

export type CustomerKey = Pick<z.infer<typeof StripeCustomerSchema>, 'userId'>

export type SubscriptionModel = z.infer<typeof StripeSubscriptionSchema>

export type SubscriptionKey = Pick<
  z.infer<typeof StripeSubscriptionSchema>,
  'userId'
>
