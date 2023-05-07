import { HandlerDeps, HandlerEvent } from './types'
import { StripeProduct } from '../../../../appsync'

export const buildHandler = async (
  deps: HandlerDeps,
  event: HandlerEvent
): Promise<StripeProduct> => {
  const product = await deps.productsService.get(event.arguments.productId)
  const prices = await deps.pricesService.findPricesForProduct(
    product.productId
  )

  return {
    active: product.active,
    description: product.description,
    id: product.productId,
    image: product.image,
    name: product.name,
    prices: prices.map((price) => ({
      ...price,
      id: price.priceId,
    })),
  }
}
