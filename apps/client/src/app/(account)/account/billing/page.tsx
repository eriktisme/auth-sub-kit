import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { Alert, Shell, ShellHeader } from '@/components'
import { Metadata } from 'next'
import { getAmplifyWithSSRContext } from '@/lib/amplify'
import gql from 'graphql-tag'
import { Plans } from './components'
import { site } from '@/config'

export const metadata: Metadata = {
  title: 'Billing',
}

export default async function Page() {
  const SSR = getAmplifyWithSSRContext()

  const result = await SSR.API.graphql({
    query: gql`
      query BillingSettingsQuery {
        activeStripeProducts {
          id
          name
          description
          prices {
            id
            unitAmount
            currency
            interval
            intervalCount
          }
        }
        activeStripeSubscription {
          id
          product {
            id
          }
          price {
            id
          }
        }
      }
    `,
  })

  return (
    <Shell>
      <ShellHeader
        heading="Billing"
        description="Manage your billing and subscription plan."
      />
      <Alert
        title="This is a demo application"
        icon={
          <ExclamationTriangleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden={true}
          />
        }
        description={
          <p>
            {site.name} is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the Stripe docs{' '}
            <a
              href="https://stripe.com/docs/testing#cards"
              rel="noreferrer"
              target="_blank"
              className="font-medium text-blue-700 underline hover:text-blue-600"
            >
              here
            </a>
            .
          </p>
        }
      />
      <Plans
        products={result.data.activeStripeProducts}
        subscription={result.data.activeStripeSubscription ?? undefined}
      />
    </Shell>
  )
}
