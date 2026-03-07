import { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'

const MagneticElement = ({ children, strength = 14, className = '' }) => {
  const { theme } = useTheme()
  const ref = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (theme !== 'light') {
      el.style.transform = ''
      return
    }

    let hovering = false

    const handlePointerMove = (event) => {
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      targetRef.current = {
        x: x * strength,
        y: y * strength,
      }
      hovering = true
    }

    const handlePointerLeave = () => {
      targetRef.current = { x: 0, y: 0 }
      hovering = false
    }

    const animate = () => {
      const current = currentRef.current
      const target = targetRef.current

      current.x += (target.x - current.x) * 0.16
      current.y += (target.y - current.y) * 0.16

      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`

      const threshold = 0.1
      const still =
        Math.abs(current.x - target.x) < threshold &&
        Math.abs(current.y - target.y) < threshold

      if (!still || hovering) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        frameRef.current = null
      }
    }

    const startAnimation = () => {
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    el.addEventListener('pointermove', handlePointerMove)
    el.addEventListener('pointerenter', startAnimation)
    el.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerenter', startAnimation)
      el.removeEventListener('pointerleave', handlePointerLeave)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      el.style.transform = ''
    }
  }, [strength, theme])

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  )
}

export default MagneticElement

