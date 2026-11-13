export const FREE_DELIVERY_THRESHOLD = 2000
export const STANDARD_DELIVERY_FEE = 150

export function isFoodAvailable(food) {
  return food?.available === true
}

export function getUnavailableCartItems(items, foods) {
  return items.filter((item) => {
    const food = foods.find((candidate) => candidate.id === item.id)
    return !isFoodAvailable(food)
  })
}

export function validateOrderEligibility({ orderType, address }) {
  const errors = {}

  if (!['Delivery', 'Pickup'].includes(orderType)) {
    errors.orderType = 'Choose delivery or pickup.'
  } else if (orderType === 'Delivery' && !address.trim()) {
    errors.address = 'Enter a delivery address.'
  }

  return errors
}

export function validateOrderCart(items, foods) {
  if (items.length === 0) {
    return { cart: 'Add at least one available item before placing your order.' }
  }

  if (getUnavailableCartItems(items, foods).length > 0) {
    return { availability: 'Remove unavailable items from your cart before placing your order.' }
  }

  return {}
}

export function calculateOrderTotals(subtotal, orderType) {
  if (!Number.isFinite(subtotal) || subtotal < 0) {
    throw new RangeError('Order subtotal must be a non-negative number.')
  }

  if (!['Delivery', 'Pickup'].includes(orderType)) {
    throw new Error('Choose delivery or pickup to calculate order totals.')
  }

  const deliveryFee = orderType === 'Pickup'
    ? 0
    : subtotal < FREE_DELIVERY_THRESHOLD
      ? STANDARD_DELIVERY_FEE
      : 0

  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  }
}
