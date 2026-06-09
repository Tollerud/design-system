import { DocsShell } from '@/components/docs-shell'
import { ALL_ROUTES } from '@/lib/docs-routes'
import { getDeepLinkSlugs } from '@/lib/component-catalog'

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { slug: [] },
    ...ALL_ROUTES.map((id) => ({ slug: [id] })),
    ...getDeepLinkSlugs().map((parts) => ({ slug: parts })),
  ]
}

export default async function DocsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  return <DocsShell slug={slug} />
}
