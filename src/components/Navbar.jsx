import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import './Navbar.css'

function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef(null)

  function closeMenu() {
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" aria-label="BiteCraft home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            B
          </span>
          <span>BiteCraft</span>
        </NavLink>

        <button
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          ref={menuToggleRef}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          aria-label="Main navigation"
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
        >
          <NavLink end onClick={closeMenu} to="/">
            Home
          </NavLink>
          <NavLink onClick={closeMenu} to="/menu">
            Menu
          </NavLink>
          <NavLink onClick={closeMenu} to="/food">
            Food details
          </NavLink>
          <NavLink
            aria-label={itemCount
              ? `Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`
              : 'Cart'}
            className="cart-link"
            onClick={closeMenu}
            to="/cart"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            Cart
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
