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

  const { data } = await SSR.API.graphql({
    query: gql`
      query BillingSettingsActiveStripeProductsQuery {
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
      }
    `,
  })

  return (
    <Shell>
      <ShellHeader
        heading="Billing"
        description="Manage your billing and subscription plan."
      />
      <Plans products={data.activeStripeProducts} />
    </Shell>
  )
}
