import { formatCreditCard, type FormatCreditCardOptions } from 'cleave-zen'

const options: FormatCreditCardOptions = { delimiter: '-' }
const value: string = formatCreditCard('5163000011112222', options)
console.log(value)
