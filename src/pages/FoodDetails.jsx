import { Link, useParams } from 'react-router-dom'
import featuredFoods from '../data/featuredFoods.js'

function FoodDetails() {
  const { foodId } = useParams()
  const food = featuredFoods.find((item) => item.id === foodId)

  if (foodId && !food) {
    return (
      <section className="page-container simple-page">
        <span className="eyebrow"><span className="eyebrow-dot" />Not on today’s menu</span>
        <h1>We couldn’t find that dish.</h1>
        <p className="page-lead">Try another BiteCraft favourite from the menu.</p>
        <Link className="button button-primary" to="/menu">Browse the menu</Link>
      </section>
    )
  }

  if (food) {
    return (
      <section className="page-container food-detail-page">
        <Link className="text-link" to="/menu">
          <span aria-hidden="true">←</span> Back to the menu
        </Link>
        <div className="food-detail">
          <div className="food-detail-image">
            <img
              alt={food.imageAlt}
              decoding="async"
              height="750"
              src={food.image}
              width="1000"
            />
          </div>
          <div className="food-detail-copy">
            <span className="eyebrow"><span className="eyebrow-dot" />{food.category}</span>
            <h1>{food.name}</h1>
            <p>{food.description}</p>
            <strong>PKR {food.price.toLocaleString('en-PK')}</strong>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page-container simple-page">
      <span className="eyebrow"><span className="eyebrow-dot" />Fresh from our kitchen</span>
      <h1>{foodId ? 'A tasty choice' : 'Food details'}</h1>
      <p className="page-lead">
        {foodId
          ? `You’re viewing item ${foodId}. Food descriptions and ordering will be available with the menu module.`
          : 'Pick a dish from the menu to see what goes into your next favourite bite.'}
      </p>
      <div className="route-note">
        <span className="route-note-mark" aria-hidden="true">✦</span>
        <p>Dish details and prices will be connected when the menu is added.</p>
      </div>
      <Link className="text-link" to="/menu">Back to the menu <span aria-hidden="true">→</span></Link>
    </section>
  )
}

export default FoodDetails
