import { Shell, ShellHeader } from '@/components'
import { Metadata } from 'next'
import { getAmplifyWithSSRContext } from '@/lib/amplify'
import gql from 'graphql-tag'
import { Plans } from './components'

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
      <Plans
        products={result.data.activeStripeProducts}
        subscription={result.data.activeStripeSubscription ?? undefined}
      />
    </Shell>
  )
}
