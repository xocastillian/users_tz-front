import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableRow } from '@/shared/components/ui/table'
import { useDeleteUserMutation, useGetUsersQuery } from '@/entities/User/api/usersApi'
import { columns } from './Columns'
import UserTableHeader from './UserTableHeader'
import UserTableDropdownMenu from './UserTableDropdownMenu'
import AddUserModal from '../AddUserModal/AddUserModal'

const UserTable = () => {
	const { data: users = [], error, isLoading } = useGetUsersQuery()
	const [deleteUser] = useDeleteUserMutation()

	const table = useReactTable({
		data: users,
		columns: columns(deleteUser),
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error</div>

	return (
		<div>
			<div className='flex items-center py-4'>
				<UserTableDropdownMenu table={table} />
			</div>
			<div className='rounded-md border'>
				<Table className='bg-white rounded-md'>
					<UserTableHeader table={table} />
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<AddUserModal />
		</div>
	)
}

export default UserTable
