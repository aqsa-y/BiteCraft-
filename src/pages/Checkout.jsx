import { Link } from 'react-router-dom'

function Checkout() {
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

export default Checkout
