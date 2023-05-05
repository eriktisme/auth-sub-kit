import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean
  dataTestId?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { isInvalid, dataTestId, className, type = 'text', ...rest } = props

    return (
      <input
        type={type}
        className={cn(
          'block',
          'w-full',
          'rounded-md',
          'border-0',
          'py-2',
          'px-4',
          'text-gray-900',
          'shadow-sm',
          'ring-1',
          'ring-inset',
          'ring-gray-300',
          'placeholder:text-gray-400',
          'focus:ring-2',
          'focus:ring-inset',
          'focus:ring-indigo-600',
          'sm:leading-6',
          className
        )}
        data-test-id={dataTestId}
        aria-invalid={isInvalid}
        {...rest}
        ref={ref}
      />
    )
  }
)
