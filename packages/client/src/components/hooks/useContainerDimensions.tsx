import { RefObject, useEffect, useState } from 'react'

export const useContainerDimensions = (ref: RefObject<HTMLElement>) => {
  const getDimensions = () => ({
    width: ref.current?.offsetWidth ?? 0,
    height: ref.current?.offsetHeight ?? 0
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (ref.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  return dimensions
}
