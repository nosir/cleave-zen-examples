import {
  registerCursorTracker,
  getCreditCardType,
  formatGeneral,
  formatCreditCard,
  unformatCreditCard,
  formatTime,
  formatDate,
  formatNumeral,
  unformatNumeral,
  DefaultCreditCardDelimiter,
  DefaultTimeDelimiter,
  DefaultDateDelimiter,
  DefaultNumeralDelimiter,
  NumeralThousandGroupStyles,
  unformatGeneral,
} from 'cleave-zen'
import type {
  FormatNumeralOptions,
  FormatCreditCardOptions,
  FormatTimeOptions,
  FormatDateOptions,
  FormatGeneralOptions,
  CreditCardType,
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
  log(
    unformatGeneral(`${generalPrefix}-AAA BBB CCC`, {
      delimiters: ['-', ' ', ' ', ' '],
    })
  ) // PREFIX-AAA-BBB-CCC
  log('=====')
  log('Credit Card')
  log(formatCreditCard('5163000011112222')) // 5163 0000 1111 2222
  const creditCardOptions: FormatCreditCardOptions = {
    delimiter: '@',
  }
  log(formatCreditCard('51630000', creditCardOptions)) // 5163@0000@
  log(
    unformatCreditCard(
      `5163${creditCardOptions.delimiter}0000${creditCardOptions.delimiter}1111`
    )
  ) // 516300001111
  log('=====')
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
    formatNumeral('670032468,45', {
      ...numeralOptions,
      delimiter: '.',
      numeralDecimalMark: ',',
    })
  ) // $670.032.468,45
  log(unformatNumeral('$-670,032,468.45')) // -670032468.45
  log(
    unformatNumeral('$670.032.468,45', {
      numeralDecimalMark: ',',
    })
  ) // 670032468.45
  log('=====')
  log('Date')
  log(formatDate('11041965')) // 11/04/1965
  const dateOptions: FormatDateOptions = {
    datePattern: ['m', 'y'],
    delimiter: '-',
  }
  log(formatDate('0926', dateOptions)) // 09-26
  log(formatDate('24122023', { dateMin: '2046-12-31' })) // 31/12/2046
  log('=====')
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
  const creditCardType = document.querySelector(
    '.creditcard-type'
  ) as HTMLDivElement
  const creditCardRaw = document.querySelector(
    '.creditcard-raw'
  ) as HTMLDivElement

  registerCursorTracker({
    input: creditcardInput,
    delimiter: DefaultCreditCardDelimiter,
  })
  creditcardInput.addEventListener('input', e => {
    const input = e.target as HTMLInputElement
    const value: string = formatCreditCard(input.value)
    creditcardInput.value = value

    const type: CreditCardType = getCreditCardType(input.value)
    creditCardType.innerHTML = type

    const raw: string = unformatCreditCard(input.value)
    creditCardRaw.innerHTML = raw
  })

  const numeralInput = document.querySelector(
    '.numeral-input'
  ) as HTMLInputElement
  const numeralRaw = document.querySelector('.numeral-raw') as HTMLInputElement
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
    numeralRaw.innerHTML = unformatNumeral(value)
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
