import logo from '../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/config'

export const SiteHeader = () => (
  <header className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
    <div className="flex w-full items-center justify-between">
      <div>
        <Image className="h-[3rem] w-auto" src={logo} alt={site.name} />
      </div>
      <nav></nav>
      <div>
        <Link
          href="/login"
          className="rounded-md bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm"
        >
          Login
        </Link>
      </div>
    </div>
  </header>
)
