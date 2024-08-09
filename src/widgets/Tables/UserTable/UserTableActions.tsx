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
import { useDeleteUserMutation } from '@/entities/User/api/usersApi'
import { useNavigate } from 'react-router-dom'

interface UserTableActionsProps {
	row: Row<User>
}

const UserTableActions: FC<UserTableActionsProps> = ({ row }) => {
	const { original: user } = row

	const handleCopyUserId = () => {
		navigator.clipboard.writeText(user.id.toString())
	}

	const navigate = useNavigate()

	const [deleteUser] = useDeleteUserMutation()

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
				<DropdownMenuItem onClick={() => navigate('/profile/' + user.id)}>Edit user</DropdownMenuItem>
				<DropdownMenuItem className='text-red-600' onClick={() => deleteUser(user.id)}>
					Delete user
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserTableActions
