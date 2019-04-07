import { useState } from 'react'

export default function(initialValue, cb) {
  const [value, setValue] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value)
    if (cb) cb(e.target.value)
  }

  return { value, onChange: handleChange }
}
