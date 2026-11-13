import { Link } from 'react-router-dom'
import restaurant from '../data/restaurant.js'

function Menu() {
  return (
    <section className="page-container simple-page">
      <span className="eyebrow"><span className="eyebrow-dot" />The good stuff</span>
      <h1>Our menu</h1>
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
      <div className="route-note">
        <span className="route-note-mark" aria-hidden="true">✦</span>
        <p>Our full menu and ordering options are coming together. Check back soon.</p>
      </div>
      <Link className="text-link" to="/food">See food details <span aria-hidden="true">→</span></Link>
    </section>
  )
}

export default Menu
