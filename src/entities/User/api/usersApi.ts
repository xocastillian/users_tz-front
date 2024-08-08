import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../model/types'

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	endpoints: builder => ({
		getUsers: builder.query<User[], void>({
			query: () => '/users',
		}),
		getUserById: builder.query<User, number>({
			query: id => `/users/${id}`,
		}),
		addUser: builder.mutation<User, Partial<User>>({
			query: newUser => ({
				url: '/users',
				method: 'POST',
				body: newUser,
			}),
		}),
		updateUser: builder.mutation<User, { id: number; updates: Partial<User> }>({
			query: ({ id, updates }) => ({
				url: `/users/${id}`,
				method: 'PUT',
				body: updates,
			}),
		}),
		deleteUser: builder.mutation<void, number>({
			query: id => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApi
