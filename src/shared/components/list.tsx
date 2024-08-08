import { useGetUsersQuery } from '../../entities/User/api/usersApi'

const UserList = () => {
	const { data: users, error, isLoading } = useGetUsersQuery()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>An error occurred...</div>

	return (
		<ul>
			{users?.map(user => (
				<li key={user.id}>
					{user.firstName} {user.lastName}
				</li>
			))}
		</ul>
	)
}

export default UserList
