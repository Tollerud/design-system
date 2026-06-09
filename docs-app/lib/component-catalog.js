/**
 * Deep-link catalog for per-section URLs: /{page}/{section-slug}/
 * Section slugs must match Section title slugification in primitives.jsx.
 */

export function sectionSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** @typedef {{ page: string, section: string, title: string, component?: string, keywords?: string[] }} DeepLink */

/** @type {DeepLink[]} */
export const DEEP_LINKS = [
  // Components — core primitives
  { page: 'components', section: 'button', title: 'Button', component: 'Button', keywords: ['cta', 'terminal'] },
  { page: 'components', section: 'card', title: 'Card', component: 'Card', keywords: ['surface'] },
  { page: 'components', section: 'divider', title: 'Divider' },
  { page: 'components', section: 'badge-and-pill', title: 'Badge & Pill', component: 'Badge', keywords: ['tag'] },
  { page: 'components', section: 'status-and-kbd', title: 'Status & Kbd', component: 'StatusDot', keywords: ['keyboard'] },
  { page: 'components', section: 'stat-card', title: 'Stat card', component: 'StatCard', keywords: ['metric'] },
  { page: 'components', section: 'progress-skeleton-and-avatar', title: 'Progress, Skeleton & Avatar', component: 'Progress', keywords: ['loading'] },
  { page: 'components', section: 'tooltip', title: 'Tooltip', component: 'Tooltip' },
  { page: 'components', section: 'alert', title: 'Alert', component: 'Alert' },
  { page: 'components', section: 'tabs-and-accordion', title: 'Tabs & Accordion', component: 'Tabs' },
  { page: 'components', section: 'timeline', title: 'Timeline', component: 'Timeline' },
  { page: 'components', section: 'panel', title: 'Panel', component: 'Panel' },
  { page: 'components', section: 'meter', title: 'Meter', component: 'Meter' },
  { page: 'components', section: 'stepper', title: 'Stepper', component: 'Stepper' },
  { page: 'components', section: 'density', title: 'Density', keywords: ['compact'] },
  { page: 'components', section: 'empty-state', title: 'Empty state', keywords: ['empty'] },
  { page: 'components', section: 'code-block', title: 'Code block', component: 'CodeBlock' },
  { page: 'components', section: 'container', title: 'Container', component: 'Container' },
  { page: 'components', section: 'action-row', title: 'Action row', component: 'ActionRow' },
  { page: 'components', section: 'glow-card', title: 'Glow card', component: 'GlowCard' },

  // Forms
  { page: 'forms', section: 'text-input', title: 'Text input', component: 'Input' },
  { page: 'forms', section: 'combobox', title: 'Combobox', component: 'Combobox' },
  { page: 'forms', section: 'form-row', title: 'Form row', component: 'FormRow' },

  // Navigation & overlays
  { page: 'navigation', section: 'dialog', title: 'Dialog', component: 'Dialog' },
  { page: 'navigation', section: 'command-palette', title: 'Command palette', component: 'CommandMenu', keywords: ['cmdk', 'search'] },

  // Infrastructure
  { page: 'infra', section: 'hostcard', title: 'HostCard', component: 'HostCard' },
  { page: 'infra', section: 'incidentcard', title: 'IncidentCard', component: 'IncidentCard' },
]

export function deepLinkPath(link) {
  return `${link.page}/${link.section}`
}

export function findDeepLink(page, section) {
  return DEEP_LINKS.find((l) => l.page === page && l.section === section)
}

/** Slug arrays for Next.js generateStaticParams (excludes single-segment page routes). */
export function getDeepLinkSlugs() {
  return DEEP_LINKS.map((l) => [l.page, l.section])
}
