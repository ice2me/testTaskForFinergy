import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useDispatch, useSelector} from 'react-redux'
import {IUser} from '../types/types'
import {addNewUser, changeModalWindowState, updateUser} from '../redux/slices/usersSlice'
import {formatDateStr} from '../utils/helpersFunctions'
import {Formik, FormikHelpers} from 'formik'
import {postUserSchema} from '../utils/validation/yupUpdateUser'
import {useIntl} from 'react-intl'
import {Form} from 'react-bootstrap'

interface modalAddEditProps {
	show: boolean
	editingStatus?: boolean
	editUserData?: IUser
}

const ModalForAddNewUserInfo: React.FC<modalAddEditProps> = ({show, editingStatus, editUserData}) => {
	const {users} = useSelector((state: any) => state.users)
	const [form, setForm] = useState<IUser>({
		id: 0,
		name: '',
		dateBirth: '',
		removeStatus: false,
		idnp: ''
	})
	const {formatMessage} = useIntl()
	const dispatch = useDispatch()
	console.log('form', form)

	const onHide = () => {
		dispatch(changeModalWindowState(false))
		setForm({
			id: 0,
			name: '',
			dateBirth: '',
			removeStatus: false,
			idnp: ''
		})
	}

	useEffect(() => {
		if (editingStatus && editUserData) {
			setForm(editUserData)
		} else {
			setForm({
				id: 0,
				name: '',
				dateBirth: '',
				removeStatus: false,
				idnp: ''
			})
		}
	}, [editingStatus, editUserData])

	const handleFormSubmit = (values: IUser, {resetForm}: FormikHelpers<IUser>) => {

		const tehDataUser: IUser = {
			id: users.length + 1,
			name: values.name,
			dateBirth: formatDateStr(values.dateBirth),
			removeStatus: true,
			idnp: values.idnp === '' ? String(Date.now()) : values.idnp,
		}

		if (editingStatus && editUserData) {
			dispatch(updateUser({ ...editUserData, ...values }))
		} else {
			dispatch(addNewUser(tehDataUser))
		}
		onHide()
		resetForm()
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			backdrop='static'
			keyboard={true}
			centered
		>
      <Formik
				initialValues={form}
				validationSchema={postUserSchema(formatMessage)}
				onSubmit={handleFormSubmit}
				enableReinitialize
			>
        {({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						isValid,
						handleSubmit,
						dirty,
					}) => {
					return (
					<Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title >{editingStatus ? 'Edit user' : 'Add user'}</Modal.Title >
            </Modal.Header >
            <Modal.Body >
              <Form.Group className='add-new_user'>
                <Form.Control
									type='text'
									defaultValue={values.name || form.name}
									name='name'
									placeholder='Name'
									className={`pe-5 ${touched.name ? 'is-touch' : ''} ${
										errors.name && touched.name ? ' is-invalid' : ''
									} add-new_user-input`}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.name && touched.name && (
									<Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback >
								)}
              </Form.Group >
              <Form.Group className='add-new_user'>
                <Form.Control
									type='date'
									value={values.dateBirth}
									name='dateBirth'
									placeholder='Date of Birth'
									className={`pe-5 ${touched.dateBirth ? 'is-touch' : ''} ${
										errors.dateBirth && touched.dateBirth ? ' is-invalid' : ''
									} add-new_user-input`}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.dateBirth && touched.dateBirth && (
									<Form.Control.Feedback type='invalid'>
                    {errors.dateBirth}
                  </Form.Control.Feedback >
								)}
              </Form.Group >
              <Form.Group className='add-new_user'>
                <Form.Control
									type='number'
									value={values.idnp}
									name='idnp'
									placeholder='IDNP'
									className={`pe-5 ${touched.idnp ? 'is-touch' : ''} ${
										errors.idnp && touched.idnp ? ' is-invalid' : ''
									} add-new_user-input`}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.idnp && touched.idnp && (
									<Form.Control.Feedback type='invalid'>
                    {errors.idnp}
                  </Form.Control.Feedback >
								)}
              </Form.Group >
            </Modal.Body >
            <Modal.Footer >
              <Button
								variant='success'
								type='submit'
								className='w-25'
								disabled={!isValid || !dirty}
							>
                {editingStatus ? 'Update' : 'Add'}
              </Button >
            </Modal.Footer >
          </Form >
				)}}
      </Formik >
    </Modal >
	)
}

export default ModalForAddNewUserInfo