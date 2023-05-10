import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 py-12 md:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 dark:text-slate-100 lg:text-7xl">
          An example app built using Next.js and managed AWS services.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 dark:text-slate-400">
          Building a starter kit that includes authentication, subscriptions
          using Next.js and managed AWS services such as AWS Cognito, AWS
          DynamoDB, AWS EventBridge, and more.
        </p>
      </div>
      <div className="mt-10">
        <Link
          href="/login"
          className="rounded-md bg-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-100 shadow-sm hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
