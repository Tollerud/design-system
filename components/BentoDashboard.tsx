'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { HostCardProps } from './HostCard'
import type { StatCardProps } from './StatCard'
import type { ServiceHealthCardProps } from './ServiceHealthCard'
import type { IncidentCardProps, IncidentSeverity } from './IncidentCard'
import type { BackupJob } from './BackupStatusPanel'

/* ──────────────────── Bento Grid Dashboard Template ──────────────────── */

export interface BentoDashboardProps {
  title: string
  hosts?: HostCardProps[]
  metrics?: StatCardProps[]
  services?: ServiceHealthCardProps[]
  incidents?: { title: string; severity: IncidentSeverity; timestamp: string; service: string; description?: string; acknowledged?: boolean }[]
  backupJobs?: BackupJob[]
  className?: string
  /** Render the incident list footer */
  renderIncidentFooter?: () => ReactNode
}

export function BentoDashboard({
  title,
  hosts = [],
  metrics = [],
  services = [],
  incidents = [],
  className,
}: BentoDashboardProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Title bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-tia-text-primary">{title}</h2>
          <p className="text-xs text-tia-text-muted">
            {hosts.length} hosts · {services.length} services
            {incidents.length > 0 && ` · ${incidents.length} active incident${incidents.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Row 1: Host cards — bento asymmetric */}
      {hosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* First host spans wider */}
          <div className="md:col-span-2 lg:col-span-1">
            <HostCardComponent host={hosts[0]} />
          </div>
          {/* Remaining hosts in the second column area */}
          <div className="grid grid-cols-1 gap-3 md:col-span-2 lg:col-span-1">
            {hosts.slice(1).map((h, i) => (
              <HostCardComponent key={h.hostname ?? i} host={h} />
            ))}
          </div>
        </div>
      )}

      {/* Row 2: Metrics + Services — side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Metrics grid — 2 columns within */}
        {metrics.length > 0 && (
          <div className="lg:col-span-2">
            <SectionLabel>Metrics</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {metrics.map((m, i) => (
                <StatCardComponent key={m.label ?? i} stat={m} />
              ))}
            </div>
          </div>
        )}

        {/* Services list */}
        {services.length > 0 && (
          <div>
            <SectionLabel>Services</SectionLabel>
            <div className="space-y-2">
              {services.slice(0, 4).map((s, i) => (
                <div key={s.service ?? i} className="rounded-lg border border-tia-border/20 bg-tia-surface p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-tia-text-primary">{s.service}</span>
                    <span className={cn(
                      'text-xs px-1.5 py-0.5 rounded-full font-medium',
                      s.status === 'online' && 'text-tia-accent bg-tia-accent/10',
                      s.status === 'warning' && 'text-tia-warning bg-tia-warning/10',
                      s.status === 'offline' && 'text-tia-error bg-tia-error/10',
                      s.status === 'idle' && 'text-tia-text-muted bg-tia-noir-800',
                    )}>
                      {s.status}
                    </span>
                  </div>
                  {s.responseTime && (
                    <p className="text-xs text-tia-text-muted mt-1">{s.responseTime} response</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Row 3: Incidents — full width */}
      {incidents.length > 0 && (
        <div>
          <SectionLabel>Recent Incidents</SectionLabel>
          <div className="space-y-1.5">
            {incidents.slice(0, 4).map((inc, i) => (
              <IncidentCardItem key={inc.title + i} incident={inc} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ────────── Internal sub-components for rendering ────────── */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold text-tia-text-muted uppercase tracking-wider mb-2">{children}</p>
  )
}

function HostCardComponent({ host }: { host: HostCardProps }) {
  return (
    <div className={cn(
      'rounded-xl border p-4',
      host.status === 'online' ? 'border-tia-border/30 bg-tia-surface' :
      host.status === 'warning' ? 'border-tia-warning/30 bg-tia-warning/5' :
      'border-tia-border/20 bg-tia-surface opacity-70'
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StatusDotComp status={host.status as 'online' | 'offline' | 'warning'} />
          <span className="text-sm font-semibold text-tia-text-primary">{host.hostname}</span>
        </div>
        <span className="text-xs text-tia-text-muted font-mono">{host.ip}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {host.cpu && <MetricBadge label="CPU" value={host.cpu} />}
        {host.memory && <MetricBadge label="Mem" value={host.memory} />}
        {host.disk && <MetricBadge label="Disk" value={host.disk} />}
        {host.uptime && <MetricBadge label="Up" value={host.uptime} />}
      </div>
    </div>
  )
}

function StatCardComponent({ stat }: { stat: StatCardProps }) {
  return (
    <div className="rounded-lg border border-tia-border/20 bg-tia-surface p-3">
      <p className="text-xs text-tia-text-muted">{stat.label}</p>
      <p className="text-lg font-semibold text-tia-text-primary mt-0.5">{stat.value}</p>
      {stat.change && (
        <span className={cn(
          'text-xs font-medium',
          stat.change.direction === 'up' ? 'text-tia-accent' : 'text-tia-error'
        )}>
          {stat.change.value}
        </span>
      )}
    </div>
  )
}

function IncidentCardItem({ incident }: { incident: { title: string; severity: IncidentSeverity; timestamp: string; service: string; description?: string; acknowledged?: boolean } }) {
  return (
    <div className={cn(
      'flex items-start gap-3 rounded-lg border p-3',
      incident.acknowledged ? 'border-tia-border/10 bg-tia-noir-900/50 opacity-60' : 'border-tia-border/20 bg-tia-surface'
    )}>
      <SeverityDot severity={incident.severity} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-tia-text-primary truncate">{incident.title}</span>
          {incident.acknowledged && (
            <span className="text-xs text-tia-text-muted">(acknowledged)</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-tia-text-muted mt-0.5">
          <span>{incident.service}</span>
          <span>·</span>
          <span>{incident.timestamp}</span>
        </div>
        {incident.description && (
          <p className="text-xs text-tia-text-secondary mt-1">{incident.description}</p>
        )}
      </div>
    </div>
  )
}

function StatusDotComp({ status }: { status: 'online' | 'offline' | 'warning' }) {
  return (
    <span className={cn(
      'inline-block w-2 h-2 rounded-full',
      status === 'online' && 'bg-tia-accent shadow-[0_0_4px_var(--tia-accent)]',
      status === 'warning' && 'bg-tia-warning',
      status === 'offline' && 'bg-tia-error',
    )} />
  )
}

function SeverityDot({ severity }: { severity: IncidentSeverity }) {
  return (
    <span className={cn(
      'inline-block w-2 h-2 rounded-full mt-1 shrink-0',
      severity === 'critical' && 'bg-tia-error shadow-[0_0_4px_var(--tia-error)]',
      severity === 'high' && 'bg-tia-warning',
      severity === 'medium' && 'bg-tia-accent',
      severity === 'low' && 'bg-tia-text-muted',
      severity === 'info' && 'bg-tia-info',
    )} />
  )
}

function MetricBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-tia-noir-800 px-2 py-1.5">
      <span className="text-tia-text-muted">{label}</span>
      <span className="float-right text-tia-text-primary font-mono">{value}</span>
    </div>
  )
}

export default BentoDashboard