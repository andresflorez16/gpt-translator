import { type AUTO_LANGUAGE, type SUPORTED_LANGUAGES } from '@/constants'

export type Languages = keyof typeof SUPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Languages | AutoLanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Languages
  text: string
  result: string
  loading: boolean
}

export type Action =
| { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
| { type: 'INTERCHANGE_LANGUAGE' }
| { type: 'SET_TO_LANGUAGE', payload: Languages }
| { type: 'SET_TEXT', payload: string }
| { type: 'SET_RESULT', payload: string }
