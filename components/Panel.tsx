import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Content rendered on the right side of the header (actions, badges, etc.) */
  actions?: React.ReactNode
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, title, description, actions, children, ...props }, ref) => {
    const hasHeader = title || description || actions

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-tollerud-border bg-tollerud-surface overflow-hidden',
          className
        )}
        {...props}
      >
        {hasHeader && (
          <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-tollerud-border">
            <div className="flex flex-col gap-0.5">
              {title && <h3 className="text-sm font-medium text-tollerud-text-primary">{title}</h3>}
              {description && <p className="text-xs text-tollerud-text-muted">{description}</p>}
            </div>
            {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
          </div>
        )}
        {children && <div className="px-5 py-4">{children}</div>}
      </div>
    )
  }
)
Panel.displayName = 'Panel'

export { Panel }
