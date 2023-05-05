import { z } from 'zod'
import { StripePriceSchema, StripeProductSchema } from '../../../domain'

export type PriceModel = z.infer<typeof StripePriceSchema>

export type PriceKey = Pick<
  z.infer<typeof StripePriceSchema>,
  'priceId' | 'productId'
>

export type ProductModel = z.infer<typeof StripeProductSchema>

export type ProductKey = Pick<z.infer<typeof StripeProductSchema>, 'productId'>
