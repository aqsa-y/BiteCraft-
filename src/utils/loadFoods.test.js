import assert from 'node:assert/strict'
import test from 'node:test'
import foods from '../data/foods.js'
import { loadFoods } from './loadFoods.js'

test('mock menu loading resolves after a delay with the local food data', async () => {
  const start = Date.now()
  const loadedFoods = await loadFoods({ delay: 10 })

  assert.ok(Date.now() - start >= 5)
  assert.equal(loadedFoods, foods)
})

test('mock menu loading can return empty data or a controlled failure', async () => {
  assert.deepEqual(await loadFoods({ delay: 0, empty: true }), [])
  await assert.rejects(
    loadFoods({ delay: 0, shouldFail: true }),
    /menu could not be loaded/,
  )
})
