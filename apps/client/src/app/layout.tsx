import './globals.css'
import { ReactNode } from 'react'
import { site } from '@/config/site'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-blue-50 font-sans text-base antialiased dark:bg-slate-900 dark:text-slate-200">
        {children}
      </body>
    </html>
  )
}
