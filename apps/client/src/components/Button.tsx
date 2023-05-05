import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib'
import { Spinner } from './Spinner'

type ButtonAppearance = 'default'

type ButtonType = 'button' | 'submit' | 'reset'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  appearance?: ButtonAppearance
  isDisabled?: boolean
  isLoading?: boolean
  type?: ButtonType
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      appearance = 'default',
      children,
      isDisabled = false,
      isLoading = false,
      type = 'button',
      className,
      ...rest
    } = props

    const appearances: { [key in ButtonAppearance]: string[] } = {
      default: ['bg-black text-white'],
    }

    return (
      <button
        className={cn(
          'flex flex-row items-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm',
          ...appearances[appearance],
          isDisabled || isLoading ? 'cursor-not-allowed opacity-50' : null,
          className
        )}
        disabled={isDisabled || isLoading}
        {...rest}
        ref={ref}
      >
        {isLoading ? (
          <Spinner size="small" appearance={appearance} className="mr-2" />
        ) : null}
        {children}
      </button>
    )
  }
)
