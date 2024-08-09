import AddUser from '@/features/User/AddUser/AddUser'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog'
import { FC } from 'react'

const AddUserModal: FC = () => {
	return (
		<div className='mt-4'>
			<Dialog>
				<DialogTrigger asChild>
					<Button>Add User</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Add User</DialogTitle>
					</DialogHeader>
					<AddUser  />
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default AddUserModal
