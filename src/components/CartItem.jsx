import { useCart } from '../context/useCart.js'

function CartItem({ food, quantity }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

  return (
    <article className="cart-item">
      <img alt={food.imageAlt} src={food.image} />
      <div className="cart-item-copy">
        <span>{food.category}</span>
        <h2>{food.name}</h2>
        {food.available ? (
          <p>PKR {food.price.toLocaleString('en-PK')} each</p>
        ) : (
          <p className="cart-item-unavailable">Unavailable — remove to continue</p>
        )}
        <div aria-label={`${food.name} quantity`} className="cart-item-quantity">
          <button
            aria-label={`Decrease ${food.name} quantity`}
            disabled={quantity <= 1}
            onClick={() => decreaseQuantity(food.id)}
            type="button"
          >
            −
          </button>
          <span aria-live="polite">{quantity}</span>
          <button
            aria-label={`Increase ${food.name} quantity`}
            disabled={!food.available || quantity >= Number.MAX_SAFE_INTEGER}
            onClick={() => increaseQuantity(food.id)}
            type="button"
          >
            +
          </button>
        </div>
      </div>
      <strong>
        {food.available ? `PKR ${(food.price * quantity).toLocaleString('en-PK')}` : 'Unavailable'}
      </strong>
      <button
        aria-label={`Remove ${food.name} from cart`}
        className="cart-remove"
        onClick={() => removeFromCart(food.id)}
        type="button"
      >
        Remove
      </button>
    </article>
  )
}

export default CartItem
