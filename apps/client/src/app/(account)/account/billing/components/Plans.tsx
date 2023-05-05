'use client'

import { Switch } from '@headlessui/react'
import { StripePrice, StripeProduct } from '@/appsync'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@/components'
import { loadStripe } from '@stripe/stripe-js'
import { environmentVariables } from '@/env'
import { cn } from '@/lib'

interface PlansProps {
  products: StripeProduct[]
}

type BillingInterval = 'year' | 'month'

export const Plans = ({ products }: PlansProps) => {
  // TODO: Consider showing an informative message when there are no products
  // TODO: Add active subscription check

  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(false)

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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={annualBillingEnabled}
          onChange={setAnnualBillingEnabled}
          className={cn(
            annualBillingEnabled ? 'bg-blue-500' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
              'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">Annual billing</span>{' '}
        </Switch.Label>
      </Switch.Group>
      <div className="space-y-4">
        {products.map((product) => {
          const billingInterval = annualBillingEnabled ? 'year' : 'month'

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
                <span className="text-5xl font-extrabold">
                  {priceFormatted}
                </span>
                <span className="text-base font-medium">
                  /{billingInterval}
                </span>
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
    </>
  )
}
