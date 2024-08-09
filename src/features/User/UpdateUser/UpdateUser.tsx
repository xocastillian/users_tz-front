import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteUserMutation, useGetUserByIdQuery, useUpdateUserMutation } from '@/entities/User/api/usersApi'
import UserForm from '@/entities/User/form/UserForm'
import { FormInputs } from '@/entities/User/model/schema'

const UpdateUser = () => {
	const { id } = useParams<{ id: string }>()
	const { data: user, isLoading } = useGetUserByIdQuery(Number(id))
	const [updateUser] = useUpdateUserMutation()
	const [deleteUser] = useDeleteUserMutation()
	const navigate = useNavigate()

	const onSubmit = async (data: FormInputs) => {
		try {
			await updateUser({ id: Number(id), updates: data }).unwrap()
			alert('User updated successfully')
			navigate('/')
		} catch (error) {
			alert('Failed to update user: ' + error)
		}
	}

	const handleDelete = async () => {
		try {
			await deleteUser(Number(id)).unwrap()
			alert('User deleted successfully')
			navigate('/')
		} catch (error) {
			alert('Failed to delete user: ' + error)
		}
	}

	if (isLoading) return <div>Loading...</div>

	return (
		<UserForm
			defaultValues={
				user || {
					firstName: '',
					lastName: '',
					email: '',
					skills: [''],
				}
			}
			onSubmit={onSubmit}
			isLoading={isLoading}
			submitButtonText='Save Changes'
			deleteUserBtn
			deleteUser={handleDelete}
		/>
	)
}

export default UpdateUser
