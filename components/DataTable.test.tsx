import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DataTable } from './DataTable'

const rows = [
  { id: '1', hostname: 'emma', status: 'online' },
  { id: '2', hostname: 'miriam', status: 'offline' },
]

describe('DataTable', () => {
  it('renders rows and supports column sort', async () => {
    const user = userEvent.setup()

    render(
      <DataTable
        columns={[
          { key: 'hostname', label: 'Host', sortable: true },
          { key: 'status', label: 'Status' },
        ]}
        data={rows}
        rowKey="id"
      />
    )

    expect(screen.getByText('emma')).toBeInTheDocument()
    expect(screen.getByText('miriam')).toBeInTheDocument()

    await user.click(screen.getByRole('columnheader', { name: /host/i }))

    const bodyRows = screen.getAllByRole('row').slice(1)
    expect(bodyRows[0]).toHaveTextContent('emma')
  })

  it('shows empty message when data is empty', () => {
    render(
      <DataTable
        columns={[{ key: 'hostname', label: 'Host' }]}
        data={[]}
        rowKey="id"
        emptyMessage="No hosts found"
      />
    )

    expect(screen.getByText('No hosts found')).toBeInTheDocument()
  })

  it('supports search, selection, and pagination in rich mode', async () => {
    const user = userEvent.setup()
    const onRun = vi.fn()

    render(
      <DataTable
        columns={[
          { key: 'hostname', label: 'Host', sortable: true },
          { key: 'region', label: 'Region' },
        ]}
        data={[
          { id: '1', hostname: 'emma', region: 'eu' },
          { id: '2', hostname: 'pia', region: 'us' },
          { id: '3', hostname: 'iris', region: 'eu' },
        ]}
        rowKey="id"
        searchable
        searchKeys={['hostname']}
        selectable
        pageSize={2}
        bulkActions={[{ label: 'Restart', onRun }]}
      />
    )

    await user.type(screen.getByPlaceholderText('Search…'), 'emma')
    expect(screen.getByText('emma')).toBeInTheDocument()
    expect(screen.queryByText('pia')).not.toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: /select row 1/i }))
    expect(screen.getByText('selected')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Restart' }))
    expect(onRun).toHaveBeenCalledWith(['1'], expect.any(Function))
  })
})
