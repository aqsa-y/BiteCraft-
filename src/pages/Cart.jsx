import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem.jsx'
import { useCart } from '../context/useCart.js'
import foods from '../data/foods.js'

function Cart() {
  const { items } = useCart()
  const cartItems = items.flatMap((item) => {
    const food = foods.find((candidate) => candidate.id === item.id)
    return food ? [{ ...item, food }] : []
  })
  const subtotal = cartItems.reduce((total, item) => total + item.food.price * item.quantity, 0)

  return (
    <section className="page-container simple-page">
      <span className="eyebrow"><span className="eyebrow-dot" />Your order</span>
      <h1>Your cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true" className="empty-state-icon">＋</span>
          <h2>Your cart is ready for something tasty</h2>
          <p>Once you find a favourite, it’ll show up here.</p>
          <Link className="button button-primary" to="/menu">Browse the menu</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div aria-label="Items in your cart" className="cart-items">
            {cartItems.map((item) => (
              <CartItem food={item.food} key={item.id} quantity={item.quantity} />
            ))}
            <Link className="text-link" to="/menu">Continue shopping <span aria-hidden="true">→</span></Link>
          </div>
          <aside aria-label="Order summary" className="cart-summary">
            <h2>Order summary</h2>
            <p><span>Subtotal</span><strong>PKR {subtotal.toLocaleString('en-PK')}</strong></p>
            <p className="cart-summary-note">Delivery fees, if applicable, are confirmed at checkout.</p>
            <Link className="button button-primary" to="/checkout">Continue to checkout</Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart
