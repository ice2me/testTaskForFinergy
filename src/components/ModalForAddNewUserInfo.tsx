import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useDispatch, useSelector} from 'react-redux'
import {IUser} from '../types/types'
import {addNewUser} from '../redux/slices/usersSlice'
import {formatDateStr} from '../utils/helpersFunctions'
import {Formik} from 'formik'
import {postUserSchema} from '../utils/validation/yupUpdateUser'
import {useIntl} from 'react-intl'
import {Form} from 'react-bootstrap'

interface Props {
	show: boolean
	onHide: () => void
}

const initialForm = {
	id: null,
	nameUser: '',
	dateBirth: '',
	removeStatus: false,
	idnp: ''
}

const ModalForAddNewUserInfo: React.FC<Props> = ({show, onHide}) => {
	const {users} = useSelector((state: any) => state.users)
	const [form, setForm] = useState(initialForm)
	const {formatMessage} = useIntl()
	const dispatch = useDispatch()

	const formDateUpdateHandler = (opt: any) => {
		setForm({...form, ...opt})
	}

	const handleFormSubmit = (values: any) => {
		const newUser: IUser = {
			id: users.length + 1,
			name: values.nameUser,
			dateBirth: formatDateStr(values.dateBirth),
			removeStatus: true,
			idnp: values.idnp === '' ? String(Date.now()) : values.idnp
		}
		dispatch(addNewUser(newUser))
		setForm(initialForm)
		onHide()
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			backdrop='static'
			keyboard={false}
			centered
		>
      <Formik
				validateOnChange
				initialValues={{
					nameUser: '',
					dateBirth: '',
					idnp: ''
				}}
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
						dirty
					}) => (
					<Form className='formOrder-form' onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title >Modal title</Modal.Title >
            </Modal.Header >
            <Modal.Body >
              <Form.Group className='add-new_user'>
                <Form.Control
									type='text'
									value={values?.nameUser}
									name={'nameUser'}
									placeholder='Name'
									className={`pe-5  ${
										touched.nameUser ? 'is-touch ' : ''
									} ${
										errors.nameUser && touched.nameUser ? ' is-invalid' : ''
									} add-new_user-input`}
									onChange={(e) => {
										handleChange(e)
										formDateUpdateHandler({[e.target.name]: e.target.value})
									}
									}
									onBlur={handleBlur}
								/>
								{errors.nameUser && touched.nameUser && (
									<Form.Control.Feedback type='invalid'>
                    {errors.nameUser}
                  </Form.Control.Feedback >
								)}
              </Form.Group >

							<Form.Group className='add-new_user'>
                <Form.Control
									type='date'
									value={values?.dateBirth}
									name={'dateBirth'}
									placeholder='Name'
									className={`pe-5  ${
										touched.dateBirth ? 'is-touch ' : ''
									} ${
										errors.dateBirth && touched.dateBirth ? ' is-invalid' : ''
									} add-new_user-input`}
									onChange={(e) => {
										handleChange(e)
										formDateUpdateHandler({[e.target.name]: e.target.value})
									}
									}
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
									value={values?.idnp}
									name={'idnp'}
									placeholder='IDNP'
									className={`pe-5  ${
										touched.idnp ? 'is-touch ' : ''
									} ${
										errors.idnp && touched.idnp ? ' is-invalid' : ''
									} add-new_user-input`}
									onChange={(e) => {
										handleChange(e)
										formDateUpdateHandler({[e.target.name]: e.target.value})
									}
									}
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
								disabled={!isValid && dirty}
							>
                ADD
              </Button >
            </Modal.Footer >
          </Form >
				)}
      </Formik >
    </Modal >
	)
}

export default ModalForAddNewUserInfo