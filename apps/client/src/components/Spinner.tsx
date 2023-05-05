import { cn } from '@/lib'
import { HTMLAttributes } from 'react'

type SpinnerSize = 'tiny' | 'small' | 'medium' | 'large'

type SpinnerAppearance = 'default'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize
  appearance?: SpinnerAppearance
}

export const Spinner = (props: SpinnerProps) => {
  const { size = 'medium', appearance = 'default', className, ...rest } = props

  const sizes: { [key in SpinnerSize]: string[] } = {
    tiny: ['h-4', 'w-4', 'border-2'],
    small: ['h-4', 'w-4', 'border-2'],
    medium: ['h-8', 'w-8', 'border-2'],
    large: ['h-12', 'w-12', 'border-2'],
  }

  const appearances: { [key in SpinnerAppearance]: string[] } = {
    default: ['border-gray-300'],
  }

  return (
    <div
      {...rest}
      className={cn(
        'animate-spin rounded-full transition transition-all ease-linear',
        ...sizes[size],
        ...appearances[appearance],
        className
      )}
      style={{
        borderTopColor: 'transparent',
      }}
    />
  )
}
