import React, {FC} from 'react'

interface ToggleLanguagesProps {
	languageList: string[]
	changedLang: string
	handler: (lang: string) => void
}

const ToggleLanguages: FC<ToggleLanguagesProps> = ({handler, languageList, changedLang}) => {
	return (
		<div className='language'>
			<ul className='language-wrapper'>
				{
					languageList?.map(lang => <li
						key={lang}
						className={`language-wrapper_item ${changedLang === lang ? 'activeLanguage' : ''}`}
						onClick={() => handler(lang)}
					>{lang}</li >)
				}
			</ul >
		</div >
	)
}

export default ToggleLanguages