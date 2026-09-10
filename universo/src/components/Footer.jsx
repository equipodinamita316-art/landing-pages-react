import { motion } from 'framer-motion'
import Nebula from './Nebula.jsx'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-10 pt-24 text-center">
      <Nebula />

      <div className="relative mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl font-bold text-white sm:text-5xl"
        >
          Tu aventura <span className="text-gradient text-glow">comienza ahora</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300"
        >
          El universo está lleno de maravillas esperando ser descubiertas. Únete a
          la próxima generación de exploradores del cosmos.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="tu@correo.com"
            className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none backdrop-blur transition focus:border-fuchsia-400/70"
          />
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-900/40 transition-transform hover:scale-105"
          >
            Recibir novedades
          </button>
        </motion.form>

        <div className="mt-16 border-t border-white/10 pt-8 text-xs leading-relaxed text-slate-500">
          <p>
            Hecho con pasión por el espacio. Los datos planetarios son de carácter
            ilustrativo y divulgativo.
          </p>
          <p className="mt-2">
            Universo — Explora el Cosmos · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}