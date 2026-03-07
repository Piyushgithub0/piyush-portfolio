import { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'

const BUBBLE_COUNT = 30
const PLANKTON_COUNT = 60
const RAY_COUNT = 4

// --- Helper Functions ---
function randomRange(min, max) {
    return Math.random() * (max - min) + min
}

function createBubble(canvasWidth, canvasHeight) {
    return {
        x: randomRange(0, canvasWidth),
        y: randomRange(canvasHeight, canvasHeight + 200),
        radius: randomRange(1.5, 5),
        speedY: randomRange(0.8, 2.5),
        wobbleSpeed: randomRange(0.01, 0.04),
        wobbleAmount: randomRange(10, 30),
        wobbleOffset: randomRange(0, Math.PI * 2),
        opacity: randomRange(0.2, 0.6),
    }
}

function createPlankton(canvasWidth, canvasHeight) {
    return {
        x: randomRange(0, canvasWidth),
        y: randomRange(0, canvasHeight),
        radius: randomRange(0.5, 1.5),
        speedX: randomRange(-0.3, 0.3),
        speedY: randomRange(-0.3, 0.3),
        opacity: randomRange(0.1, 0.4),
    }
}

function createRay(canvasWidth) {
    return {
        x: randomRange(0, canvasWidth),
        width: randomRange(100, 300),
        angle: randomRange(-0.2, 0.2),
        swingSpeed: randomRange(0.002, 0.005),
        swingOffset: randomRange(0, Math.PI * 2),
        opacity: randomRange(0.05, 0.15),
    }
}

const OceanCanvas = () => {
    const { theme } = useTheme()
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const targetRef = useRef({ x: -9999, y: -9999 })
    const smoothRef = useRef({ x: -9999, y: -9999 })

    const ctxRef = useRef(null)
    const widthRef = useRef(0)
    const heightRef = useRef(0)

    // Entities
    const bubblesRef = useRef([])
    const planktonsRef = useRef([])
    const raysRef = useRef([])
    const ripplesRef = useRef([])

    useEffect(() => {
        if (theme !== 'light') return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: true })
        ctxRef.current = ctx

        // --- ResizeHandler ---
        const resize = () => {
            widthRef.current = window.innerWidth
            heightRef.current = window.innerHeight
            canvas.width = widthRef.current
            canvas.height = heightRef.current

            // Re-initialize entities if empty
            if (bubblesRef.current.length === 0) {
                bubblesRef.current = Array.from({ length: BUBBLE_COUNT }, () => createBubble(widthRef.current, heightRef.current))
                // Distribute initial bubbles
                bubblesRef.current.forEach(b => b.y = randomRange(0, heightRef.current))
                planktonsRef.current = Array.from({ length: PLANKTON_COUNT }, () => createPlankton(widthRef.current, heightRef.current))
                raysRef.current = Array.from({ length: RAY_COUNT }, () => createRay(widthRef.current))
            }
        }
        window.addEventListener('resize', resize, { passive: true })
        resize()

        // --- Pointer Tracking ---
        const onMove = (e) => {
            const pt = e.touches ? e.touches[0] : e
            const dx = pt.clientX - targetRef.current.x
            const dy = pt.clientY - targetRef.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            // Only spawn ripple if moved enough
            if (dist > 20 && targetRef.current.x !== -9999) {
                ripplesRef.current.push({
                    x: pt.clientX,
                    y: pt.clientY,
                    r: 5,
                    maxR: randomRange(30, 60),
                    alpha: randomRange(0.2, 0.4),
                })
            }
            targetRef.current = { x: pt.clientX, y: pt.clientY }
        }
        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('touchmove', onMove, { passive: true })

        // --- Animation Loop ---
        const tick = (time) => {
            const w = widthRef.current
            const h = heightRef.current

            ctx.clearRect(0, 0, w, h)

            // Smooth Cursor
            smoothRef.current.x += (targetRef.current.x - smoothRef.current.x) * 0.1
            smoothRef.current.y += (targetRef.current.y - smoothRef.current.y) * 0.1
            const cx = smoothRef.current.x
            const cy = smoothRef.current.y

            // 1. Draw Rays (Background)
            ctx.globalCompositeOperation = 'screen'
            raysRef.current.forEach(ray => {
                const currentAngle = ray.angle + Math.sin(time * ray.swingSpeed + ray.swingOffset) * 0.1

                ctx.save()
                ctx.translate(ray.x, 0)
                ctx.rotate(currentAngle)

                const grad = ctx.createLinearGradient(0, 0, 0, h * 0.8)
                grad.addColorStop(0, `rgba(224, 242, 254, ${ray.opacity})`) // Light cyan top
                grad.addColorStop(1, 'rgba(224, 242, 254, 0)')

                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.moveTo(-ray.width / 2, 0)
                ctx.lineTo(ray.width / 2, 0)
                ctx.lineTo(ray.width * 1.5, h * 0.8)
                ctx.lineTo(-ray.width * 1.5, h * 0.8)
                ctx.fill()

                ctx.restore()
            })
            ctx.globalCompositeOperation = 'source-over'

            // 2. Draw Plankton
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
            planktonsRef.current.forEach(p => {
                p.x += p.speedX
                p.y += p.speedY

                // Wrap around
                if (p.x < 0) p.x = w
                if (p.x > w) p.x = 0
                if (p.y < 0) p.y = h
                if (p.y > h) p.y = 0

                // Interaction
                if (cx > -9000) {
                    const dx = p.x - cx
                    const dy = p.y - cy
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 100) {
                        p.x += dx / dist * 0.5
                        p.y += dy / dist * 0.5
                    }
                }

                ctx.globalAlpha = p.opacity
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fill()
            })

            // 3. Draw Bubbles
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
            bubblesRef.current.forEach(b => {
                b.y -= b.speedY
                const wobbleX = b.x + Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmount

                // Wrap around (reset to bottom)
                if (b.y < -50) {
                    Object.assign(b, createBubble(w, h))
                    b.y = h + 50 // Start below string
                }

                let renderX = wobbleX
                let renderY = b.y

                // Interaction (repel)
                if (cx > -9000) {
                    const dx = renderX - cx
                    const dy = renderY - cy
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        const force = (120 - dist) / 120
                        renderX += (dx / dist) * force * 5
                        renderY += (dy / dist) * force * 5
                    }
                }

                ctx.globalAlpha = b.opacity
                ctx.beginPath()
                ctx.arc(renderX, renderY, b.radius, 0, Math.PI * 2)
                ctx.fill()
                ctx.stroke()
            })

            // 4. Draw Ripples
            ripplesRef.current = ripplesRef.current.filter(r => r.alpha > 0.01)
            ripplesRef.current.forEach(r => {
                ctx.globalAlpha = r.alpha
                ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`
                ctx.lineWidth = 1.5
                ctx.beginPath()
                ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
                ctx.stroke()

                r.r += 2
                r.alpha *= 0.93
            })
            ctx.globalAlpha = 1.0


            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('touchmove', onMove)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }

    }, [theme])

    if (theme !== 'light') return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    )
}

export default OceanCanvas
