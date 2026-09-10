import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const ySlow = useTransform(scrollYProgress, [0, 1], [140, -140])
  const yFast = useTransform(scrollYProgress, [0, 1], [-120, 120])
  const yText = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <section ref={ref} className="relative overflow-hidden py-32 sm:py-44">
      <motion.div
        style={{ y: ySlow, scale }}
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full opacity-40 blur-[110px]"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle at 40% 35%, rgba(244,114,182,0.9), rgba(88,28,135,0.4) 55%, transparent 75%)' }}
        />
      </motion.div>

      <motion.div
        style={{ y: yFast }}
        className="pointer-events-none absolute -right-24 bottom-4 h-80 w-80 rounded-full opacity-35 blur-[100px]"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(56,189,248,0.9), rgba(2,132,199,0.35) 55%, transparent 75%)' }}
        />
      </motion.div>

      <motion.div
        style={{ rotate }}
        className="pointer-events-none absolute left-1/2 top-10 hidden h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-dashed border-white/10 lg:block"
        aria-hidden="true"
      >
        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-fuchsia-400/80 shadow-[0_0_16px_rgba(244,114,182,0.9)]" />
        <div className="absolute top-1/4 -right-2 h-2.5 w-2.5 rounded-full bg-sky-400/80 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
      </motion.div>

      <motion.div
        style={{ y: yText }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-300">
          Un universo en expansión
        </span>
        <h2 className="font-display mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Cada giro del scroll te acerca{' '}
          <span className="text-gradient text-glow">a las estrellas</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          Mientras navegas, las capas del cosmos se desplazan a distintas
          velocidades, creando una sensación de profundidad infinita. Así se
          siente viajar a través del espacio interestelar.
        </p>
      </motion.div>
    </section>
  )
}