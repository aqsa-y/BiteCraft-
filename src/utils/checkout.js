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

  if (!['Delivery', 'Pickup'].includes(values.orderType)) {
    errors.orderType = 'Choose delivery or pickup.'
  }

  if (values.orderType === 'Delivery' && !values.address.trim()) {
    errors.address = 'Enter a delivery address.'
  }

  return errors
}
