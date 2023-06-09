import React from 'react'

interface Props {
  type: 'from' | 'to'
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const getPlaceholder = ({ type, loading }: { type: 'from' | 'to', loading?: boolean }) => {
  if (type === 'from') return 'Type your text to translate here...'
  if (loading === true) return 'Loading...'
  return 'Translate'
}

const TextArea: React.FC<Props> = ({ loading, onChange, type, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <textarea
      className={`h-52 border-none resize-none rounded-md p-2 outline-none ${type === 'to' ? 'bg-gray-200' : ''}`}
      disabled={type === 'to'}
      value={value}
      onChange={handleChange}
      autoFocus={type === 'from'}
      placeholder={getPlaceholder({ type, loading })}
    />
  )
}

export default TextArea
