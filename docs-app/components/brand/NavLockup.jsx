'use client'

import { Monogram } from './Monogram'

const MONOGRAM_HEIGHT = {
  topbar: 20,
  sidebar: 20,
  sidebarCollapsed: 24,
}

/**
 * Monogram + project name — required nav pairing per BRAND.md.
 * @param {'topbar' | 'sidebar' | 'sidebarCollapsed'} [variant]
 */
export function NavLockup({ projectName, variant = 'topbar', className, style }) {
  const markHeight = MONOGRAM_HEIGHT[variant] ?? 20

  if (variant === 'sidebarCollapsed') {
    return (
      <div
        className={className}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
      >
        <Monogram height={markHeight} alt="Tollerud" />
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }}
    >
      <Monogram height={markHeight} alt="Tollerud" />
      {projectName ? (
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--foreground)' }}>{projectName}</span>
      ) : null}
    </div>
  )
}
