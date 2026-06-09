import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'
import { Input } from './Input'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './Dialog'

describe('accessibility', () => {
  it('Button has no axe violations', async () => {
    const { container } = render(<Button variant="primary">Deploy</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Input with label has no axe violations', async () => {
    const { container } = render(<Input label="Hostname" placeholder="emma" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Dialog with title has no axe violations', async () => {
    const { container } = render(
      <Dialog open>
        <DialogTrigger asChild>
          <Button variant="secondary">Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm restart</DialogTitle>
          <DialogDescription>Restart emma:hermes?</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
