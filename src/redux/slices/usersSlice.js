import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	users: [],
}


const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		dropUsersList: (state, action) => {
			state.users = action.payload
		},
		addNewUser: (state, action) => {
			state.users = [action.payload, ...state.users]
		},
		deleteReturnUserOnClass: (state, action) => {
			const res = state.users.map(item => {
				let teh ={}
				if (item.id === action.payload) {
					teh = {...item, removeStatus: !item.removeStatus}
					return teh
				} else {
					return item
				}
			})
			state.users = res
		}
	}
})

const {
	actions,
	reducer
} = usersSlice
export const {
	dropUsersList,
	addNewUser,
	deleteReturnUserOnClass,
} = actions
export default reducer
