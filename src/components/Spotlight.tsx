'use client'

import { useEffect, useRef } from 'react'

// Soft radial glow that follows the mouse, drawn behind the page content.
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      el.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return <div ref={ref} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
}
