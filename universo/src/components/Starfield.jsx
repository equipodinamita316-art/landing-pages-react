import { useEffect, useRef } from 'react'

export default function Starfield({ density = 1, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let raf
    let w = 0
    let h = 0
    let stars = []
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * dpr
      h = canvas.height = canvas.offsetHeight * dpr
      const count = Math.round((w * h) / (7200 / density))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.7 + 0.3) * dpr,
        depth: Math.random() * 0.9 + 0.1,
        baseAlpha: Math.random() * 0.65 + 0.25,
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * 0.015 + 0.003,
        hue: Math.random() < 0.28 ? (Math.random() < 0.5 ? 190 : 45) : null,
        light: Math.random() * 14,
      }))
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - rect.left - rect.width / 2) / rect.width
      mouse.ty = (e.clientY - rect.top - rect.height / 2) / rect.height
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      const px = mouse.x * 26 * dpr
      const py = mouse.y * 26 * dpr

      for (const s of stars) {
        const alpha = s.baseAlpha * (0.55 + 0.45 * Math.sin(t * 0.0012 * s.twinkle * 900 + s.phase * 8))
        if (alpha < 0.04) continue
        ctx.globalAlpha = alpha
        ctx.fillStyle = s.hue
          ? `hsla(${s.hue}, 90%, ${79 + s.light}%, 1)`
          : `hsla(${210}, 90%, ${86 + s.light}%, 1)`
        ctx.beginPath()
        ctx.arc(s.x + px * s.depth, s.y + py * s.depth, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [density])

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />
}