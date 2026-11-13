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
          <p>Good food, good mood. Freshly made for your Islamabad days.</p>
        </div>
        <div className="footer-details">
          <span className="footer-label">Find us</span>
          <p>{restaurant.location}</p>
          <span className="footer-label">Order your way</span>
          <p>Delivery or pickup · Prices in PKR</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {currentYear} BiteCraft</span>
        <span>Made fresh in Islamabad, Pakistan</span>
      </div>
    </footer>
  )
}

export default Footer
