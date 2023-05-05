'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib'
import { usePathname } from 'next/navigation'

interface NavItem {
  title: ReactNode
  href: string
}

interface SidebarNavProps {
  items?: NavItem[]
}

export const SidebarNav = ({ items }: SidebarNavProps) => {
  const path = usePathname()

  return (
    <nav className="flex flex-1 flex-col" aria-label="Sidebar">
      <ul role="list" className="space-y-1">
        {items?.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center rounded-md px-3 py-2 leading-6',
                path === item.href ? 'bg-blue-100' : 'hover:bg-blue-100'
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
