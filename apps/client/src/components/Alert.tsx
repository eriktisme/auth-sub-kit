import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib'

interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  description?: ReactNode
  icon?: ReactNode
  title: string
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { title, description, icon, className } = props

  return (
    <div className={cn('rounded-md bg-blue-100 p-4', className)} ref={ref}>
      <div className="flex">
        {icon ? <div className="mr-3 flex-shrink-0 pt-2">{icon}</div> : null}
        <div>
          <h3 className="font-medium text-blue-800">{title}</h3>
          {description ? (
            <div className="mt-2 text-blue-700">{description}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
})
