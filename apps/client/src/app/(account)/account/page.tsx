import { Metadata } from 'next'
import { Shell, ShellHeader } from '@/components'
import { YourNameForm } from './components'
import { getAmplifyWithSSRContext } from '@/lib'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Account',
}

export default async function Page() {
  const SSR = getAmplifyWithSSRContext()

  const currentUser = await getCurrentUser(SSR.Auth)

  if (!currentUser) {
    redirect('/login')
  }

  return (
    <Shell>
      <ShellHeader
        heading="Personal Account Settings"
        description="Manage your general account profile information."
      />
      <YourNameForm user={currentUser} />
    </Shell>
  )
}
