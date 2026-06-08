import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical'
  /** Optional label rendered inline (horizontal orientation only) */
  label?: React.ReactNode
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn('w-px self-stretch bg-tollerud-border', className)}
          {...props}
        />
      )
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn('flex items-center gap-3 text-xs text-tollerud-text-muted', className)}
          {...props}
        >
          <span className="h-px flex-1 bg-tollerud-border" />
          <span>{label}</span>
          <span className="h-px flex-1 bg-tollerud-border" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn('h-px w-full bg-tollerud-border', className)}
        {...props}
      />
    )
  }
)
Divider.displayName = 'Divider'

export { Divider }
