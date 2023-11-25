const cleaveZen = window.cleaveZen
const { formatCreditCard, registerCursorTracker, DefaultCreditCardDelimiter } =
  cleaveZen

const main = () => {
  const creditcardInput = document.querySelector('.creditcard-input')
  registerCursorTracker({
    input: creditcardInput,
    delimiter: DefaultCreditCardDelimiter,
  })
  creditcardInput.addEventListener('input', e => {
    const { value, type } = formatCreditCard(e.target.value)
    creditcardInput.value = value
    document.querySelector('.creditcard-type').innerHTML = type
  })
}

main()
