'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type DeviceSize = 'desktop' | 'tablet' | 'mobile'

const DEVICE_WIDTHS: Record<DeviceSize, number | null> = {
  desktop: null,
  tablet: 768,
  mobile: 375,
}

interface PreviewFrameProps {
  children: ReactNode
  className?: string
}

export function PreviewFrame({ children, className }: PreviewFrameProps) {
  const [device, setDevice] = useState<DeviceSize>('desktop')
  const maxWidth = DEVICE_WIDTHS[device]

  return (
    <div className={cn('space-y-2', className)}>
      {/* Device toolbar */}
      <div className="flex items-center gap-1 border border-tia-border/30 rounded-lg p-1 w-fit bg-tia-noir-850">
        {(['desktop', 'tablet', 'mobile'] as DeviceSize[]).map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            className={cn(
              'px-3 py-1 rounded-md text-xs font-medium transition-colors',
              device === d
                ? 'bg-tia-accent text-tia-noir-900'
                : 'text-tia-text-muted hover:text-tia-text-primary hover:bg-tia-surface',
            )}
          >
            {d === 'desktop' ? '🖥 Desktop' : d === 'tablet' ? '📱 Tablet' : '📱 Mobile'}
          </button>
        ))}
      </div>
      {/* Preview area */}
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden rounded-lg border border-tia-border/20"
        style={{ maxWidth: maxWidth ? `${maxWidth}px` : '100%' }}
      >
        <div className="bg-tia-noir-900 p-4">{children}</div>
      </div>
    </div>
  )
}