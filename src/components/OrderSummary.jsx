function OrderSummary({ items, deliveryFee, subtotal, total }) {
  return (
    <aside aria-label="Order summary" className="checkout-summary">
      <h2>Order summary</h2>
      <ul className="checkout-summary-items">
        {items.map(({ food, quantity, total: itemTotal }) => (
          <li key={food.id}>
            <span>{food.name} <span className="summary-quantity">× {quantity}</span></span>
            <strong>PKR {itemTotal.toLocaleString('en-PK')}</strong>
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
          <dd>{deliveryFee ? `PKR ${deliveryFee.toLocaleString('en-PK')}` : 'Free'}</dd>
        </div>
        <div className="checkout-total">
          <dt>Total</dt>
          <dd>PKR {total.toLocaleString('en-PK')}</dd>
        </div>
      </dl>
    </aside>
  )
}

export default OrderSummary
