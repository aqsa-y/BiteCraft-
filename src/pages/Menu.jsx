import { Link, useSearchParams } from 'react-router-dom'
import FoodCard from '../components/FoodCard.jsx'
import foods from '../data/foods.js'
import restaurant from '../data/restaurant.js'

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const selectedCategory = restaurant.categories.includes(requestedCategory)
    ? requestedCategory
    : ''
  const visibleFoods = selectedCategory
    ? foods.filter((food) => food.category === selectedCategory)
    : foods

  function toggleCategory(category) {
    setSearchParams(selectedCategory === category ? {} : { category })
  }

  return (
    <section className="page-container menu-page">
      <span className="eyebrow"><span className="eyebrow-dot" />The good stuff</span>
      <h1 id="menu-heading">Our menu</h1>
      <p className="page-lead">
        Find something for every craving, from a quick campus lunch to a proper
        meal deal. Browse our {restaurant.categories.join(', ').toLowerCase()}.
      </p>
      <div className="category-list" aria-label="Filter menu by category">
        {restaurant.categories.map((category, index) => (
          <button
            aria-pressed={selectedCategory === category}
            className={`category-chip${selectedCategory === category ? ' is-selected' : ''}`}
            key={category}
            onClick={() => toggleCategory(category)}
            type="button"
          >
            <span aria-hidden="true">{['01', '02', '03', '04', '05', '06'][index]}</span>
            {category}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="menu-results">
        <p className="menu-result-count">
          {selectedCategory
            ? `Showing ${visibleFoods.length} ${selectedCategory}`
            : `Showing all ${foods.length} BiteCraft favourites`}
        </p>
        {selectedCategory && (
          <button className="clear-filter" onClick={() => setSearchParams({})} type="button">
            Clear filter
          </button>
        )}
      </div>
      <div aria-labelledby="menu-heading" className="food-grid">
        {visibleFoods.map((food) => (
          <FoodCard food={food} key={food.id} />
        ))}
      </div>
      <Link className="text-link" to="/cart">View your cart <span aria-hidden="true">→</span></Link>
    </section>
  )
}

export default Menu
