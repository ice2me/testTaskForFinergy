import React, {FC} from 'react'
import ModalForAddNewUserInfo from "./ModalForAddNewUserInfo"
import {FormattedMessage} from "react-intl"
import {changeEditUser, changeModalWindowState} from "../redux/slices/usersSlice"
import {useDispatch, useSelector} from "react-redux"

interface creatingNewUserProps {
	showModal: boolean
}

const CreatingNewUser: FC<creatingNewUserProps> = ({showModal}) => {
	const {editUser} = useSelector((state: any) => state.users)
	const dispatch = useDispatch()
	const handleShow = () => {
		dispatch(changeModalWindowState(true))
		dispatch(changeEditUser(false))
	}
	return (
		<>
			{
				(showModal && editUser === false) &&
				<ModalForAddNewUserInfo
					show={showModal}
					editingStatus={editUser}
				/>
			}
			<button
				className='add-new_user-button'
				onClick={handleShow}
			>
				<FormattedMessage id='buttonAddNewUser' />
			</button >
		</ >
	)
}

export default CreatingNewUser