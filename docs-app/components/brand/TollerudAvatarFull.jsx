'use client'

import { BRAND_ASSETS } from './assets'

/**
 * Tollerud avatar (full figure) — head-to-toe for heroes, onboarding, empty states.
 * @param {'svg' | 'png'} [variant]
 * @param {boolean} [glow] — yellow drop-shadow (PNG heroes)
 */
export function TollerudAvatarFull({
  variant = 'svg',
  height = 380,
  glow = false,
  className,
  alt = 'Tia',
  style,
  ...props
}) {
  const src =
    variant === 'png' ? BRAND_ASSETS.tollerudAvatarFullPng : BRAND_ASSETS.tollerudAvatarFullSvg

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        height,
        width: 'auto',
        objectFit: 'contain',
        objectPosition: 'top',
        ...(glow ? { filter: 'drop-shadow(0 0 50px rgba(232,213,0,0.25))' } : null),
        ...style,
      }}
      {...props}
    />
  )
}
