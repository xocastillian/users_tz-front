import { MoreHorizontal } from 'lucide-react'
import { Row } from '@tanstack/react-table'
import { User } from '@/entities/User/model/types'
import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { FC } from 'react'

interface UserTableActionsProps {
	row: Row<User>
	deleteUser?: (userId: number) => void
}

const UserTableActions: FC<UserTableActionsProps> = ({ row, deleteUser }) => {
	const { original: user } = row

	const handleCopyUserId = () => {
		navigator.clipboard.writeText(user.id.toString())
	}

	const handleDeleteUser = () => {
		if (deleteUser) {
			deleteUser(user.id)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem onClick={handleCopyUserId}>Copy user ID</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Edit user</DropdownMenuItem>
				<DropdownMenuItem className='text-red-600' onClick={handleDeleteUser}>
					Delete user
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserTableActions
