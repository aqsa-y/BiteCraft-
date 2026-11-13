import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import FoodCard from '../components/FoodCard.jsx'
import foods from '../data/foods.js'
import restaurant from '../data/restaurant.js'
import { getMenuFoods } from '../utils/menuFilters.js'

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const requestedCategory = searchParams.get('category')
  const selectedCategory = restaurant.categories.find(
    (category) => category.toLowerCase() === requestedCategory?.toLowerCase(),
  ) || ''
  const visibleFoods = getMenuFoods(foods, { search, category: selectedCategory, sort })

  function toggleCategory(category) {
    setSearchParams(!category || selectedCategory === category ? {} : { category })
  }

  function resetMenu() {
    setSearch('')
    setSort('')
    setSearchParams({})
  }

  return (
    <section className="page-container menu-page">
      <span className="eyebrow"><span className="eyebrow-dot" />The good stuff</span>
      <h1 id="menu-heading">Our menu</h1>
      <p className="page-lead">
        Find something for every craving, from a quick campus lunch to a proper
        meal deal. Browse our {restaurant.categories.join(', ').toLowerCase()}.
      </p>
      <div className="menu-controls">
        <label className="menu-search">
          <span>Search menu</span>
          <input
            autoComplete="off"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by dish or ingredient"
            type="search"
            value={search}
          />
        </label>
        <label className="menu-sort">
          <span>Sort by</span>
          <select onChange={(event) => setSort(event.target.value)} value={sort}>
            <option value="">Featured order</option>
            <option value="price-ascending">Price: low to high</option>
            <option value="price-descending">Price: high to low</option>
            <option value="name-ascending">Name: A to Z</option>
          </select>
        </label>
      </div>
      <div className="category-list" aria-label="Filter menu by category">
        {['All', ...restaurant.categories].map((category, index) => (
          <button
            aria-pressed={category === 'All' ? !selectedCategory : selectedCategory === category}
            className={`category-chip${
              (category === 'All' && !selectedCategory) || selectedCategory === category
                ? ' is-selected'
                : ''
            }`}
            key={category}
            onClick={() => toggleCategory(category === 'All' ? '' : category)}
            type="button"
          >
            <span aria-hidden="true">
              {index === 0 ? '00' : String(index).padStart(2, '0')}
            </span>
            {category}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="menu-results">
        <p className="menu-result-count">
          Showing {visibleFoods.length} {visibleFoods.length === 1 ? 'item' : 'items'}
          {selectedCategory ? ` in ${selectedCategory}` : ''}
        </p>
        {(search || selectedCategory || sort) && (
          <button className="clear-filter" onClick={resetMenu} type="button">
            Clear search and filters
          </button>
        )}
      </div>
      {visibleFoods.length > 0 ? (
        <div aria-labelledby="menu-heading" className="food-grid">
          {visibleFoods.map((food) => (
            <FoodCard food={food} key={food.id} />
          ))}
        </div>
      ) : (
        <div aria-live="polite" className="menu-no-results">
          <h2>No dishes found</h2>
          <p>Try another search or clear the filters to see the full menu.</p>
          <button className="button button-primary" onClick={resetMenu} type="button">
            Clear search and filters
          </button>
        </div>
      )}
      <Link className="text-link" to="/cart">View your cart <span aria-hidden="true">→</span></Link>
    </section>
  )
}

export default Menu
