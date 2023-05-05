'use client'

import { StripePrice, StripeProduct } from '@/appsync'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@/components'
import { loadStripe } from '@stripe/stripe-js'
import { environmentVariables } from '@/env'

interface PlansProps {
  products: StripeProduct[]
}

type BillingInterval = 'year' | 'month'

export const Plans = ({ products }: PlansProps) => {
  // TODO: Consider showing an informative message when there are no products
  // TODO: Add active subscription check

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month')

  const [loadingPrice, setIsLoadingPrice] = useState<string>()

  const handleCheckout = async (price: StripePrice) => {
    setIsLoadingPrice(price.id)

    try {
      // TODO: Add mutation to start stripe checkout session

      const stripe = await loadStripe(
        environmentVariables.STRIPE_PUBLISHABLE_KEY
      )

      stripe?.redirectToCheckout({ sessionId: '' })
    } catch (e) {
      console.error('Failed checkout out stripe', e)
    } finally {
      setIsLoadingPrice(undefined)
    }
  }

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const price = product.prices.find(
          (price) => price.interval === billingInterval
        )

        if (!price) {
          return null
        }

        const priceFormatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: price.currency,
          minimumFractionDigits: 0,
        }).format((price.unitAmount || 0) / 100)

        return (
          <Card key={product.id}>
            <CardHeader
              heading={product.name}
              description={product.description ?? undefined}
            />
            <CardBody>
              <span className="text-5xl font-extrabold">{priceFormatted}</span>
              <span className="text-base font-medium">/{billingInterval}</span>
            </CardBody>
            <CardFooter>
              <Button
                type="button"
                isLoading={loadingPrice === price.id}
                onClick={() => handleCheckout(price)}
              >
                Upgrade
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
