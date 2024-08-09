import { User } from '@/entities/User/model/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import UserTableActions from './UserTableActions'

const buttonStyleReset = { padding: 0, background: 'none' }

export const columns = (): ColumnDef<User>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'firstName',
		header: ({ column }) => (
			<Button style={buttonStyleReset} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				First name
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
	},
	{
		accessorKey: 'lastName',
		header: 'Last name',
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<Button style={buttonStyleReset} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Email
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
		cell: ({ row }) => <div className='text-lowercase'>{row.getValue('email')}</div>,
	},
	{
		accessorKey: 'skills',
		header: 'Skills',
		cell: ({ row }) => row.getValue<string[]>('skills').join(', '),
	},
	{
		accessorKey: 'registrationDate',
		header: 'Registration date',
		cell: ({ row }) => {
			const registrationDate = new Date(row.getValue('registrationDate'))
			return <div>{registrationDate.toLocaleDateString()}</div>
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => <UserTableActions row={row} />,
	},
]
