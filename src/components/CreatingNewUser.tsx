import React, {FC, useState} from 'react'
import ModalForAddNewUserInfo from "./ModalForAddNewUserInfo"
import {FormattedMessage} from "react-intl";

const CreatingNewUser: FC = () => {
	const [showModal, setShowModal] = useState(false)
	const handleClose = () => setShowModal(false)
	const handleShow = () => setShowModal(true)

	return (
		<>
			{
				showModal &&
				<ModalForAddNewUserInfo
					show={showModal}
					onHide={handleClose}
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