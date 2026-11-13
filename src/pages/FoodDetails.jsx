import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import foods from '../data/foods.js'

function FoodDetails() {
  const { foodId } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState('1')
  const [addedToCart, setAddedToCart] = useState(false)
  const food = foods.find((item) => item.id === foodId)
  const parsedQuantity = Number(quantity)
  const quantityIsValid = Number.isSafeInteger(parsedQuantity) && parsedQuantity > 0

  function handleAddToCart(event) {
    event.preventDefault()
    if (!food?.available || !quantityIsValid) {
      return
    }

    addToCart(food, parsedQuantity)
    setAddedToCart(true)
  }

  if (foodId && !food) {
    return (
      <section className="page-container simple-page">
        <span className="eyebrow"><span className="eyebrow-dot" />Not on today’s menu</span>
        <h1>We couldn’t find that dish.</h1>
        <p className="page-lead">Try another BiteCraft favourite from the menu.</p>
        <Link className="button button-primary" to="/menu">Browse the menu</Link>
      </section>
    )
  }

  if (food) {
    return (
      <section className="page-container food-detail-page">
        <Link className="text-link" to="/menu">
          <span aria-hidden="true">←</span> Back to the menu
        </Link>
        <div className="food-detail">
          <div className="food-detail-image">
            <img
              alt={food.imageAlt}
              decoding="async"
              height="750"
              src={food.image}
              width="1000"
            />
          </div>
          <div className="food-detail-copy">
            <span className="eyebrow"><span className="eyebrow-dot" />{food.category}</span>
            <h1>{food.name}</h1>
            <p>{food.description}</p>
            <strong>PKR {food.price.toLocaleString('en-PK')}</strong>
            <p className="food-detail-portion">Portion: {food.portionSize}</p>
            <span className={`food-availability${food.available ? ' is-available' : ' is-unavailable'}`}>
              {food.available ? 'Available' : 'Currently unavailable'}
            </span>
            <form className="food-detail-order" onSubmit={handleAddToCart}>
              <label htmlFor="food-quantity">Quantity</label>
              <input
                id="food-quantity"
                inputMode="numeric"
                max={Number.MAX_SAFE_INTEGER}
                min="1"
                onChange={(event) => {
                  setQuantity(event.target.value)
                  setAddedToCart(false)
                }}
                step="1"
                type="number"
                value={quantity}
              />
              <button
                className="button button-primary"
                disabled={!food.available || !quantityIsValid}
                type="submit"
              >
                Add to Cart
              </button>
            </form>
            {addedToCart && (
              <p className="food-added-message" role="status">
                Added to your cart. <Link to="/cart">View cart</Link>
              </p>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page-container simple-page">
      <span className="eyebrow"><span className="eyebrow-dot" />Fresh from our kitchen</span>
      <h1>Food details</h1>
      <p className="page-lead">
        Pick a dish from the menu to see its ingredients, portion size, price, and availability.
      </p>
      <Link className="text-link" to="/menu">Back to the menu <span aria-hidden="true">→</span></Link>
    </section>
  )
}

export default FoodDetails
