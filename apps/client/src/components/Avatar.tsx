import { forwardRef, HTMLAttributes } from 'react'

type AvatarSize = 'tiny' | 'small' | 'medium' | 'large'

type AvatarShape = 'round' | 'square'

type AvatarAppearance = 'default'

interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  appearance?: AvatarAppearance
  name?: string
  size?: AvatarSize
  shape?: AvatarShape
  src?: string
}

const getInitials = (name?: string, fallback = '?'): string => {
  if (!name) {
    return fallback
  }

  return name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('')
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    appearance = 'default',
    size = 'medium',
    shape = 'round',
    name,
    src,
    className,
  } = props

  const appearances: { [key in AvatarAppearance]: string[] } = {
    default: ['bg-slate-300', 'hover:outline-slate-300'],
  }

  const sizes: { [key in AvatarSize]: string[] } = {
    tiny: ['h-6', 'w-6', 'text-xs'],
    small: ['h-8', 'w-8', 'text-sm'],
    medium: ['h-10', 'w-10'],
    large: ['h-12', 'w-12', 'text-lg'],
  }

  const shapes: { [key in AvatarShape]: string[] } = {
    square: ['rounded-sm'],
    round: ['rounded-full'],
  }

  const initials = getInitials(name)

  return (
    <div
      className={[
        'inline-flex select-none items-center justify-center overflow-hidden',
        ...sizes[size],
        ...appearances[appearance],
        ...shapes[shape],
        className,
      ].join(' ')}
      ref={ref}
    >
      {src ? (
        <img className="block h-full w-full object-cover" src={src} />
      ) : (
        <span className="leading-none">{initials}</span>
      )}
    </div>
  )
})
