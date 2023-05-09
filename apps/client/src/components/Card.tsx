import { forwardRef, HTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib'

export const Card = ({ children }: PropsWithChildren) => {
  return <div className="overflow-hidden rounded-lg bg-white">{children}</div>
}

export const CardBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className = 'sm:pt-0', ...props }, ref) => {
  return (
    <div
      className={cn('px-4 py-5 pt-0 sm:p-6', className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
})

interface CardHeaderProps {
  heading: string
  description?: ReactNode
}

export const CardHeader = ({ heading, description }: CardHeaderProps) => {
  return (
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-base font-semibold capitalize leading-6 tracking-tight text-slate-900">
        {heading}
      </h3>
      {description ? (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  )
}
export const CardFooter = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-end bg-gray-50 px-4 py-5 sm:px-6">
      {children}
    </div>
  )
}
