import assert from 'node:assert/strict'
import test from 'node:test'
import foods from '../data/foods.js'
import { addFoodToCart, changeCartQuantity, normalizeCartItems } from './cart.js'

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

test('cart quantities increase and decrease without reaching zero', () => {
  const items = [{ id: food.id, quantity: 1 }]

  assert.deepEqual(changeCartQuantity(items, food.id, 1), [{ id: food.id, quantity: 2 }])
  assert.deepEqual(changeCartQuantity(items, food.id, -1), items)
  assert.throws(() => changeCartQuantity(items, food.id, 0), /change by one/)
  assert.deepEqual(items, [{ id: food.id, quantity: 1 }])
})

test('stored cart data is sanitized and duplicate valid lines are consolidated', () => {
  const secondFood = foods[1]
  const restored = normalizeCartItems([
    { id: food.id, quantity: 2 },
    { id: food.id, quantity: 3 },
    { id: secondFood.id, quantity: 1 },
    { id: 'missing-food', quantity: 4 },
    { id: food.id, quantity: 0 },
    null,
  ], foods)

  assert.deepEqual(restored, [
    { id: food.id, quantity: 5 },
    { id: secondFood.id, quantity: 1 },
  ])
  assert.deepEqual(normalizeCartItems(null, foods), [])

  const unavailableFoods = foods.map((item) => (
    item.id === food.id ? { ...item, available: false } : item
  ))
  assert.deepEqual(
    normalizeCartItems([{ id: food.id, quantity: 1 }], unavailableFoods),
    [],
  )
})
