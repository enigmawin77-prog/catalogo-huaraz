import { useEffect, useState } from 'react'

export function Counter({ value = 0 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(value)
      return undefined
    }
    const start = performance.now()
    const from = 0
    const dur = 700
    let frame
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      setN(Math.round(from + (value - from) * t))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return n
}
