import { useEffect, useState } from 'react'

export const useMediaQuery = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth)

    window.addEventListener('resize', updateWidth)
    updateWidth() // Set width setelah mount

    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return width
}
