import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/entities/User/api/usersApi'
import UserForm from '@/entities/User/form/UserForm'
import { FormInputs } from '@/entities/User/model/schema'

const UpdateUser = () => {
	const { id } = useParams<{ id: string }>()
	const { data: user, isLoading, refetch } = useGetUserByIdQuery(Number(id))
	const [updateUser] = useUpdateUserMutation()
	const navigate = useNavigate()

	const onSubmit = async (data: FormInputs) => {
		try {
			await updateUser({ id: Number(id), updates: data }).unwrap()
			refetch()

			alert('User updated successfully')
			navigate('/')
		} catch (error) {
			alert('Failed to update user: ' + error)
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
		/>
	)
}

export default UpdateUser
