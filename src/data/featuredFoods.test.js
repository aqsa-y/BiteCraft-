import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import featuredFoods from './featuredFoods.js'

test('every featured food has a local JPEG image and descriptive alt text', () => {
  assert.ok(featuredFoods.length > 0, 'featured food list should not be empty')

  for (const food of featuredFoods) {
    assert.match(food.image, /^\/images\/[^/]+\.jpg$/, `${food.name} image should be local`)
    assert.ok(food.imageAlt.trim(), `${food.name} should have descriptive alt text`)

    const imagePath = fileURLToPath(new URL(`../../public${food.image}`, import.meta.url))
    const image = readFileSync(imagePath)
    assert.deepEqual(image.subarray(0, 3), Buffer.from([0xff, 0xd8, 0xff]))
  }
})
