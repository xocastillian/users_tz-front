import { z } from 'zod'

export const userSchema = z.object({
	firstName: z.string().min(1, 'First Name is required'),
	lastName: z.string().min(1, 'Last Name is required'),
	email: z.string().email('Invalid email address').min(1, 'Email is required'),
	skills: z.array(z.string().min(1, 'Skill cannot be empty')).min(1, 'At least one skill is required'),
})

export type FormInputs = z.infer<typeof userSchema>
