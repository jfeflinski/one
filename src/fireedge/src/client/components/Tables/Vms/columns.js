import * as React from 'react'

import { StatusBadge } from 'client/components/Status'
import * as VirtualMachineModel from 'client/models/VirtualMachine'

export default [
  /* {
    id: 'selection',
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox.
    // Pagination is a problem since this will select all rows even though
    // not all rows are on the current page.
    // The solution should be server side pagination.
    // For one, the clients should not download all rows in most cases.
    // The client should only download data for the current page.
    // In that case, getToggleAllRowsSelectedProps works fine.
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <CheckboxCell {...getToggleAllRowsSelectedProps()} />
    ),
    // The cell can use the individual row's getToggleRowSelectedProps method
    // to the render a checkbox
    Cell: ({ row }) => (
      <CheckboxCell {...row.getToggleRowSelectedProps()} />
    )
  }, */
  {
    Header: '',
    id: 'STATE',
    width: 50,
    accessor: row => {
      const state = VirtualMachineModel.getState(row)

      return (
        <StatusBadge
          title={state?.name}
          stateColor={state?.color}
          customTransform='translate(150%, 50%)'
        />
      )
    }
    // Cell: ({ value: { name, color } = {} }) => name && (
    //   <StatusChip stateColor={color} text={name} />
    // ),
    // Filter: ({ column }) => (
    //   <SelectFilter column={column} accessorOption='name' />
    // ),
    // filter: (rows, id, filterValue) =>
    //   rows.filter(row => row.values[id]?.name === filterValue)
  },
  { Header: '#', accessor: 'ID', width: 45 },
  { Header: 'Name', accessor: 'NAME' },
  {
    Header: 'Owner/Group',
    accessor: row => `${row.UNAME}/${row.GNAME}`
  },
  {
    Header: 'Ips',
    accessor: row => VirtualMachineModel.getIps(row).join(',')
    // Cell: ({ value }) => value.map(nic => (
    //   <StatusChip key={nic} stateColor={Colors.debug.light} text={nic} />
    // ))
  }
]