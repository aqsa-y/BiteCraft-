import { Link } from 'react-router-dom'
import FoodCard from '../components/FoodCard.jsx'
import foods from '../data/foods.js'
import restaurant from '../data/restaurant.js'

function Home() {
  const categories = restaurant.categories.map((category) => ({
    name: category,
    food: foods.find((item) => item.category === category),
  }))

  return (
    <div className="home-page">
      <section className="home-hero page-container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {restaurant.type} · {restaurant.location}
          </span>
          <h1>
            <span className="hero-brand-name">{restaurant.name}</span>
            <span className="hero-tagline">{restaurant.tagline}</span>
          </h1>
          <p>
            Fresh burgers, stone-baked pizzas, wraps, and more—made for students
            and busy days around Islamabad.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/menu">
              Order Now <span aria-hidden="true">↗</span>
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
              View Full Menu <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="food-grid">
            {foods.filter((food) => food.featured).map((food) => (
              <FoodCard food={food} key={food.id} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="category-heading" className="category-section page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" />Find your favourite</span>
            <h2 id="category-heading">A little something for every craving.</h2>
          </div>
          <p>Pick a category and we’ll take you straight to the good stuff.</p>
        </div>
        <div className="category-grid">
          {categories.map(({ name, food }) => (
            <Link
              aria-label={`Browse ${name}`}
              className="category-card"
              key={name}
              to={`/menu?category=${encodeURIComponent(name)}`}
            >
              <img alt={food.imageAlt} decoding="async" loading="lazy" src={food.image} />
              <span className="category-card-shade" />
              <span className="category-card-copy">
                <span>Explore</span>
                <strong>{name}</strong>
              </span>
              <span aria-hidden="true" className="category-card-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="restaurant-info-heading" className="restaurant-info">
        <div className="page-container restaurant-info-inner">
          <div className="restaurant-info-copy">
            <span className="eyebrow"><span className="eyebrow-dot" />Good food, right around the corner</span>
            <h2 id="restaurant-info-heading">Made fresh for Islamabad.</h2>
            <p>
              BiteCraft is a fast-casual neighbourhood spot for quick lunches,
              study breaks, and easy dinners. Order ahead for pickup or get your
              favourites delivered.
            </p>
          </div>
          <div className="restaurant-info-cards">
            <article className="restaurant-info-card">
              <span className="info-card-label">OUR AREA</span>
              <h3>{restaurant.operatingArea}</h3>
              <p>Pickup point: {restaurant.fallbackAddress}</p>
              <a href={restaurant.mapUrl} rel="noreferrer" target="_blank">
                Get directions <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article className="restaurant-info-card">
              <span className="info-card-label">ORDER YOUR WAY</span>
              <h3>{restaurant.orderingMethods.join(' or ')}</h3>
              <p>Freshly prepared, with clear prices in {restaurant.currency}.</p>
              <Link to="/menu">Start an order <span aria-hidden="true">→</span></Link>
            </article>
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
