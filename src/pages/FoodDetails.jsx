import { Link, useParams } from 'react-router-dom'

function FoodDetails() {
  const { foodId } = useParams()

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
