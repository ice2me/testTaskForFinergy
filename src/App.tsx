import React, {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import fakeData from './data.json'
import {dropUsersList} from "./redux/slices/usersSlice"
import UsersList from "./components/UsersList"
import CreatingNewUser from "./components/CreatingNewUser"
import {FormattedMessage, IntlProvider} from "react-intl"
import {LOCALES} from "./i18n/locales"
import messages from "./i18n/messages"
import ToggleLanguages from "./components/ToggleLanguages"
import FiltersBlock from "./components/FiltersBlock"

const languageList: string[] = ['en', 'ukr', 'rus']

const App: FC = () => {
	const {users, modalWindowState, filteredResults} = useSelector((state: any) => state.users)
	const [languageLocal, setLanguageLocal] = useState(LOCALES.EN)
	const dispatch = useDispatch()
	const changeLanguageHandler = (lang: string) => {
		if (lang === 'en') setLanguageLocal(LOCALES.EN)
		else if (lang === 'ukr') setLanguageLocal(LOCALES.UKR)
		else if (lang === 'rus') setLanguageLocal(LOCALES.RUS)
	}

	useEffect(() => {
		dispatch(dropUsersList(fakeData))
	}, [])

	useEffect(() => {
		if (window.navigator.language === LOCALES.EN) {
			setLanguageLocal(LOCALES.EN)
		} else {
			setLanguageLocal(LOCALES.UKR)
		}
	}, [])

	console.log('users', users)
	console.log('filteredResults', filteredResults)

	return (
		<div className='App'>
			<IntlProvider
				locale={languageLocal}
				messages={messages[languageLocal]}
				defaultLocale={LOCALES.EN}
			>
				<ToggleLanguages
					handler={changeLanguageHandler}
					languageList={languageList}
					changedLang={languageLocal}
				/>
				<h1 className='App-title'>
					<FormattedMessage id='h1Title' />
				</h1 >
				<FiltersBlock />
				<div className='App-triangle_top'></div >
				<UsersList
					users={filteredResults?.length > 0 ? filteredResults : users}
					showModal={modalWindowState}
				/>
				<CreatingNewUser
					showModal={modalWindowState}
				/>
			</IntlProvider >
    </div >
	)
}

export default App