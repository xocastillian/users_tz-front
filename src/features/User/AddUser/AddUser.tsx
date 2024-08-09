import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { FC } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddUserMutation } from '@/entities/User/api/usersApi'
import { DialogFooter } from '@/shared/components/ui/dialog'
import { addUserSchema, FormInputs } from './model/schema'

const AddUser: FC = () => {
	const [addUser] = useAddUserMutation()

	const {
		control,
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormInputs>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			skills: [''],
		},
		resolver: zodResolver(addUserSchema),
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'skills',
	})

	const onSubmit = async (data: FormInputs) => {
		try {
			await addUser(data).unwrap()
			reset()
		} catch (error) {
			alert('Failed to add user: ' + error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid gap-4 py-4'>
				<div className='flex flex-col gap-2'>
					<Label htmlFor='firstName'>First Name</Label>
					<Input id='firstName' {...register('firstName')} />
					{errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
				</div>
				<div className='flex flex-col gap-2'>
					<Label htmlFor='lastName'>Last Name</Label>
					<Input id='lastName' {...register('lastName')} />
					{errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
				</div>
				<div className='flex flex-col gap-2'>
					<Label htmlFor='email'>Email</Label>
					<Input id='email' type='email' {...register('email')} />
					{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
				</div>
				<div className='flex flex-col gap-2'>
					<Label>Skills</Label>
					{fields.map((field, index) => (
						<div key={field.id} className='flex items-center gap-2 mb-2'>
							<Input {...register(`skills.${index}` as const)} />
							<Button type='button' onClick={() => remove(index)}>
								Remove
							</Button>
						</div>
					))}
					<div>
						<Button type='button' onClick={() => append('')}>
							Add Skill
						</Button>
					</div>
					{errors.skills && <p className='text-red-500'>{errors.skills.message}</p>}
				</div>
			</div>
			<DialogFooter>
				<Button type='submit'>Save changes</Button>
			</DialogFooter>
		</form>
	)
}

export default AddUser
