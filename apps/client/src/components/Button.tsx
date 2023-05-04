import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

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
      ...rest
    } = props

    const appearances: { [key in ButtonAppearance]: string[] } = {
      default: ['bg-black text-white'],
    }

    return (
      <button
        className={cn(
          'rounded-md px-4 py-2 text-sm font-semibold shadow-sm',
          ...appearances[appearance]
        )}
        disabled={isDisabled || isLoading}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)
