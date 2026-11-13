import { validateOrderEligibility } from './businessRules.js'

export function createOrderReference() {
  return `BC-${Date.now().toString(36).toUpperCase()}`
}

function isValidPakistaniMobile(phone) {
  const digits = phone.replace(/\D/g, '')
  const nationalNumber = digits.startsWith('0092')
    ? `0${digits.slice(4)}`
    : digits.startsWith('92')
      ? `0${digits.slice(2)}`
      : digits

  return /^03\d{9}$/.test(nationalNumber)
}

export function validateCheckout(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Enter your name.'
  }

  if (!isValidPakistaniMobile(values.phone)) {
    errors.phone = 'Enter a valid Pakistani mobile number, such as 0300 1234567.'
  }

  return { ...errors, ...validateOrderEligibility(values) }
}
