import { z } from 'zod'
import { StripeProductSchema, StripePriceSchema } from '../../domain'

interface ProductsServiceDeps {
  //
}

type UpsertProductArgs = Omit<z.infer<typeof StripeProductSchema>, 'prices'>

type AttachPriceArgs = z.infer<typeof StripePriceSchema>

export class ProductsService {
  constructor(protected deps: ProductsServiceDeps) {
    //
  }

  upsert(args: UpsertProductArgs): Promise<void> {
    return Promise.resolve()
  }

  upsertPrice(args: AttachPriceArgs): Promise<void> {
    return Promise.resolve()
  }
}
