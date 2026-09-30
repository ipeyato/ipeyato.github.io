'use client'

import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on devices with a real mouse; touch screens keep their default behavior.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduceMotion ? 1 : 0.15
    const mouse = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    let frame = 0

    const render = () => {
      lag.x += (mouse.x - lag.x) * ease
      lag.y += (mouse.y - lag.y) * ease
      ring.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      dot.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!document.documentElement.classList.contains('has-cursor')) {
        // Start the dot where the mouse first appears, not from the corner.
        lag.x = e.clientX
        lag.y = e.clientY
        document.documentElement.classList.add('has-cursor')
      }
      mouse.x = e.clientX
      mouse.y = e.clientY
      const hovering = !!(e.target as Element).closest?.(INTERACTIVE)
      ring.classList.toggle('is-hovering', hovering)
    }
    const onLeave = () => document.documentElement.classList.add('cursor-hidden')
    const onEnter = () => document.documentElement.classList.remove('cursor-hidden')

    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('has-cursor', 'cursor-hidden')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
