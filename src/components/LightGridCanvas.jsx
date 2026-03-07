import { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'

// Grid configuration
const GRID_SIZE = 48          // pixels between grid lines
const RIPPLE_RADIUS = 180     // px — radius of distortion influence
const RIPPLE_STRENGTH = 11    // max pixel displacement at centre
const LERP_SPEED = 0.072      // easing towards cursor (0–1, lower = slower)

// Grid line palette — soft blue / cyan / violet
const GRID_COLORS = [
    'rgba(56, 189, 248, 0.52)',   // sky-blue
    'rgba(103, 232, 249, 0.45)',  // cyan
    'rgba(167, 139, 250, 0.48)',  // violet
]

function lerp(a, b, t) {
    return a + (b - a) * t
}

/**
 * Returns the displacement along one axis for a vertex at distance `dist`
 * from the cursor, using a smooth falloff (cosine bell).
 */
function rippleDisplace(dist, strength, radius) {
    if (dist >= radius) return 0
    const t = dist / radius
    // cosine bell: 1 at centre, 0 at edge, always positive → push outward
    return strength * Math.cos((Math.PI / 2) * t)
}

const LightGridCanvas = () => {
    const { theme } = useTheme()
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    // Smoothed cursor position in canvas pixels
    const smoothRef = useRef({ x: -9999, y: -9999 })
    // Raw target cursor position
    const targetRef = useRef({ x: -9999, y: -9999 })

    useEffect(() => {
        if (theme !== 'light') return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        // ── Resize ────────────────────────────────────────────────────────────────
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize, { passive: true })

        // ── Pointer tracking ──────────────────────────────────────────────────────
        const onPointerMove = (e) => {
            const pt = e.touches ? e.touches[0] : e
            targetRef.current = { x: pt.clientX, y: pt.clientY }
        }
        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('touchmove', onPointerMove, { passive: true })

        // ── Draw ──────────────────────────────────────────────────────────────────
        const draw = () => {
            const w = canvas.width
            const h = canvas.height

            // Ease smooth position toward target
            smoothRef.current.x = lerp(smoothRef.current.x, targetRef.current.x, LERP_SPEED)
            smoothRef.current.y = lerp(smoothRef.current.y, targetRef.current.y, LERP_SPEED)
            const cx = smoothRef.current.x
            const cy = smoothRef.current.y

            ctx.clearRect(0, 0, w, h)

            // Number of vertical & horizontal lines to cover the canvas (+2 margin)
            const cols = Math.ceil(w / GRID_SIZE) + 2
            const rows = Math.ceil(h / GRID_SIZE) + 2
            // Offset so grid starts slightly before 0 for seamless tiling
            const startX = -(GRID_SIZE)
            const startY = -(GRID_SIZE)

            ctx.lineWidth = 1.0
            ctx.lineCap = 'round'

            // ── Vertical lines ─────────────────────────────────────────────────────
            for (let col = 0; col < cols; col++) {
                const baseX = startX + col * GRID_SIZE
                // Color cycles through palette
                ctx.strokeStyle = GRID_COLORS[col % GRID_COLORS.length]
                ctx.beginPath()

                for (let row = 0; row <= rows; row++) {
                    const baseY = startY + row * GRID_SIZE
                    const dx = baseX - cx
                    const dy = baseY - cy
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    // Displace the vertex radially outward from cursor
                    const disp = rippleDisplace(dist, RIPPLE_STRENGTH, RIPPLE_RADIUS)
                    const nx = dist > 0 ? dx / dist : 0
                    const ny = dist > 0 ? dy / dist : 0

                    const px = baseX + nx * disp
                    const py = baseY + ny * disp

                    if (row === 0) ctx.moveTo(px, py)
                    else ctx.lineTo(px, py)
                }
                ctx.stroke()
            }

            // ── Horizontal lines ───────────────────────────────────────────────────
            for (let row = 0; row < rows; row++) {
                const baseY = startY + row * GRID_SIZE
                ctx.strokeStyle = GRID_COLORS[row % GRID_COLORS.length]
                ctx.beginPath()

                for (let col = 0; col <= cols; col++) {
                    const baseX = startX + col * GRID_SIZE
                    const dx = baseX - cx
                    const dy = baseY - cy
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    const disp = rippleDisplace(dist, RIPPLE_STRENGTH, RIPPLE_RADIUS)
                    const nx = dist > 0 ? dx / dist : 0
                    const ny = dist > 0 ? dy / dist : 0

                    const px = baseX + nx * disp
                    const py = baseY + ny * disp

                    if (col === 0) ctx.moveTo(px, py)
                    else ctx.lineTo(px, py)
                }
                ctx.stroke()
            }

            rafRef.current = requestAnimationFrame(draw)
        }

        rafRef.current = requestAnimationFrame(draw)

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('touchmove', onPointerMove)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [theme])

    if (theme !== 'light') return null

    return (
        <canvas
            ref={canvasRef}
            className="light-grid-canvas"
            aria-hidden="true"
        />
    )
}

export default LightGridCanvas
