import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import foods from './foods.js'

const requiredCategories = ['Burgers', 'Pizzas', 'Wraps', 'Sides', 'Drinks', 'Meal Deals']
const requiredFields = [
  'id',
  'name',
  'category',
  'description',
  'price',
  'image',
  'portionSize',
  'available',
]

test('food catalog has at least 12 unique records across all categories', () => {
  assert.ok(foods.length >= 12)
  assert.equal(new Set(foods.map((food) => food.id)).size, foods.length)

  for (const category of requiredCategories) {
    assert.ok(foods.some((food) => food.category === category), `missing ${category} items`)
  }
})

test('every food record is complete and has a local JPEG image', () => {
  for (const food of foods) {
    for (const field of requiredFields) {
      assert.ok(Object.hasOwn(food, field), `${food.id} is missing ${field}`)
    }

    assert.ok(food.name.trim())
    assert.ok(food.description.trim())
    assert.ok(food.portionSize.trim())
    assert.ok(food.imageAlt.trim())
    assert.ok(Number.isFinite(food.price) && food.price > 0)
    assert.equal(typeof food.available, 'boolean')
    assert.match(food.image, /^\/images\/[\w-]+\.jpg$/, `${food.id} image should be local`)

    const imagePath = fileURLToPath(new URL(`../../public${food.image}`, import.meta.url))
    const image = readFileSync(imagePath)
    assert.deepEqual(image.subarray(0, 3), Buffer.from([0xff, 0xd8, 0xff]))
  }
})
