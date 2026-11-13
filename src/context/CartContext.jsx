import { useEffect, useState } from 'react'
import foods from '../data/foods.js'
import { addFoodToCart, changeCartQuantity, normalizeCartItems } from '../utils/cart.js'
import CartContext from './CartContextValue.js'

const CART_STORAGE_KEY = 'bitecraft-cart'

function readCart() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY)
  if (!storedCart) {
    return []
  }

  let items
  try {
    items = JSON.parse(storedCart)
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error
    }

    console.error('Saved BiteCraft cart data is invalid JSON and was cleared.', error)
    localStorage.removeItem(CART_STORAGE_KEY)
    return []
  }

  const normalizedItems = normalizeCartItems(items, foods)
  if (!Array.isArray(items) || normalizedItems.length !== items.length) {
    console.warn('Invalid or duplicate BiteCraft cart items were removed or consolidated.')
  }

  return normalizedItems
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

  function clearCart() {
    setItems([])
  }

  function increaseQuantity(foodId) {
    const food = foods.find((item) => item.id === foodId)
    if (!food?.available) {
      throw new Error('This food is unavailable and cannot be added to the cart.')
    }

    setItems((currentItems) => changeCartQuantity(currentItems, foodId, 1))
  }

  function decreaseQuantity(foodId) {
    setItems((currentItems) => changeCartQuantity(currentItems, foodId, -1))
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
