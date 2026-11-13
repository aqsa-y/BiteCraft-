import { Link } from 'react-router-dom'
import restaurant from '../data/restaurant.js'

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero page-container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Freshly made in Islamabad
          </span>
          <h1>
            Big flavour for
            <br />
            <span>your kind of day.</span>
          </h1>
          <p>
            From campus breaks to late work nights, find your next favourite bite
            at {restaurant.name}.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/menu">
              Explore the menu <span aria-hidden="true">↗</span>
            </Link>
            <span className="hero-note">Made fresh. Always satisfying.</span>
          </div>
          <div className="hero-services" aria-label="Ways to order">
            <span>Delivery</span>
            <span>Pickup</span>
            <span>Prices in PKR</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Illustration of a BiteCraft burger" role="img">
          <div className="art-sun" />
          <div className="art-caption">
            <span>CRAFTED WITH CRAVINGS IN MIND</span>
            <strong>Good food. No fuss.</strong>
          </div>
          <div className="burger-illustration">
            <span className="burger-top">
              <i className="sesame sesame-one" />
              <i className="sesame sesame-two" />
              <i className="sesame sesame-three" />
              <i className="sesame sesame-four" />
              <i className="sesame sesame-five" />
            </span>
            <span className="burger-lettuce" />
            <span className="burger-cheese" />
            <span className="burger-patty" />
            <span className="burger-bottom" />
          </div>
          <div className="art-sticker">
            <span>FRESH</span>
            <strong>& tasty</strong>
          </div>
        </div>
      </section>

      <section className="home-highlights">
        <div className="page-container highlights-inner">
          <div>
            <span className="highlight-number">01</span>
            <h2>Made for your cravings</h2>
            <p>Burgers, pizzas, wraps and more—there’s a BiteCraft for every mood.</p>
          </div>
          <div>
            <span className="highlight-number">02</span>
            <h2>On your schedule</h2>
            <p>Choose easy delivery or swing by for a quick pickup in Islamabad.</p>
          </div>
          <div>
            <span className="highlight-number">03</span>
            <h2>Good value, always</h2>
            <p>All menu prices are clearly listed in PKR, so ordering stays simple.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
