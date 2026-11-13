import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FoodCard from '../components/FoodCard.jsx'
import restaurant from '../data/restaurant.js'
import { loadFoods } from '../utils/loadFoods.js'
import { getMenuFoods } from '../utils/menuFilters.js'

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loadResult, setLoadResult] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const simulateFailure = searchParams.get('simulateFailure') === '1'
  const emptyMenu = searchParams.get('emptyMenu') === '1'
  const requestKey = `${simulateFailure}-${emptyMenu}-${retryCount}`
  const currentLoadResult = loadResult?.requestKey === requestKey ? loadResult : null
  const loadState = currentLoadResult?.state || 'loading'
  const loadError = currentLoadResult?.error || ''
  const menuFoods = currentLoadResult?.foods || []
  const requestedCategory = searchParams.get('category')
  const selectedCategory = restaurant.categories.find(
    (category) => category.toLowerCase() === requestedCategory?.toLowerCase(),
  ) || ''
  const visibleFoods = getMenuFoods(menuFoods, { search, category: selectedCategory, sort })

  useEffect(() => {
    let active = true

    loadFoods({ shouldFail: simulateFailure, empty: emptyMenu })
      .then((loadedFoods) => {
        if (!active) {
          return
        }

        setLoadResult({
          requestKey,
          state: loadedFoods.length === 0 ? 'empty' : 'ready',
          foods: loadedFoods,
          error: '',
        })
      })
      .catch((error) => {
        if (!active) {
          return
        }

        setLoadResult({
          requestKey,
          state: 'error',
          foods: [],
          error: error.message,
        })
      })

    return () => {
      active = false
    }
  }, [simulateFailure, emptyMenu, requestKey])

  function toggleCategory(category) {
    setSearchParams(!category || selectedCategory === category ? {} : { category })
  }

  function retryLoading() {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('simulateFailure')
    nextParams.delete('emptyMenu')
    setSearchParams(nextParams, { replace: true })
    setRetryCount((count) => count + 1)
  }

  function resetMenu() {
    setSearch('')
    setSort('')
    setSearchParams({})
  }

  if (loadState === 'loading') {
    return (
      <section aria-busy="true" aria-live="polite" className="page-container menu-page">
        <span className="eyebrow"><span className="eyebrow-dot" />The good stuff</span>
        <h1 id="menu-heading">Our menu</h1>
        <div className="menu-load-state">
          <span aria-hidden="true" className="menu-loading-spinner" />
          <p>Loading BiteCraft favourites…</p>
        </div>
      </section>
    )
  }

  if (loadState === 'error') {
    return (
      <section aria-labelledby="menu-heading" className="page-container menu-page">
        <span className="eyebrow"><span className="eyebrow-dot" />The good stuff</span>
        <h1 id="menu-heading">Our menu</h1>
        <div className="menu-load-state is-error">
          <h2>We couldn’t load the menu.</h2>
          <p role="alert">{loadError} Please try again.</p>
          <button className="button button-primary" onClick={retryLoading} type="button">
            Retry loading menu
          </button>
          <p className="menu-test-hint">
            To demonstrate this state again, open <code>/menu?simulateFailure=1</code>.
          </p>
        </div>
      </section>
    )
  }

  if (loadState === 'empty') {
    return (
      <section aria-labelledby="menu-heading" className="page-container menu-page">
        <span className="eyebrow"><span className="eyebrow-dot" />The good stuff</span>
        <h1 id="menu-heading">Our menu</h1>
        <div className="menu-load-state">
          <h2>There are no menu items right now.</h2>
          <p role="status">Please check back in a moment.</p>
          <button className="button button-primary" onClick={retryLoading} type="button">
            Reload menu
          </button>
          <p className="menu-test-hint">
            To demonstrate this state again, open <code>/menu?emptyMenu=1</code>.
          </p>
        </div>
      </section>
    )
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
      <div className="category-list" aria-label="Filter menu by category" role="group">
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
