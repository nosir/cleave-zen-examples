import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  formatCreditCard,
  getCreditCardType,
  registerCursorTracker,
  unformatCreditCard,
} from 'cleave-zen'

const Block = () => {
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [type, setType] = useState('')
  const [raw, setRaw] = useState('')

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    // Call this in return to make sure it is unregister when component unmount
    return registerCursorTracker({ input: inputRef.current, delimiter: '*' })
  }, [])

  return (
    <div>
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
    </div>
  )
}

const App = () => {
  const [rendering, setRendering] = useState(true)
  return (
    <>
      <div>
        <button
          onClick={() => {
            setRendering(!rendering)
          }}
        >
          toggle render credit card block
        </button>
      </div>
      <br />
      {rendering && <Block />}
    </>
  )
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<App />, document.getElementById('root'))
