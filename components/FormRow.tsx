'use client'

import { type HTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

export interface FormRowProps extends HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  /** Hint text rendered below the label */
  description?: React.ReactNode
  /** Alias for `description` — used in docs/settings layouts */
  hint?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  /** Forwarded to the label's `htmlFor` — should match the control's `id` */
  htmlFor?: string
  /** `settings` = label/hint left, control right; `stack` = vertical field layout */
  layout?: 'settings' | 'stack'
}

const FormRow = forwardRef<HTMLDivElement, FormRowProps>(
  (
    {
      className,
      label,
      description,
      hint,
      error,
      required,
      htmlFor,
      layout = 'settings',
      children,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const helpText = description ?? hint
    const descriptionId = helpText ? `${autoId}-description` : undefined
    const errorId = error ? `${autoId}-error` : undefined

    if (layout === 'settings' && label) {
      return (
        <div ref={ref} className={cn('tollerud-formrow', className)} {...props}>
          <div>
            <label htmlFor={htmlFor} className="tollerud-formrow__title">
              {label}
              {required && <span className="ml-0.5 text-tollerud-error">*</span>}
            </label>
            {helpText && (
              <p id={descriptionId} className="tollerud-formrow__hint">
                {helpText}
              </p>
            )}
          </div>
          <div
            className="tollerud-formrow__control"
            aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          >
            {children}
          </div>
          {error && (
            <p id={errorId} className="col-span-2 text-xs text-tollerud-error">
              {error}
            </p>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props}>
        {label && (
          <label htmlFor={htmlFor} className="text-sm font-medium text-tollerud-text-primary">
            {label}
            {required && <span className="ml-0.5 text-tollerud-error">*</span>}
          </label>
        )}
        {helpText && (
          <p id={descriptionId} className="text-xs text-tollerud-text-muted">
            {helpText}
          </p>
        )}
        <div aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}>{children}</div>
        {error && (
          <p id={errorId} className="text-xs text-tollerud-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormRow.displayName = 'FormRow'

export { FormRow }
