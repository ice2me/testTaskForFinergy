import { createSlice } from "@reduxjs/toolkit"
import { formatDateStr } from '../../utils/helpersFunctions'

const initialState = {
	users: [],
	modalWindowState: false,
	editUser: false,
	filteredResults: []
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
			state.users = state.filteredResults.length ? state.users :  res
		},
		changeModalWindowState: (state, action) => {
			state.modalWindowState = action.payload
		},
		changeEditUser: (state, action) => {
			state.editUser = action.payload
		},
		updateUser: (state, action) => {
			state.users = state.users.map(item => {
				if (item.id === action.payload.id) {
					return {...action.payload, dateBirth: formatDateStr(action.payload.dateBirth)}
				} else {
					return item
				}
			})
		},
		handlerFilteredResults: (state, action) => {
			state.filteredResults = action.payload
		},
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
	changeModalWindowState,
	changeEditUser,
	updateUser,
	handlerFilteredResults
} = actions
export default reducer
