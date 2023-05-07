import { StripeProduct } from '../../../appsync'
import { HandlerDeps } from './types'

export const buildHandler = async (
  deps: HandlerDeps
): Promise<StripeProduct[]> => {
  const products = await deps.productsService.getActiveProducts()

  const productsWithPrices = await Promise.all(
    products.map(async (product) => {
      const prices = await deps.pricesService.findPricesForProduct(
        product.productId
      )

      return {
        ...product,
        prices,
      }
    })
  )

  return productsWithPrices.reverse().map((product) => ({
    id: product.productId,
    active: product.active,
    description: product.description,
    image: product.image,
    name: product.name,
    prices: product.prices.map((price) => ({
      id: price.priceId,
      active: price.active,
      currency: price.currency,
      description: price.description,
      interval: price.interval,
      intervalCount: price.intervalCount,
      type: price.type,
      unitAmount: price.unitAmount,
    })),
  }))
}
