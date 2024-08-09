import { FC } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { FormInputs, userSchema } from '@/entities/User/model/schema'

interface UserFormProps {
	defaultValues?: FormInputs
	onSubmit: (data: FormInputs) => void
	isLoading?: boolean
	submitButtonText?: string
}

const UserForm: FC<UserFormProps> = ({ defaultValues, onSubmit, isLoading = false, submitButtonText = 'Save' }) => {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormInputs>({
		defaultValues: defaultValues || {
			firstName: '',
			lastName: '',
			email: '',
			skills: [''],
		},
		resolver: zodResolver(userSchema),
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'skills',
	})

	const handleFormSubmit = async (data: FormInputs) => {
		await onSubmit(data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
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
							<Input {...register(`skills.${index}`)} />
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
			<Button type='submit' disabled={isLoading}>
				{submitButtonText}
			</Button>
		</form>
	)
}

export default UserForm
