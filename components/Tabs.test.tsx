import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

describe('Tabs', () => {
  it('switches tab panels', async () => {
    const user = userEvent.setup()

    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Alpha</TabsTrigger>
          <TabsTrigger value="b">Beta</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>
    )

    expect(screen.getByText('Panel A')).toBeVisible()
    await user.click(screen.getByRole('tab', { name: 'Beta' }))
    expect(screen.getByText('Panel B')).toBeVisible()
  })
})
