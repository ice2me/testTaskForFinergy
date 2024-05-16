import { configureStore } from '@reduxjs/toolkit'
import usersSlice from "./slices/usersSlice"
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE
} from "redux-persist/es/constants"
import { usersAPi } from "./services/usersApi"

export const store = configureStore({
	reducer: {
		users: usersSlice,
		[usersAPi.reducerPath]: usersAPi.reducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat([usersAPi.middleware])
		]
})
