import '@/lib/amplify/client'
import { ReactNode } from 'react'
import { getAmplifyWithSSRContext } from '@/lib/amplify/ssr'
import { getCurrentUser } from '@/lib'
import { notFound } from 'next/navigation'
import { MainNav, SidebarNav, SiteFooter, UserAccountNav } from '@/components'

interface DashboardLayoutProps {
  children?: ReactNode
}

export default async function AccountLayout({
  children,
}: DashboardLayoutProps) {
  const SSR = getAmplifyWithSSRContext()

  const currentUser = await getCurrentUser(SSR.Auth)

  if (!currentUser) {
    return notFound()
  }

  return (
    <div className="flex min-h-full flex-col space-y-6">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <MainNav
            items={[
              { href: '/dashboard', title: 'Dashboard' },
              { href: '#', title: 'Test' },
            ]}
          />
          <UserAccountNav user={currentUser} />
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-10 px-4 lg:px-8">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav
            items={[
              {
                href: '/account',
                title: 'General',
              },
              {
                href: '/account/billing',
                title: 'Billing',
              },
            ]}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
