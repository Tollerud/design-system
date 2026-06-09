import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shorthand height in px (or any CSS length via className) */
  h?: number | string
  /** Shorthand width in px or percentage string e.g. "60%" */
  w?: number | string
  /** Shorthand border-radius in px */
  r?: number | string
}

function Skeleton({ className, h, w, r, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('tollerud-skeleton', className)}
      style={{
        ...(h != null ? { height: h } : null),
        ...(w != null ? { width: w } : null),
        ...(r != null ? { borderRadius: r } : null),
        ...style,
      }}
      {...props}
    />
  )
}

export { Skeleton }
