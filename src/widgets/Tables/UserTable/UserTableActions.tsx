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
import { FC, useState } from 'react'
import { useDeleteUserMutation } from '@/entities/User/api/usersApi'
import { useNavigate } from 'react-router-dom'
import DeleteUserModal from '@/widgets/Modals/DeleteUserModal/DeleteUserModal'

interface UserTableActionsProps {
	row: Row<User>
}

const UserTableActions: FC<UserTableActionsProps> = ({ row }) => {
	const { original: user } = row
	const [isModalOpen, setIsModalOpen] = useState(false)
	const navigate = useNavigate()
	const [deleteUser] = useDeleteUserMutation()

	const handleCopyUserId = () => {
		navigator.clipboard.writeText(user.id.toString())
	}

	const handleDeleteConfirm = async () => {
		try {
			await deleteUser(user.id).unwrap()
			setIsModalOpen(false)
		} catch (error) {
			alert('Failed to delete user: ' + error)
		}
	}

	return (
		<>
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
					<DropdownMenuItem className='text-red-600' onClick={() => setIsModalOpen(true)}>
						Delete user
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DeleteUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteConfirm} />
		</>
	)
}

export default UserTableActions
