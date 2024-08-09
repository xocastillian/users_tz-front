import { ChevronDown } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { User } from '@/entities/User/model/types'
import { Button } from '@/shared/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu'
import { FC } from 'react'

interface UserTableDropdownMenuProps {
	table: Table<User>
}

const UserTableDropdownMenu: FC<UserTableDropdownMenuProps> = ({ table }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' className='ml-auto'>
					Columns <ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{table
					.getAllColumns()
					.filter(column => column.getCanHide())
					.map(column => (
						<DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} onCheckedChange={visible => column.toggleVisibility(visible)}>
							{column.id}
						</DropdownMenuCheckboxItem>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserTableDropdownMenu
