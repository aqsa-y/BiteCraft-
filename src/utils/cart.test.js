import assert from 'node:assert/strict'
import test from 'node:test'
import foods from '../data/foods.js'
import { addFoodToCart } from './cart.js'

const food = foods[0]

test('adding a food creates or increments a cart line without mutating existing items', () => {
  const firstCart = addFoodToCart([], food, 2)
  const secondCart = addFoodToCart(firstCart, food, 3)

  assert.deepEqual(firstCart, [{ id: food.id, quantity: 2 }])
  assert.deepEqual(secondCart, [{ id: food.id, quantity: 5 }])
})

test('unavailable food and invalid quantities are rejected', () => {
  assert.throws(
    () => addFoodToCart([], { ...food, available: false }, 1),
    /unavailable/,
  )

  for (const quantity of [0, -1, 1.5, Number.NaN, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(
      () => addFoodToCart([], food, quantity),
      /positive whole number/,
    )
  }
})
