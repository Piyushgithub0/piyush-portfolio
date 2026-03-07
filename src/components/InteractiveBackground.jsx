import { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'

const PARTICLE_COUNT = 42
const MAX_SPEED = 0.35

const createParticles = (width, height) => {
  const particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 0.1 + Math.random() * MAX_SPEED
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      baseRadius: 6 + Math.random() * 10,
      hue: Math.random() > 0.5 ? 195 : 350, // blue / red
      glow: 0.4 + Math.random() * 0.4,
    })
  }
  return particles
}

const InteractiveBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const lightRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])
  const sizeRef = useRef({ width: 0, height: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // In light mode we let a separate light-mode background take over.
    // Keep the existing visuals and behavior exactly for dark mode.
    if (theme !== 'dark') {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    const resize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { width: innerWidth, height: innerHeight }

      if (!particlesRef.current.length) {
        particlesRef.current = createParticles(innerWidth, innerHeight)
      }
      if (pointerRef.current.x === 0 && pointerRef.current.y === 0) {
        pointerRef.current = { x: innerWidth / 2, y: innerHeight / 2 }
        lightRef.current = { x: innerWidth / 2, y: innerHeight / 2 }
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const handlePointerMove = (event) => {
      const { clientX, clientY } = 'touches' in event ? event.touches[0] : event
      pointerRef.current = { x: clientX, y: clientY }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })

    const loop = () => {
      const { width, height } = sizeRef.current
      if (!width || !height) {
        animationRef.current = requestAnimationFrame(loop)
        return
      }

      const pointer = pointerRef.current
      const light = lightRef.current

      // Smoothly chase the pointer
      const chaseStrength = 0.08
      light.x += (pointer.x - light.x) * chaseStrength
      light.y += (pointer.y - light.y) * chaseStrength

      ctx.clearRect(0, 0, width, height)

      // Spotlight gradient following the cursor
      const spotlightRadius = Math.max(width, height) * 0.5
      const gradient = ctx.createRadialGradient(
        light.x,
        light.y,
        0,
        light.x,
        light.y,
        spotlightRadius,
      )

      const intensity = theme === 'dark' ? 0.35 : 0.15
      gradient.addColorStop(0, `rgba(0,174,239,${intensity + 0.2})`)
      gradient.addColorStop(0.35, `rgba(0,174,239,${intensity})`)
      gradient.addColorStop(0.7, 'rgba(10,10,20,0.03)')
      gradient.addColorStop(1, 'transparent')

      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Particles
      const particles = particlesRef.current
      const repelRadius = 260
      const swirlStrength = 0.015

      for (const p of particles) {
        const dx = p.x - light.x
        const dy = p.y - light.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius
          const nx = dx / dist
          const ny = dy / dist

          // Repel slightly
          p.vx += nx * 0.06 * force
          p.vy += ny * 0.06 * force

          // Swirl around the light
          const px = -ny
          const py = nx
          p.vx += px * swirlStrength * force
          p.vy += py * swirlStrength * force
        }

        // Gentle drift
        p.vx += (Math.random() - 0.5) * 0.01
        p.vy += (Math.random() - 0.5) * 0.01

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }

        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -50) p.x = width + 50
        if (p.x > width + 50) p.x = -50
        if (p.y < -50) p.y = height + 50
        if (p.y > height + 50) p.y = -50

        const radius = p.baseRadius

        const particleGradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          radius,
        )

        const baseAlpha = theme === 'dark' ? p.glow : p.glow * 0.6
        const colorCore = `hsla(${p.hue}, 90%, 60%, ${baseAlpha})`
        const colorEdge = `hsla(${p.hue}, 90%, 60%, 0)`

        particleGradient.addColorStop(0, colorCore)
        particleGradient.addColorStop(1, colorEdge)

        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      animationRef.current = requestAnimationFrame(loop)
    }

    animationRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 mix-blend-screen"
    />
  )
}

export default InteractiveBackground

