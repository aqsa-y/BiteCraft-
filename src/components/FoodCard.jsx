import { Link } from 'react-router-dom'
import ResilientImage from './ResilientImage.jsx'
import './FoodCard.css'

function FoodCard({ food }) {
  return (
    <article className="food-card">
      <div className="food-card-image">
        <ResilientImage
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
        <div className="food-card-meta">
          <span className="food-portion">{food.portionSize}</span>
          <span className={`food-availability${food.available ? ' is-available' : ' is-unavailable'}`}>
            {food.available ? 'Available' : 'Currently unavailable'}
          </span>
        </div>
        <Link
          aria-label={`View details for ${food.name}`}
          className="food-card-button"
          to={`/food/${food.id}`}
        >
          View Details
        </Link>
      </div>
    </article>
  )
}

export default FoodCard
