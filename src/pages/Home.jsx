import { Link } from 'react-router-dom'
import featuredFoods from '../data/featuredFoods.js'
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
        <div className="hero-art">
          <img
            alt="Double cheeseburger layered with melted cheese, tomato, and crisp lettuce"
            className="hero-image"
            decoding="async"
            height="900"
            src="/images/hero-burger.jpg"
            width="1200"
          />
          <div aria-hidden="true" className="hero-image-shade" />
          <div className="art-caption">
            <span>CRAFTED WITH CRAVINGS IN MIND</span>
            <strong>Good food. No fuss.</strong>
          </div>
          <div className="art-sticker">
            <span>FRESH</span>
            <strong>& tasty</strong>
          </div>
        </div>
      </section>

      <section aria-labelledby="popular-heading" className="popular-section">
        <div className="page-container">
          <div className="popular-heading">
            <div>
              <span className="eyebrow"><span className="eyebrow-dot" />A few local favourites</span>
              <h2 id="popular-heading">Crowd-pleasers worth the craving.</h2>
            </div>
            <Link className="text-link" to="/menu">
              Explore all categories <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="food-grid">
            {featuredFoods.map((food) => (
              <Link className="food-card" key={food.id} to={`/food/${food.id}`}>
                <div className="food-card-image">
                  <img
                    alt={food.imageAlt}
                    decoding="async"
                    height="750"
                    loading="lazy"
                    src={food.image}
                    width="1000"
                  />
                  <span className="food-category">{food.category}</span>
                </div>
                <div className="food-card-copy">
                  <div className="food-card-title">
                    <h3>{food.name}</h3>
                    <span>PKR {food.price.toLocaleString('en-PK')}</span>
                  </div>
                  <p>{food.description}</p>
                </div>
              </Link>
            ))}
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
