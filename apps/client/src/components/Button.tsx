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
      default: [
        'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
      ],
    }

    return (
      <button
        className={cn(
          'inline-flex flex-none items-center justify-center gap-2 rounded-md  px-3 py-2 text-sm font-semibold transition',
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
