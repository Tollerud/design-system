import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/** Layer classes from globals-layers.css — colored mono tags */
const pillLayers = {
  outline: 'tollerud-pill--outline',
  muted: 'tollerud-pill--muted',
  success: 'tollerud-pill--success',
  error: 'tollerud-pill--error',
  solid: '',
  accent: '',
} as const

const pillVariants = {
  outline: '',
  muted: '',
  success: '',
  error: '',
  solid: 'bg-tollerud-surface-raised text-tollerud-text-primary border-transparent',
  accent: 'bg-tollerud-yellow/15 border border-tollerud-yellow/30 text-tollerud-yellow',
} as const

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof pillVariants
}

const Pill = forwardRef<HTMLSpanElement, PillProps>(
  ({ className, variant = 'outline', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'tollerud-pill inline-flex items-center gap-1 leading-none',
          pillLayers[variant],
          pillVariants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Pill.displayName = 'Pill'

export { Pill }
