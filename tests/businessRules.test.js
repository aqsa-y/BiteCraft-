import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateOrderTotals } from '../src/utils/businessRules.js'

test('Rs. 1,500 delivery subtotal adds a Rs. 150 fee', () => {
  assert.deepEqual(calculateOrderTotals(1500, 'Delivery'), {
    subtotal: 1500,
    deliveryFee: 150,
    total: 1650,
  })
})

test('Rs. 2,000 delivery subtotal qualifies for free delivery', () => {
  assert.deepEqual(calculateOrderTotals(2000, 'Delivery'), {
    subtotal: 2000,
    deliveryFee: 0,
    total: 2000,
  })
})

test('negative delivery subtotals are rejected', () => {
  assert.throws(
    () => calculateOrderTotals(-1, 'Delivery'),
    { name: 'RangeError', message: 'Order subtotal must be a non-negative number.' },
  )
})

test('pickup always has a zero delivery fee', () => {
  assert.deepEqual(calculateOrderTotals(1500, 'Pickup'), {
    subtotal: 1500,
    deliveryFee: 0,
    total: 1500,
  })
})
