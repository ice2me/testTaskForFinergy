import React, {FC, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import UsersListItem from "./UsersListItem"
import {deleteReturnUserOnClass} from "../redux/slices/usersSlice"
import InfiniteScroll from "react-infinite-scroll-component"

const UsersList: FC = () => {
	const {users} = useSelector((state: any) => state.users)
	const [displayedUsersCount, setDisplayedUsersCount] = useState<number>(5);
	const dispatch = useDispatch()

	const delReturnUser = (userId: number) => {
		dispatch(deleteReturnUserOnClass(userId))
	}

	const fetchMoreData = () => {
		setDisplayedUsersCount(prevCount => prevCount + 5)
	}

	return (
		<ul
			className='users-list'
		>
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
						/>
					))}
        </InfiniteScroll >

      </ul >
	)
}

export default UsersList