'use client'

import '@/lib/amplify/client'
import { Switch } from '@headlessui/react'
import {
  CreateStripeCheckoutSessionResponse,
  StripePrice,
  StripeProduct,
  StripeSubscription,
} from '@/appsync'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@/components'
import { loadStripe } from '@stripe/stripe-js'
import { environmentVariables } from '@/env'
import { cn } from '@/lib'
import { API } from 'aws-amplify'
import gql from 'graphql-tag'

interface PlansProps {
  products: StripeProduct[]
  subscription?: StripeSubscription
}

export const Plans = ({ products, subscription }: PlansProps) => {
  // TODO: Consider showing an informative message when there are no products
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(false)

  const [loadingPrice, setIsLoadingPrice] = useState<string>()

  const handleCheckout = async (price: StripePrice) => {
    setIsLoadingPrice(price.id)

    try {
      const result = await API.graphql<CreateStripeCheckoutSessionResponse>({
        query: gql`
          mutation CreateStripeCheckoutSessionMutation(
            $input: CreateStripeCheckoutSessionInput
          ) {
            createStripeCheckoutSession(input: $input) {
              ... on StripeCheckoutSession {
                sessionId
              }
              ... on StripeBillingPortalSession {
                url
              }
            }
          }
        `,
        variables: {
          input: {
            price: {
              id: price.id,
            },
          },
        },
      })

      const stripe = await loadStripe(
        environmentVariables.STRIPE_PUBLISHABLE_KEY
      )

      const data = (result as any).data
      if ('url' in data.createStripeCheckoutSession) {
        window.location.href = data.createStripeCheckoutSession.url
      } else {
        stripe?.redirectToCheckout({
          sessionId: data.createStripeCheckoutSession?.sessionId!,
        })
      }
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
                  {product.id === subscription?.product.id
                    ? 'Manage'
                    : 'Subscribe'}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </>
  )
}
