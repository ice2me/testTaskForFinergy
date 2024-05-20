import React, {FC} from 'react'
import {FormattedMessage} from "react-intl"
import delUserClass from '../assets/icons/delete.svg'
import returnUserClass from '../assets/icons/exit.svg'
import editUser from '../assets/icons/pencilEdit.svg'
import {IUser} from "../types/types"

interface UsersListItemProps {
	user: any
	indexUser: number
	deleteOrReturnHandler: (userId: number) => void
	handleEditUser: (userId: IUser) => void
}

const UsersListItem: FC<UsersListItemProps> = ({user, indexUser, deleteOrReturnHandler, handleEditUser}) => {

	return (
		<li
			className={`users-list_item ${user.removeStatus === false ? 'activeRemoveStatus' : ''}`}
			key={user.id}
		>
		 <h3 className='users-list_item-number'>
			 {indexUser + 1}.
		 </h3 >
		 <div className='users-list_item-wrapper'>
			 <div className='users-list_item-element'>
				<FormattedMessage id='userName' /> <span >{user.name}</span >
			 </div >
			 <div className='users-list_item-element'>
				<FormattedMessage id='userDateBirth' /> <span >{user.dateBirth}</span >
			 </div >
			 <div className='users-list_item-element'>
				<FormattedMessage id='userIDNP' /> <span >{user.idnp}</span >
			 </div >
			 <div className='users-list_item-element'>
				 <FormattedMessage id='userDroppedFromClass' /> <span >{user.removeStatus ?
				 <FormattedMessage id='no' /> : <FormattedMessage id='yes' />}</span >
				 <button
					 className='users-list_item-element_button'
					 onClick={() => deleteOrReturnHandler(user.id)}
				 >
					 {
						 user.removeStatus
							 ?
							 <img
								 src={delUserClass}
								 className='users-list_item-element_button-img'
								 alt='del user for class'
								 title='del user'
							 />
							 :
							 <img
								 src={returnUserClass}
								 className='users-list_item-element_button-img'
								 alt='del user for class'
								 title='return'
							 />
					 }
				 </button >
			 </div >
		 </div >
			<button
				className='users-list_item-edit'
				onClick={() => {
					handleEditUser(user)
				}}
			>
				<img
					src={editUser}
					alt='edit user'
					title='edit user'
				/>
			</button >
		</li >
	)
}

export default UsersListItem