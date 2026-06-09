import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FileUpload } from './FileUpload'

describe('FileUpload', () => {
  it('renders label and file input', () => {
    render(<FileUpload label="Compose file" accept=".yml,.yaml" onFilesChange={vi.fn()} />)

    expect(screen.getByText('Compose file')).toBeInTheDocument()
    const input = screen.getByLabelText('Compose file')
    expect(input).toHaveAttribute('type', 'file')
  })
})
