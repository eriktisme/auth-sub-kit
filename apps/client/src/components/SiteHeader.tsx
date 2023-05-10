import logo from '../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/config'

export const SiteHeader = () => (
  <header className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
    <div className="flex w-full items-center justify-between">
      <div>
        <Image
          className="h-[3rem] w-auto fill-white"
          src={logo}
          alt={site.name}
        />
      </div>
      <nav></nav>
      <div>
        <Link
          href="/login"
          className="rounded-md bg-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-100 shadow-sm hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
        >
          Login
        </Link>
      </div>
    </div>
  </header>
)
