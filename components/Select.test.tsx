import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Select } from './Select'

describe('Select', () => {
  it('opens the list and selects an option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <Select
        label="Region"
        value="eu"
        onChange={onChange}
        options={[
          { value: 'eu', label: 'EU' },
          { value: 'us', label: 'US' },
        ]}
      />
    )

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('option', { name: 'US' }))
    expect(onChange).toHaveBeenCalledWith('us')
  })
})
