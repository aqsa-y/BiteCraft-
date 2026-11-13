function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function singularize(word) {
  if (word.length > 4 && word.endsWith('ies')) {
    return word.slice(0, -3) + 'y'
  }

  if (/(ches|shes|xes|zes)$/.test(word)) {
    return word.slice(0, -2)
  }

  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) {
    return word.slice(0, -1)
  }

  return word
}

function matchesSearch(food, search) {
  const searchWords = normalizeText(search).split(/\s+/).filter(Boolean)

  if (searchWords.length === 0) {
    return true
  }

  const foodWords = normalizeText(`${food.name} ${food.description} ${food.imageAlt}`).split(/\s+/)
  const foodRoots = new Set(foodWords.map(singularize))

  return searchWords.every((word) => (
    foodRoots.has(singularize(word))
    || (word.length >= 4 && foodWords.some((foodWord) => foodWord.includes(word)))
  ))
}

export function getMenuFoods(foods, { search = '', category = '', sort = '' } = {}) {
  const matchingFoods = foods.filter((food) => (
    (!category || food.category.toLowerCase() === category.toLowerCase())
    && matchesSearch(food, search)
  ))

  if (sort === 'price-ascending') {
    return matchingFoods.sort((first, second) => first.price - second.price)
  }

  if (sort === 'price-descending') {
    return matchingFoods.sort((first, second) => second.price - first.price)
  }

  if (sort === 'name-ascending') {
    return matchingFoods.sort((first, second) => first.name.localeCompare(second.name))
  }

  return matchingFoods
}
