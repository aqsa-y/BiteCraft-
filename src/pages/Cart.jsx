import { Link } from 'react-router-dom'

function Cart() {
  return (
    <section className="page-container simple-page">
      <span className="eyebrow"><span className="eyebrow-dot" />Your order</span>
      <h1>Your cart</h1>
      <div className="empty-state">
        <span aria-hidden="true" className="empty-state-icon">＋</span>
        <h2>Your cart is ready for something tasty</h2>
        <p>Once you find a favourite, it’ll show up here.</p>
        <Link className="button button-primary" to="/menu">Browse the menu</Link>
      </div>
    </section>
  )
}

export default Cart
