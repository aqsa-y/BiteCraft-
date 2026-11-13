export function addFoodToCart(items, food, quantity) {
  if (!food || !food.available) {
    throw new Error('This food is unavailable and cannot be added to the cart.')
  }

  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    throw new RangeError('Cart quantity must be a positive whole number.')
  }

  const existingItem = items.find((item) => item.id === food.id)

  if (existingItem) {
    const updatedQuantity = existingItem.quantity + quantity
    if (!Number.isSafeInteger(updatedQuantity)) {
      throw new RangeError('Cart quantity exceeds the supported limit.')
    }

    return items.map((item) => (
      item.id === food.id
        ? { ...item, quantity: updatedQuantity }
        : item
    ))
  }

  return [...items, { id: food.id, quantity }]
}

export function changeCartQuantity(items, foodId, change) {
  if (change !== 1 && change !== -1) {
    throw new RangeError('Cart quantity can only change by one item.')
  }

  return items.map((item) => {
    if (item.id !== foodId) {
      return item
    }

    const quantity = item.quantity + change
    return Number.isSafeInteger(quantity) && quantity > 0
      ? { ...item, quantity }
      : item
  })
}

export function normalizeCartItems(items, foods) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.reduce((validItems, item) => {
    if (!item || typeof item.id !== 'string' || !Number.isSafeInteger(item.quantity) || item.quantity < 1) {
      return validItems
    }

    const food = foods.find((candidate) => candidate.id === item.id)
    if (!food?.available) {
      return validItems
    }

    const existingItem = validItems.find((cartItem) => cartItem.id === food.id)
    if (!existingItem) {
      return [...validItems, { id: food.id, quantity: item.quantity }]
    }

    const combinedQuantity = existingItem.quantity + item.quantity
    if (!Number.isSafeInteger(combinedQuantity)) {
      return validItems
    }

    return validItems.map((cartItem) => (
      cartItem.id === food.id
        ? { ...cartItem, quantity: combinedQuantity }
        : cartItem
    ))
  }, [])
}
