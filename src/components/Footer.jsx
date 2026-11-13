import { Link } from 'react-router-dom'
import restaurant from '../data/restaurant.js'
import './Footer.css'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <Link className="footer-brand" to="/">
            <span className="brand-mark" aria-hidden="true">
              B
            </span>
            <span>BiteCraft</span>
          </Link>
          <p>{restaurant.tagline} Freshly made for your Islamabad days.</p>
        </div>
        <nav aria-label="Footer navigation" className="footer-navigation">
          <span className="footer-label">Explore</span>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
        <div className="footer-details">
          <div className="footer-detail-group">
            <span className="footer-label">Contact</span>
            <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
            <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`}>{restaurant.phone}</a>
          </div>
          <div className="footer-detail-group">
            <span className="footer-label">Visit</span>
            <p>{restaurant.fallbackAddress}</p>
            <a href={restaurant.mapUrl} rel="noreferrer" target="_blank">
              Open in maps <span aria-hidden="true">↗</span>
            </a>
            <p>Delivery and pickup in {restaurant.location}</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {currentYear} {restaurant.name}</span>
        <span>{restaurant.type} · Prices in {restaurant.currency}</span>
      </div>
    </footer>
  )
}

export default Footer
