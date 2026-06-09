'use client'

import { Monogram as NpmMonogram } from '@tollerud/ui'

/**
 * Docs wrapper — forwards sizing props to the npm Monogram component.
 * @param {import('@tollerud/ui').MonogramColor} [color]
 * @param {number} [size] — height in px
 * @param {number} [height] — alias for size
 * @param {number} [width] — treated as height (monogram scales proportionally)
 */
export function Monogram({
  color = 'yellow',
  size,
  height,
  width,
  className,
  alt = 'Tollerud',
  style,
  ...props
}) {
  const dimension = size ?? height ?? width

  return (
    <NpmMonogram
      color={color}
      size={dimension}
      title={alt}
      className={className}
      style={style}
      {...props}
    />
  )
}
