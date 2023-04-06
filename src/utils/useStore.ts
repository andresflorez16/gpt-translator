import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '@/constants'
import { type FromLanguage, type Languages, type Action, type State } from '@/types.d'

const initialState: State = {
  fromLanguage: AUTO_LANGUAGE,
  toLanguage: 'en',
  text: '',
  result: '',
  loading: false
}

function reducer (state: State, action: Action) {
  const { type } = action
  const loading = state.text !== ''

  if (type === 'INTERCHANGE_LANGUAGE') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    return {
      ...state,
      result: '',
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state

    return {
      ...state,
      loading,
      result: '',
      toLanguage: action.payload
    }
  }

  if (type === 'SET_TEXT') {
    return {
      ...state,
      loading,
      text: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export default function useStore () {
  const [{
    fromLanguage,
    toLanguage,
    text,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interchangeLang = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGE' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Languages) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setText = (payload: string) => {
    dispatch({ type: 'SET_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    text,
    result,
    loading,
    interchangeLang,
    setFromLanguage,
    setToLanguage,
    setText,
    setResult
  }
}
