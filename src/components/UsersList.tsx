import React, {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import UsersListItem from "./UsersListItem"
import {changeEditUser, changeModalWindowState, deleteReturnUserOnClass} from "../redux/slices/usersSlice"
import InfiniteScroll from "react-infinite-scroll-component"
import ModalForAddNewUserInfo from "./ModalForAddNewUserInfo"
import {IUser} from "../types/types"
import {formatReturnDateStr} from "../utils/helpersFunctions"

interface editingUserProps {
	showModal: boolean
}

const UsersList: FC<editingUserProps> = ({showModal}) => {
	const {users, editUser} = useSelector((state: any) => state.users)
	const [displayedUsersCount, setDisplayedUsersCount] = useState<number>(5)
	const [editUserData, setEditUserData] = useState<IUser>()
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()

	const delReturnUser = (userId: number) => {
		dispatch(deleteReturnUserOnClass(userId))
	}

	const fetchMoreData = () => {
		setDisplayedUsersCount(prevCount => prevCount + 5)
	}

	const handleEditUser = (user: IUser) => {
		const res = formatReturnDateStr(user.dateBirth)
		console.log('res', res)
		const tehData = {...user, dateBirth: res}
		console.log(tehData)
		setEditUserData(tehData)
		setLoading(false)
		dispatch(changeModalWindowState(true))
		dispatch(changeEditUser(true))
	}

	useEffect(() => {
		if (editUser === false) setEditUserData({
			id: 0,
			name: '',
			dateBirth: '',
			removeStatus: false,
			idnp: ''
		})
	}, [editUser])

	return (
		<ul
			className='users-list'
		>
			{
				(showModal && !loading && editUser) &&
				<ModalForAddNewUserInfo
					show={showModal}
					editingStatus={editUser}
					editUserData={editUserData}
				/>
			}
			<InfiniteScroll
				dataLength={displayedUsersCount}
				next={fetchMoreData}
				hasMore={displayedUsersCount < users.length}
				loader={<h4 >Loading...</h4 >}
				scrollableTarget='users-list'
				height={550}
			>
          {users.slice(0, displayedUsersCount).map((user: any, index: number) => (
						<UsersListItem
							user={user}
							key={user.id}
							indexUser={index}
							deleteOrReturnHandler={delReturnUser}
							handleEditUser={handleEditUser}
						/>
					))}
        </InfiniteScroll >

      </ul >
	)
}

export default UsersList