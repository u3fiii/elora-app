import { useEffect, useState } from 'react'

const MOBILE_VIEWPORT_QUERY = '(max-width: 767px)'

function getIsMobileViewport() {
  if (typeof window === 'undefined') return true
  return window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
}

export function useMobileViewport() {
  const [isMobileViewport, setIsMobileViewport] = useState(getIsMobileViewport)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_VIEWPORT_QUERY)
    const update = () => setIsMobileViewport(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isMobileViewport
}
