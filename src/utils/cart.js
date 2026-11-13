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
