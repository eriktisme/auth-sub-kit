import { Metadata } from 'next'
import { Shell, ShellHeader } from '@/components'

export const metadata: Metadata = {
  title: 'Account',
}

export default async function Page() {
  return (
    <Shell>
      <ShellHeader
        heading="Personal Account Settings"
        description="Manage your general account profile information."
      />
    </Shell>
  )
}
