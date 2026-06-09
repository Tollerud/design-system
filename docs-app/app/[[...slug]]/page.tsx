import { DocsShell } from '@/components/docs-shell'

const ROUTES = [
  'overview',
  'foundations',
  'components',
  'infra',
  'forms',
  'navoverlays',
  'datablocks',
  'blocks',
  'backgrounds',
  'patterns',
  'onboarding',
  'servers',
  'console',
  'settings',
  'billing',
  'auth',
  'changelog',
]

export const dynamicParams = false

export function generateStaticParams() {
  return [{ slug: [] }, ...ROUTES.map((id) => ({ slug: [id] }))]
}

export default async function DocsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const route = slug?.[0] || 'overview'
  return <DocsShell route={route} />
}
