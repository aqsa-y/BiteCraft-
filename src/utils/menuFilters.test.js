import assert from 'node:assert/strict'
import test from 'node:test'
import foods from '../data/foods.js'
import { getMenuFoods } from './menuFilters.js'

const names = (items) => items.map((food) => food.name)

test('search is case-insensitive, matches singular and plural words, and handles empty queries', () => {
  assert.deepEqual(names(getMenuFoods(foods, { search: 'DEAL' })), ['Student Meal Deal'])
  assert.deepEqual(names(getMenuFoods(foods, { search: 'deals' })), ['Student Meal Deal'])
  assert.deepEqual(names(getMenuFoods(foods, { search: '  ' })), names(foods))
  assert.deepEqual(getMenuFoods(foods, { search: 'nothing matches this' }), [])
})

test('search and category filters combine across item names and descriptions', () => {
  assert.deepEqual(names(getMenuFoods(foods, { category: 'Burgers', search: 'CHEESE' })), [
    'House Smash Burger',
    'Double Stack Burger',
  ])
  assert.deepEqual(names(getMenuFoods(foods, { category: 'Burgers', search: 'cheese' })), [
    'House Smash Burger',
    'Double Stack Burger',
  ])
  assert.deepEqual(names(getMenuFoods(foods, { category: 'Pizzas', search: 'deal' })), [])
})

test('sorting orders filtered results without changing the catalog', () => {
  const originalNames = names(foods)
  const pricesAscending = getMenuFoods(foods, { sort: 'price-ascending' })
  const pricesDescending = getMenuFoods(foods, { sort: 'price-descending' })
  const namesAscending = getMenuFoods(foods, { sort: 'name-ascending' })

  assert.deepEqual(pricesAscending.map((food) => food.price), [...pricesAscending.map((food) => food.price)].sort((a, b) => a - b))
  assert.deepEqual(pricesDescending.map((food) => food.price), [...pricesDescending.map((food) => food.price)].sort((a, b) => b - a))
  assert.deepEqual(names(namesAscending), [...names(namesAscending)].sort((a, b) => a.localeCompare(b)))
  assert.deepEqual(names(foods), originalNames)
})
