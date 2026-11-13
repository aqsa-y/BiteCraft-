import { useEffect, useState } from 'react'
import foods from '../data/foods.js'
import { addFoodToCart } from '../utils/cart.js'
import CartContext from './CartContextValue.js'

const CART_STORAGE_KEY = 'bitecraft-cart'

function readCart() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY)
  if (!storedCart) {
    return []
  }

  const items = JSON.parse(storedCart)
  if (!Array.isArray(items)) {
    throw new Error('Saved BiteCraft cart data must be an array.')
  }

  return items.filter((item) => {
    if (!item || typeof item.id !== 'string') {
      return false
    }

    const food = foods.find((candidate) => candidate.id === item.id)
    return food?.available && Number.isSafeInteger(item.quantity) && item.quantity > 0
  })
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(food, quantity) {
    const catalogFood = foods.find((item) => item.id === food?.id)
    if (!catalogFood || !catalogFood.available) {
      throw new Error('This food is unavailable and cannot be added to the cart.')
    }

    setItems((currentItems) => addFoodToCart(currentItems, catalogFood, quantity))
  }

  function removeFromCart(foodId) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== foodId))
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, itemCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
