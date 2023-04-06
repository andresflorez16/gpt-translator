import React from 'react'
import { SUPORTED_LANGUAGES } from '@/constants'
import { type FromLanguage, type Languages } from '@/types.d'

type Props =
  | { type: 'from', value: FromLanguage, onChange: (value: FromLanguage) => void }
  | { type: 'to', value: Languages, onChange: (value: Languages) => void }

const LangSelector: React.FC<Props> = ({ onChange, value, type }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Languages)
  }

  return (
    <select aria-label='Auto' className='font-inter p-2 bg-gray-200 rounded-md cursor-pointer border-none outline-none' onChange={handleChange} value={value}>
      {type === 'from' && <option value='auto'>Select language</option>}
      {
        Object.entries(SUPORTED_LANGUAGES).map(([key, lang]) => (
          <option key={key} value={key}>{lang}</option>
        ))
      }
    </select>
  )
}

export default LangSelector
