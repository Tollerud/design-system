import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const pillVariants = {
  outline: 'bg-transparent border border-tollerud-border text-tollerud-text-secondary',
  solid: 'bg-tollerud-surface-raised text-tollerud-text-primary',
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
          'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full leading-none',
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
