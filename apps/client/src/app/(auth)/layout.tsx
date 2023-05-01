import { ReactNode } from 'react'
import { getAmplifyWithSSRContext } from '@/lib'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const SSR = getAmplifyWithSSRContext()

  const currentUser = await getCurrentUser(SSR.Auth)

  if (currentUser) {
    return redirect('/dashboard')
  }

  return <div className="flex min-h-full flex-1">{children}</div>
}
