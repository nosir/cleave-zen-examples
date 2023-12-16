import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  formatCreditCard,
  getCreditCardType,
  registerCursorTracker,
  unformatCreditCard,
} from 'cleave-zen'

const App = () => {
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [type, setType] = useState('')
  const [raw, setRaw] = useState('')

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
          const raw = unformatCreditCard(e.target.value)
          setValue(value)
          setType(type)
          setRaw(raw)
        }}
      />
      <div>value: {value}</div>
      <div>type: {type}</div>
      <div>raw: {raw}</div>
    </>
  )
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<App />, document.getElementById('root'))
