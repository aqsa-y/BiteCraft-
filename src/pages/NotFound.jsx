import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page-container simple-page not-found-page">
      <span className="eyebrow"><span className="eyebrow-dot" />404 · Wrong turn</span>
      <h1>That page isn’t on the menu.</h1>
      <p className="page-lead">Let’s get you back to the good stuff.</p>
      <Link className="button button-primary" to="/">Back to BiteCraft</Link>
    </section>
  )
}

export default NotFound
