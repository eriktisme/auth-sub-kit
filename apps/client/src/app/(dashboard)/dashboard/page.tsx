import { getAmplifyWithSSRContext } from '@/lib'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'

export default async function Page() {
  const SSR = getAmplifyWithSSRContext()

  const currentUser = await getCurrentUser(SSR.Auth)

  if (!currentUser) {
    return notFound()
  }

  return <div>Dashboard</div>
}
