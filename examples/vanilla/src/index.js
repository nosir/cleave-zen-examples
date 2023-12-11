const cleaveZen = window.cleaveZen
const {
  formatCreditCard,
  getCreditCardType,
  registerCursorTracker,
  DefaultCreditCardDelimiter,
} = cleaveZen

const main = () => {
  const creditcardInput = document.querySelector('.creditcard-input')
  const typeInput = document.querySelector('.creditcard-type')
  registerCursorTracker({
    input: creditcardInput,
    delimiter: DefaultCreditCardDelimiter,
  })
  creditcardInput.addEventListener('input', e => {
    creditcardInput.value = formatCreditCard(e.target.value)
    typeInput.innerHTML = getCreditCardType(e.target.value)
  })
}

main()
