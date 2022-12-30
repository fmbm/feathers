import { useState, useEffect } from 'react'

/**
 * Debounce a value. Useful during auto-complete typing, to avoid pinging your API too much.
 * 
 * @param {any} value value to debounce
 * @param {number} delay MS to delay
 * 
 * @returns value from executed function
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export default useDebounce
