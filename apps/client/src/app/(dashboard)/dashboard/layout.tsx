import { ReactNode } from 'react'
import { getAmplifyWithSSRContext } from '@/lib'
import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'

interface DashboardLayoutProps {
  children?: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const SSR = getAmplifyWithSSRContext()

  const currentUser = await getCurrentUser(SSR.Auth)

  if (!currentUser) {
    return notFound()
  }

  return <div>{children}</div>
}
