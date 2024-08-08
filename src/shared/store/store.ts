import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from '../../entities/User/api/usersApi'

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
