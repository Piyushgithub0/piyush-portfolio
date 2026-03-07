import { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'
import LightGridCanvas from './LightGridCanvas'

const CURSOR_PARTICLES = [
  { x: 18, y: 26, color: 'rgba(56, 189, 248, 0.9)' },
  { x: 32, y: 46, color: 'rgba(37, 99, 235, 0.85)' },
  { x: 52, y: 32, color: 'rgba(168, 85, 247, 0.9)' },
  { x: 68, y: 58, color: 'rgba(244, 114, 182, 0.9)' },
  { x: 24, y: 68, color: 'rgba(34, 197, 94, 0.9)' },
  { x: 78, y: 72, color: 'rgba(251, 146, 60, 0.95)' },
]

const LightModeBackground = () => {
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5 })
  const offsetRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)
  const cursorParticlesRef = useRef([])

  useEffect(() => {
    if (theme !== 'light') return

    const handlePointerMove = (event) => {
      const { innerWidth, innerHeight } = window
      const point =
        'touches' in event ? event.touches[0] : event

      pointerRef.current = {
        x: point.clientX / innerWidth,
        y: point.clientY / innerHeight,
      }
    }

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })
    window.addEventListener('touchmove', handlePointerMove, {
      passive: true,
    })

    const setupCursorParticles = () => {
      const container = containerRef.current
      if (!container) return
      const nodes = container.querySelectorAll('[data-light-cursor-particle]')
      if (!nodes.length) return

      const rect = container.getBoundingClientRect()
      const particles = []

      CURSOR_PARTICLES.forEach((config, index) => {
        const el = nodes[index]
        if (!el) return
        const baseX = rect.left + (config.x / 100) * rect.width
        const baseY = rect.top + (config.y / 100) * rect.height
        particles.push({
          el,
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
        })
      })

      cursorParticlesRef.current = particles
    }

    setupCursorParticles()
    window.addEventListener('resize', setupCursorParticles)

    const animate = () => {
      const targetX = (pointerRef.current.x - 0.5) * 24
      const targetY = (pointerRef.current.y - 0.5) * 24

      offsetRef.current.x += (targetX - offsetRef.current.x) * 0.06
      offsetRef.current.y += (targetY - offsetRef.current.y) * 0.06

      const el = containerRef.current
      if (el) {
        el.style.transform = `translate3d(${offsetRef.current.x}px, ${offsetRef.current.y}px, 0)`
      }

      const cursorParticles = cursorParticlesRef.current
      if (cursorParticles.length) {
        const cursorX = pointerRef.current.x * window.innerWidth
        const cursorY = pointerRef.current.y * window.innerHeight
        const radius = 260

        for (const p of cursorParticles) {
          const dx = p.x - cursorX
          const dy = p.y - cursorY
          const dist = Math.sqrt(dx * dx + dy * dy) || 1

          let ax = (p.baseX - p.x) * 0.04
          let ay = (p.baseY - p.y) * 0.04

          if (dist < radius) {
            const force = (radius - dist) / radius
            const nx = dx / dist
            const ny = dy / dist

            ax += nx * force * 2.4
            ay += ny * force * 2.4
          }

          p.vx = (p.vx + ax) * 0.86
          p.vy = (p.vy + ay) * 0.86

          p.x += p.vx
          p.y += p.vy

          const offsetX = p.x - p.baseX
          const offsetY = p.y - p.baseY

          p.el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('resize', setupCursorParticles)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [theme])

  if (theme !== 'light') return null

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      <LightGridCanvas />
      <div
        ref={containerRef}
        className="absolute inset-[-20%] transition-transform duration-300 ease-out"
      >
        <div className="light-gradient-layer light-gradient-layer--blue" />
        <div className="light-gradient-layer light-gradient-layer--violet" />
        <div className="light-gradient-layer light-gradient-layer--teal" />
        <div className="light-gradient-layer light-gradient-layer--orange" />

        <div className="light-grid-overlay" />

        <div className="light-particles">
          <span className="light-particle light-particle--1" />
          <span className="light-particle light-particle--2" />
          <span className="light-particle light-particle--3" />
          <span className="light-particle light-particle--4" />
          <span className="light-particle light-particle--5" />
          <span className="light-particle light-particle--6" />
        </div>

        <div className="light-cursor-particles">
          {CURSOR_PARTICLES.map((p, index) => (
            <span
              key={index}
              data-light-cursor-particle
              className="light-cursor-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                '--cursor-particle-color': p.color,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LightModeBackground

