'use client'

import Link from 'next/link'
import logo from '../../public/logo.svg'
import { site } from '@/config'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment, ReactNode } from 'react'

interface NavItem {
  title: ReactNode
  href: string
}

interface MainNavProps {
  items?: NavItem[]
}

export const MainNav = ({ items }: MainNavProps) => {
  return (
    <Popover as="div" className="flex items-center gap-6 md:gap-10">
      {({ open }) => (
        <>
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Image className="h-[3rem] w-auto" src={logo} alt={site.name} />
            <div className="font-bold">{site.name}</div>
          </Link>
          {items?.length ? (
            <nav className="hidden gap-6 md:flex">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="inline-flex items-center px-1 text-sm text-slate-500 transition-colors hover:text-slate-700"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
          <Popover.Button
            aria-label="Toggle menu"
            className="flex items-center space-x-2 md:hidden"
          >
            <div className="h-5 w-5">
              {open ? (
                <XMarkIcon className="block" aria-hidden={true} />
              ) : (
                <Bars3Icon className="block" aria-hidden={true} />
              )}
            </div>
            <span className="font-bold">Menu</span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Overlay className="fixed inset-0 z-10 bg-slate-300/50 opacity-100" />
          </Transition>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute inset-x-4 top-full z-20 mt-2 flex origin-top scale-100 flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 opacity-100 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-900">
              {items?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center py-2 text-slate-600 transition-colors hover:bg-gray-50 hover:text-slate-800"
                >
                  {item.title}
                </Link>
              ))}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
