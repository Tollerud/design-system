import { type HTMLAttributes, forwardRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

export interface PricingCardProps extends HTMLAttributes<HTMLDivElement> {
  name: React.ReactNode
  price: React.ReactNode
  /** Rendered after the price, e.g. "/month" */
  period?: React.ReactNode
  description?: React.ReactNode
  features?: React.ReactNode[]
  ctaLabel?: React.ReactNode
  onCtaClick?: () => void
  /** Visually highlights this plan as the recommended/featured option */
  featured?: boolean
  /** Small label shown above the price when featured, e.g. "Most popular" */
  badge?: React.ReactNode
}

const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      name,
      price,
      period,
      description,
      features = [],
      ctaLabel = 'Get started',
      onCtaClick,
      featured,
      badge,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-5 rounded-xl border p-6',
          featured
            ? 'border-tollerud-yellow bg-tollerud-yellow/[0.04] shadow-[0_0_0_1px_rgba(255,255,0,0.15)]'
            : 'border-tollerud-border bg-tollerud-surface',
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-1">
          {badge && (
            <span className="inline-flex w-fit items-center rounded-full bg-tollerud-yellow/15 px-2.5 py-0.5 text-xs font-medium text-tollerud-yellow">
              {badge}
            </span>
          )}
          <h3 className="text-base font-medium text-tollerud-text-primary">{name}</h3>
          {description && <p className="text-sm text-tollerud-text-muted">{description}</p>}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight text-tollerud-text-primary">{price}</span>
          {period && <span className="text-sm text-tollerud-text-muted">{period}</span>}
        </div>

        {features.length > 0 && (
          <ul className="flex flex-col gap-2.5">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-tollerud-text-secondary">
                <Check size={16} className="mt-0.5 shrink-0 text-tollerud-yellow" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <Button variant={featured ? 'primary' : 'secondary'} onClick={onCtaClick} className="mt-auto w-full">
          {ctaLabel}
        </Button>
      </div>
    )
  }
)
PricingCard.displayName = 'PricingCard'

export { PricingCard }
