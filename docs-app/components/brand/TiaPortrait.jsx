'use client'

import { BRAND_ASSETS } from './assets'

/**
 * Tia portrait — waist-up wave. SVG for UI chrome; PNG for hero-scale glow.
 * @param {'svg' | 'png'} [variant]
 * @param {boolean} [glow] — yellow drop-shadow (PNG heroes)
 */
export function TiaPortrait({
  variant = 'svg',
  width,
  height,
  glow = false,
  className,
  alt = 'Tia',
  style,
  ...props
}) {
  const src = variant === 'png' ? BRAND_ASSETS.tiaPortraitPng : BRAND_ASSETS.tiaPortraitSvg

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        ...(width != null ? { width, height: 'auto' } : null),
        ...(height != null ? { height, width: 'auto' } : null),
        ...(glow ? { filter: 'drop-shadow(0 0 50px rgba(232,213,0,0.25))' } : null),
        ...style,
      }}
      {...props}
    />
  )
}
