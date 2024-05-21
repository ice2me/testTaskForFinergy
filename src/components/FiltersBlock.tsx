import React, {FC, useEffect, useState} from 'react'
import {Typeahead} from "react-bootstrap-typeahead"
import {Form} from "react-bootstrap"
import {useIntl} from "react-intl"
import {useDispatch, useSelector} from "react-redux"
import {handlerFilteredResults} from "../redux/slices/usersSlice";

const FiltersBlock:FC = () => {
	const {users} = useSelector((state: any) => state.users)
	const [searchValueArr, setSearchValueArr] = useState<any[]>([])
	const {formatMessage} = useIntl()
	const dispatch = useDispatch()

	useEffect(() => {
		searchValueArr?.length > 0 && dispatch(handlerFilteredResults(searchValueArr))
		searchValueArr?.length === 0 && dispatch(handlerFilteredResults([]))
	}, [searchValueArr])

	return (
		<div className='filters-block'>
			<div className='filters-block_wrapper'>
				<Form className='filters-block_wrapper-form'>
					<Typeahead
						id='basic-typeahead-single'
						labelKey='name'
						onChange={setSearchValueArr}
						options={users}
						placeholder={formatMessage({id: 'searchName'})}
						selected={searchValueArr}
						className='filters-block_wrapper-form_inp'
					/>
					<Typeahead
						id='basic-typeahead-single'
						labelKey='idnp'
						onChange={setSearchValueArr}
						options={users}
						placeholder={formatMessage({id: 'searchIDNP'})}
						selected={searchValueArr}
						className='filters-block_wrapper-form_inp'
					/>
				</Form >
			</div>
		</div>
	)
}

export default FiltersBlock