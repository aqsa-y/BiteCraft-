import assert from 'node:assert/strict'
import test from 'node:test'
import foods from '../data/foods.js'
import {
  calculateOrderTotals,
  getUnavailableCartItems,
  validateOrderCart,
  validateOrderEligibility,
} from './businessRules.js'
import { normalizeCartItems } from './cart.js'

test('delivery fees apply below Rs. 2,000 and are free at or above the threshold', () => {
  assert.deepEqual(calculateOrderTotals(1999, 'Delivery'), {
    subtotal: 1999,
    deliveryFee: 150,
    total: 2149,
  })
  assert.deepEqual(calculateOrderTotals(2000, 'Delivery'), {
    subtotal: 2000,
    deliveryFee: 0,
    total: 2000,
  })
  assert.deepEqual(calculateOrderTotals(2001, 'Delivery'), {
    subtotal: 2001,
    deliveryFee: 0,
    total: 2001,
  })
})

test('pickup is free and negative subtotals are rejected', () => {
  assert.deepEqual(calculateOrderTotals(0, 'Delivery'), {
    subtotal: 0,
    deliveryFee: 150,
    total: 150,
  })
  assert.deepEqual(calculateOrderTotals(1999, 'Pickup'), {
    subtotal: 1999,
    deliveryFee: 0,
    total: 1999,
  })
  assert.throws(() => calculateOrderTotals(-1, 'Delivery'), /non-negative/)
})

test('order eligibility requires a valid type and delivery address only for delivery', () => {
  assert.deepEqual(validateOrderEligibility({ orderType: 'Delivery', address: ' ' }), {
    address: 'Enter a delivery address.',
  })
  assert.deepEqual(validateOrderEligibility({ orderType: 'Pickup', address: '' }), {})
  assert.deepEqual(validateOrderEligibility({ orderType: 'Dine in', address: '' }), {
    orderType: 'Choose delivery or pickup.',
  })
})

test('empty carts are ineligible and unavailable cart items are identified for removal', () => {
  assert.deepEqual(validateOrderCart([], foods), {
    cart: 'Add at least one available item before placing your order.',
  })

  const unavailableFood = { ...foods[0], available: false }
  const staleCart = normalizeCartItems(
    [{ id: unavailableFood.id, quantity: 1 }],
    [unavailableFood],
  )
  assert.deepEqual(
    staleCart,
    [{ id: unavailableFood.id, quantity: 1 }],
  )
  assert.deepEqual(
    getUnavailableCartItems(staleCart, [unavailableFood]),
    [{ id: unavailableFood.id, quantity: 1 }],
  )
  assert.deepEqual(
    validateOrderCart(staleCart, [unavailableFood]),
    { availability: 'Remove unavailable items from your cart before placing your order.' },
  )
})
