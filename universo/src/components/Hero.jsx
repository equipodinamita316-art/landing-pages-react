import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Nebula from './Nebula.jsx'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      <Nebula />

      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-sky-200 backdrop-blur"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-sky-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]" />
            Exploración espacial
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.04] text-white sm:text-6xl lg:text-7xl"
          >
            Explora el{' '}
            <span className="text-gradient text-glow">universo</span>
            <br />
            sin límites
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            Un viaje inmersivo por planetas, nebulosas y la inmensidad del cosmos.
            Descubre mundos lejanos a través de una experiencia visual realista,
            directo en tu navegador.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#planetas"
              className="group relative rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-900/40 transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-500 opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-90" />
              Comenzar el viaje
            </a>
            <a
              href="#misiones"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:border-fuchsia-400/60 hover:bg-white/10"
            >
              Ver misiones
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Desliza</span>
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  )
}