import UpdateUser from '@/features/User/UpdateUser/UpdateUser'
import { useEffect } from 'react'

const UserPage = () => {
	useEffect(() => {
		document.title = 'Update User'
	}, [])

	return (
		<div className='w-full max-w-[600px] mx-auto'>
			<UpdateUser />
		</div>
	)
}

export default UserPage
