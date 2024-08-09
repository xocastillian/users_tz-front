import { FC } from 'react'
import { useAddUserMutation } from '@/entities/User/api/usersApi'
import { FormInputs } from '@/entities/User/model/schema'
import UserForm from '@/entities/User/form/UserForm'

const AddUser: FC = () => {
	const [addUser] = useAddUserMutation()

	const onSubmit = async (data: FormInputs) => {
		try {
			await addUser(data).unwrap()
		} catch (error) {
			alert('Failed to add user: ' + error)
		}
	}

	return <UserForm onSubmit={onSubmit} submitButtonText='Add User' />
}

export default AddUser
