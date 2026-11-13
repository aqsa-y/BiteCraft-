import { Link } from 'react-router-dom'
import FoodCard from '../components/FoodCard.jsx'
import foods from '../data/foods.js'
import restaurant from '../data/restaurant.js'

function Menu() {
  return (
    <section className="page-container menu-page">
      <span className="eyebrow"><span className="eyebrow-dot" />The good stuff</span>
      <h1 id="menu-heading">Our menu</h1>
      <p className="page-lead">
        Find something for every craving, from a quick campus lunch to a proper
        meal deal. Browse our {restaurant.categories.join(', ').toLowerCase()}.
      </p>
      <div className="category-list" aria-label="Menu categories">
        {restaurant.categories.map((category, index) => (
          <span className="category-chip" key={category}>
            <span aria-hidden="true">{['01', '02', '03', '04', '05', '06'][index]}</span>
            {category}
          </span>
        ))}
      </div>
      <p className="menu-result-count">Showing all {foods.length} BiteCraft favourites</p>
      <div aria-labelledby="menu-heading" className="food-grid">
        {foods.map((food) => (
          <FoodCard food={food} key={food.id} />
        ))}
      </div>
      <Link className="text-link" to="/cart">View your cart <span aria-hidden="true">→</span></Link>
    </section>
  )
}

export default Menu
