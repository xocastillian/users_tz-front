import { flexRender, Table } from '@tanstack/react-table'
import { User } from '@/entities/User/model/types'
import { TableHead, TableHeader, TableRow } from '@/shared/components/ui/table'
import { FC } from 'react'

interface UserTableHeaderProps {
	table: Table<User>
}

const UserTableHeader: FC<UserTableHeaderProps> = ({ table }) => {
	return (
		<TableHeader>
			{table.getHeaderGroups().map(headerGroup => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map(header => (
						<TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
					))}
				</TableRow>
			))}
		</TableHeader>
	)
}

export default UserTableHeader
