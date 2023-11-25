import {
  registerCursorTracker,
  getCreditCardType,
  formatGeneral,
  formatCreditCard,
  formatTime,
  formatDate,
  formatNumeral,
  DefaultCreditCardDelimiter,
  DefaultTimeDelimiter,
  DefaultDateDelimiter,
  DefaultNumeralDelimiter,
  NumeralThousandGroupStyles,
  type FormatNumeralOptions,
  type FormatCreditCardOptions,
  type FormatTimeOptions,
  type FormatDateOptions,
  type FormatGeneralOptions,
  type CreditCardType,
} from 'cleave-zen'

const main = (): void => {
  log('General')
  const generalOptions: FormatGeneralOptions = {
    delimiter: '-',
    blocks: [3, 3, 3],
  }
  const generalPrefix: string = 'PREFIX'
  log(formatGeneral('AAABBBCCC', generalOptions)) // AAA-BBB-CCC
  log(
    formatGeneral(`${generalPrefix}AAABBBCCC`, {
      ...generalOptions,
      prefix: generalPrefix,
      blocks: [6, 3, 3, 3],
    })
  ) // PREFIX-AAA-BBB-CCC
  log(
    formatGeneral(`${generalPrefix}AAABBBCCC`, {
      ...generalOptions,
      prefix: 'PREFIX',
      blocks: [6, 3, 3, 3],
      delimiters: ['-', ' ', ' ', ' '],
    })
  ) // PREFIX-AAA-BBB-CCC

  log('Credit Card')
  log(formatCreditCard('5163000011112222')) // 5163 0000 1111 2222
  const creditCardOptions: FormatCreditCardOptions = {
    delimiter: '@',
  }
  log(formatCreditCard('51630000', creditCardOptions)) // 5163@0000@

  log('Numeral')
  log(formatNumeral('3.14')) // 3.14
  const numeralOptions: FormatNumeralOptions = {
    prefix: '$',
  }
  const numeralValue: string = '670032468.45'
  log(formatNumeral(numeralValue, numeralOptions)) // $670,032,468.45
  log(
    formatNumeral(numeralValue, {
      ...numeralOptions,
      numeralThousandsGroupStyle: NumeralThousandGroupStyles.LAKH, // Indian lakh
    })
  ) // $67,00,32,468.45
  log(
    formatNumeral(numeralValue, {
      ...numeralOptions,
      numeralThousandsGroupStyle: NumeralThousandGroupStyles.WAN, // Chinese wan
    })
  ) // $6,7003,2468.45
  log(
    formatNumeral(numeralValue, {
      ...numeralOptions,
      tailPrefix: true,
    })
  ) // $6,7003,2468.45

  log(
    formatNumeral(numeralValue, {
      ...numeralOptions,
      delimiter: '.',
      numeralDecimalMark: ',',
    })
  ) // $670.032.468,45

  log('Date')
  log(formatDate('11041965')) // 11/04/1965
  const dateOptions: FormatDateOptions = {
    datePattern: ['m', 'y'],
    delimiter: '-',
  }
  log(formatDate('0926', dateOptions)) // 09-26
  log(formatDate('24122023', { dateMin: '2046-12-31' })) // 31/12/2046

  log('Time')
  log(formatTime('093030')) // 09:30:30
  log(formatTime('993030')) // 09:30:30
  const timeOptions: FormatTimeOptions = {
    timePattern: ['h', 'm'],
    delimiter: '-',
  }
  log(formatTime('2130', timeOptions)) // 21-30

  // HTML DOM input
  const generalInput = document.querySelector(
    '.general-input'
  ) as HTMLInputElement
  const generalInputDelimiter: string = '-'
  const generalInputPrefix: string = 'PREFIX'
  const generalFormatOptions: FormatGeneralOptions = {
    prefix: generalInputPrefix,
    blocks: [generalInputPrefix.length, 3, 3, 3],
    delimiter: generalInputDelimiter,
    uppercase: true,
  }
  registerCursorTracker({
    input: generalInput,
    delimiter: '-',
    prefix: generalInputPrefix,
  })
  generalInput.value = formatGeneral('', generalFormatOptions)
  generalInput.addEventListener('input', e => {
    const value: string = formatGeneral(
      (e.target as HTMLInputElement).value,
      generalFormatOptions
    )
    generalInput.value = value
  })

  const creditcardInput = document.querySelector(
    '.creditcard-input'
  ) as HTMLInputElement
  registerCursorTracker({
    input: creditcardInput,
    delimiter: DefaultCreditCardDelimiter,
  })
  creditcardInput.addEventListener('input', e => {
    const value: string = formatCreditCard((e.target as HTMLInputElement).value)
    creditcardInput.value = value

    const type: CreditCardType = getCreditCardType(
      (e.target as HTMLInputElement).value
    )
    const creditCardTypeElement =
      document.querySelector('.creditcard-type') ?? null
    if (creditCardTypeElement != null) creditCardTypeElement.innerHTML = type
  })

  const numeralInput = document.querySelector(
    '.numeral-input'
  ) as HTMLInputElement
  const numeralInputPrefix: string = '$'
  const numeralFormatOptions: FormatNumeralOptions = {
    prefix: numeralInputPrefix,
  }
  registerCursorTracker({
    input: numeralInput,
    delimiter: DefaultNumeralDelimiter,
    prefix: numeralInputPrefix,
  })
  numeralInput.value = formatNumeral('', numeralFormatOptions)
  numeralInput.addEventListener('input', e => {
    const value: string = formatNumeral(
      (e.target as HTMLInputElement).value,
      numeralFormatOptions
    )
    numeralInput.value = value
  })

  const dateInput = document.querySelector('.date-input') as HTMLInputElement
  registerCursorTracker({ input: dateInput, delimiter: DefaultDateDelimiter })
  dateInput.addEventListener('input', e => {
    const value: string = formatDate((e.target as HTMLInputElement).value, {
      dateMax: '2030-12-31',
      dateMin: '2020-01-01',
    })
    dateInput.value = value
  })

  const timeInput = document.querySelector('.time-input') as HTMLInputElement
  registerCursorTracker({ input: timeInput, delimiter: DefaultTimeDelimiter })
  timeInput.addEventListener('input', e => {
    const value: string = formatTime((e.target as HTMLInputElement).value)
    timeInput.value = value
  })
}

main()
