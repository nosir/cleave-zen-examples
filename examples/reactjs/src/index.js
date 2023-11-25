import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  formatCreditCard,
  getCreditCardType,
  registerCursorTracker,
} from 'cleave-zen'

const App = () => {
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    registerCursorTracker({ input: inputRef.current, delimiter: '*' })
  }, [])

  return (
    <>
      <input
        ref={inputRef}
        value={value}
        onChange={e => {
          const value = formatCreditCard(e.target.value)
          const type = getCreditCardType(e.target.value)
          setValue(value)
          setType(type)
        }}
      />
      <div>value: {value}</div>
      <div>type: {type}</div>
    </>
  )
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<App />, document.getElementById('root'))
