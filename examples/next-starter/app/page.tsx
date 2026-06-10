import { Badge, Button, Card, Footer, StatusDot } from '@tollerud/ui'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 p-8">
        <div className="flex flex-col gap-2">
          <Badge variant="accent">Starter</Badge>
          <h1 className="text-2xl font-semibold">Tollerud UI on Next.js</h1>
          <p className="text-sm text-tollerud-text-secondary">
            Barrel imports from <code className="font-mono text-tollerud-yellow">@tollerud/ui</code> and Tailwind v4
            via <code className="font-mono">source.css</code>. Use <code className="font-mono">@tollerud/ui/utils</code>{' '}
            for <code className="font-mono">cn()</code> in Client Components.
          </p>
        </div>

        <Card accent>
          <div className="flex flex-col gap-4 p-4">
            <StatusDot status="online" label="Package resolved" />
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">
                Primary
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="terminal" size="sm">
                deploy
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-sm text-tollerud-text-muted">
          Docs:{' '}
          <a
            href="https://design.tollerud.dev/"
            className="text-tollerud-yellow underline-offset-2 hover:underline"
          >
            design.tollerud.dev
          </a>
        </p>
      </main>

      <Footer />
    </div>
  )
}
