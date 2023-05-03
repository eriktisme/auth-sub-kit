import { ReactNode } from 'react'
import { SiteFooter, SiteHeader } from '@/components'

interface MarketingLayoutProps {
  children?: ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="items-between flex h-full flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
