import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../model/types'

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	tagTypes: ['UserList', 'User'],
	endpoints: builder => ({
		getUsers: builder.query<User[], void>({
			query: () => '/users',
			providesTags: ['UserList'],
		}),

		getUserById: builder.query<User, number>({
			query: id => `/users/${id}`,
			providesTags: id => [{ type: 'User', id: id?.toString() }],
		}),

		addUser: builder.mutation<User, Partial<User>>({
			query: newUser => ({
				url: '/users',
				method: 'POST',
				body: newUser,
			}),
			invalidatesTags: ['UserList'],
		}),

		updateUser: builder.mutation<User, { id: number; updates: Partial<User> }>({
			query: ({ id, updates }) => ({
				url: `/users/${id}`,
				method: 'PATCH',
				body: updates,
			}),
			invalidatesTags: id => [{ type: 'User', id: id?.toString() }],
		}),

		deleteUser: builder.mutation<void, number>({
			query: id => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['UserList'],
		}),
	}),
})

export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApi
