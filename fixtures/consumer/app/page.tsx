/* @tollerud/ui fixture — tarball install smoke test page */
import { Badge, Button, Card, StatusDot } from '@tollerud/ui'

export default function Home() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-4">
      <h1 className="text-xl font-semibold">@tollerud/ui install check</h1>
      <Card accent>
        <div className="flex flex-col gap-3 p-4">
          <StatusDot status="online" label="Package resolved" />
          <Badge variant="accent">@tollerud/ui</Badge>
          <Button variant="primary">Build passed</Button>
        </div>
      </Card>
    </main>
  )
}
