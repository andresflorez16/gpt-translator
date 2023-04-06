import { useEffect, useState } from 'react'

interface Props {
  value: string,
  delay?: number
}

export default function useDebounce ({ value, delay = 500 }: Props) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => { clearTimeout(timer) }
  }, [value, delay])

  return debouncedValue
}
