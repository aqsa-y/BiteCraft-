import { useState } from 'react'

const FALLBACK_IMAGE = '/images/food-fallback.svg'

function ResilientImage({ alt, src, ...imageProps }) {
  const [fallbackActive, setFallbackActive] = useState(false)

  return (
    <img
      {...imageProps}
      alt={fallbackActive ? `Food image unavailable for ${alt}` : alt}
      onError={fallbackActive ? undefined : () => setFallbackActive(true)}
      src={fallbackActive ? FALLBACK_IMAGE : src}
    />
  )
}

export default ResilientImage
