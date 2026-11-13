import assert from 'node:assert/strict'
import test from 'node:test'
import { createOrderReference, validateCheckout } from './checkout.js'

const validDelivery = {
  name: 'Samira Khan',
  phone: '0300 1234567',
  orderType: 'Delivery',
  address: 'F-7 Markaz, Islamabad',
  notes: '',
}

test('order references have the BiteCraft format', () => {
  assert.match(createOrderReference(), /^BC-[A-Z0-9]+$/)
})

test('checkout accepts common Pakistani mobile number formats', () => {
  for (const phone of ['03001234567', '0300 1234567', '+92 300 1234567', '0092-300-1234567']) {
    assert.deepEqual(validateCheckout({ ...validDelivery, phone }), {})
  }
})

test('checkout reports field-specific errors and does not require an address for pickup', () => {
  assert.deepEqual(validateCheckout({
    name: '  ',
    phone: '12345',
    orderType: 'Delivery',
    address: ' ',
    notes: '',
  }), {
    name: 'Enter your name.',
    phone: 'Enter a valid Pakistani mobile number, such as 0300 1234567.',
    address: 'Enter a delivery address.',
  })

  assert.deepEqual(validateCheckout({
    ...validDelivery,
    orderType: 'Pickup',
    address: '',
  }), {})
})
