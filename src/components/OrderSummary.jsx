function OrderSummary({ items, deliveryFee, subtotal, total }) {
  const unavailableItems = items.filter(({ food }) => !food.available)

  return (
    <aside aria-label="Order summary" className="checkout-summary">
      <h2>Order summary</h2>
      <ul className="checkout-summary-items">
        {items.map(({ food, quantity, total: itemTotal }) => (
          <li key={food.id}>
            <span>
              {food.name} <span className="summary-quantity">× {quantity}</span>
              {!food.available && <span className="summary-unavailable"> · Unavailable</span>}
            </span>
            <strong>
              {food.available ? `PKR ${itemTotal.toLocaleString('en-PK')}` : 'Unavailable'}
            </strong>
          </li>
        ))}
      </ul>
      <dl className="checkout-totals">
        <div>
          <dt>Subtotal</dt>
          <dd>PKR {subtotal.toLocaleString('en-PK')}</dd>
        </div>
        <div>
          <dt>Delivery fee</dt>
          <dd>
            {deliveryFee === null
              ? 'Select order type'
              : deliveryFee
                ? `PKR ${deliveryFee.toLocaleString('en-PK')}`
                : 'Free'}
          </dd>
        </div>
        <div className="checkout-total">
          <dt>Total</dt>
          <dd>
            {total === null ? 'Select order type' : `PKR ${total.toLocaleString('en-PK')}`}
          </dd>
        </div>
      </dl>
      <p className="delivery-rule-note">
        {unavailableItems.length > 0
          ? 'Remove unavailable items from your cart before placing your order.'
          : 'Free delivery on orders of Rs. 2,000 or more. Orders below Rs. 2,000 cost Rs. 150; pickup is free.'}
      </p>
    </aside>
  )
}

export default OrderSummary
