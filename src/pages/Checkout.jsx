import { useState } from 'react'
import { Link } from 'react-router-dom'
import OrderSummary from '../components/OrderSummary.jsx'
import { useCart } from '../context/useCart.js'
import foods from '../data/foods.js'
import restaurant from '../data/restaurant.js'
import { validateCheckout } from '../utils/checkout.js'
import './Checkout.css'

const initialForm = {
  name: '',
  phone: '',
  orderType: 'Delivery',
  address: '',
  notes: '',
}

function Checkout() {
  const { items, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState(null)
  const orderItems = items.flatMap((item) => {
    const food = foods.find((candidate) => candidate.id === item.id)
    return food
      ? [{ food, quantity: item.quantity, total: food.price * item.quantity }]
      : []
  })
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const deliveryFee = form.orderType === 'Delivery' ? restaurant.deliveryFee : 0
  const total = subtotal + deliveryFee

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      if (name === 'orderType') {
        delete nextErrors.address
      }
      return nextErrors
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateCheckout(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0 || orderItems.length === 0) {
      return
    }

    const orderReference = `BC-${Date.now().toString(36).toUpperCase()}`
    setConfirmation({
      orderReference,
      orderType: form.orderType,
      total,
    })
    clearCart()
  }

  if (confirmation) {
    return (
      <section aria-labelledby="confirmation-heading" className="page-container checkout-page">
        <div className="checkout-confirmation">
          <span aria-hidden="true" className="confirmation-mark">✓</span>
          <span className="eyebrow"><span className="eyebrow-dot" />Order received</span>
          <h1 id="confirmation-heading">Thanks, {form.name.trim()}!</h1>
          <p>Your BiteCraft order has been placed. We’ll be in touch if we need anything else.</p>
          <dl>
            <div><dt>Order reference</dt><dd>{confirmation.orderReference}</dd></div>
            <div><dt>Order type</dt><dd>{confirmation.orderType}</dd></div>
            <div><dt>Total</dt><dd>PKR {confirmation.total.toLocaleString('en-PK')}</dd></div>
          </dl>
          <Link className="button button-primary" to="/menu">Back to the menu</Link>
        </div>
      </section>
    )
  }

  if (orderItems.length === 0) {
    return (
      <section className="page-container simple-page">
        <span className="eyebrow"><span className="eyebrow-dot" />Almost there</span>
        <h1>Checkout</h1>
        <div className="empty-state">
          <span aria-hidden="true" className="empty-state-icon">✓</span>
          <h2>Your next great meal starts here</h2>
          <p>Add a dish to your cart first, then come back to choose delivery or pickup.</p>
          <Link className="button button-primary" to="/menu">Explore the menu</Link>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="checkout-heading" className="page-container checkout-page">
      <span className="eyebrow"><span className="eyebrow-dot" />Almost there</span>
      <h1 id="checkout-heading">Checkout</h1>
      <p className="page-lead">A few details and we’ll get your fresh order ready.</p>
      <div className="checkout-layout">
        <form className="checkout-form" noValidate onSubmit={handleSubmit}>
          <h2>Your details</h2>
          <div className="checkout-field">
            <label htmlFor="customer-name">Customer name</label>
            <input
              autoComplete="name"
              id="customer-name"
              name="name"
              onChange={handleChange}
              required
              aria-describedby={errors.name ? 'customer-name-error' : undefined}
              aria-invalid={Boolean(errors.name)}
              value={form.name}
            />
            {errors.name && <p className="checkout-error" id="customer-name-error" role="alert">{errors.name}</p>}
          </div>
          <div className="checkout-field">
            <label htmlFor="customer-phone">Phone number</label>
            <input
              autoComplete="tel"
              id="customer-phone"
              inputMode="tel"
              name="phone"
              onChange={handleChange}
              placeholder="0300 1234567"
              required
              type="tel"
              aria-describedby={errors.phone ? 'customer-phone-error' : 'phone-hint'}
              aria-invalid={Boolean(errors.phone)}
              value={form.phone}
            />
            {errors.phone
              ? <p className="checkout-error" id="customer-phone-error" role="alert">{errors.phone}</p>
              : <p className="checkout-hint" id="phone-hint">Use a Pakistani mobile number, e.g. 0300 1234567.</p>}
          </div>
          <div className="checkout-field">
            <label htmlFor="order-type">Order type</label>
            <select
              id="order-type"
              name="orderType"
              onChange={handleChange}
              required
              aria-describedby={errors.orderType ? 'order-type-error' : undefined}
              aria-invalid={Boolean(errors.orderType)}
              value={form.orderType}
            >
              <option value="Delivery">Delivery</option>
              <option value="Pickup">Pickup</option>
            </select>
            {errors.orderType && <p className="checkout-error" id="order-type-error" role="alert">{errors.orderType}</p>}
          </div>
          {form.orderType === 'Delivery' && (
            <div className="checkout-field">
              <label htmlFor="delivery-address">Delivery address</label>
              <textarea
                autoComplete="street-address"
                id="delivery-address"
                name="address"
                onChange={handleChange}
                required
                aria-describedby={errors.address ? 'delivery-address-error' : undefined}
                aria-invalid={Boolean(errors.address)}
                rows="3"
                value={form.address}
              />
              {errors.address && <p className="checkout-error" id="delivery-address-error" role="alert">{errors.address}</p>}
            </div>
          )}
          <div className="checkout-field">
            <label htmlFor="order-notes">Order notes <span>(optional)</span></label>
            <textarea
              id="order-notes"
              name="notes"
              onChange={handleChange}
              rows="3"
              value={form.notes}
            />
          </div>
          <button className="button button-primary checkout-submit" type="submit">
            Place order · PKR {total.toLocaleString('en-PK')}
          </button>
          <p className="checkout-payment-note">No online payment is taken here. Payment details can be confirmed when your order is arranged.</p>
        </form>
        <OrderSummary
          deliveryFee={deliveryFee}
          items={orderItems}
          subtotal={subtotal}
          total={total}
        />
      </div>
    </section>
  )
}

export default Checkout
