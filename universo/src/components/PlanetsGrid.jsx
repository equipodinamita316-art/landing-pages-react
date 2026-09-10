import { motion } from 'framer-motion'

const planets = [
  {
    name: 'Mercurio',
    desc: 'El veloz mensajero del Sol. Un mundo rocoso lleno de cráteres con temperaturas extremas.',
    stop1: '#6b7280',
    stop2: '#d1d5db',
    stop3: '#9ca3af',
    orbit: '#a3e0ff',
  },
  {
    name: 'Venus',
    desc: 'El gemelo infernal de la Tierra, envuelto en densas nubes de ácido y calor abrasador.',
    stop1: '#b45309',
    stop2: '#fbbf24',
    stop3: '#ffe4a1',
    orbit: '#ffd9a3',
  },
  {
    name: 'Tierra',
    desc: 'Nuestro hogar azul, el único mundo conocido donde la vida florece en abundancia.',
    stop1: '#0c4a6e',
    stop2: '#2a9d8f',
    stop3: '#6fb1e0',
    orbit: '#7dd3fc',
  },
  {
    name: 'Marte',
    desc: 'El planeta rojo, destino de misiones robóticas en busca de señales de vida pasada.',
    stop1: '#7f1d1d',
    stop2: '#f0572d',
    stop3: '#ffb08a',
    orbit: '#fda4af',
  },
  {
    name: 'Júpiter',
    desc: 'El gigante del sistema solar, con su Gran Mancha Roja y tormentas eternas.',
    stop1: '#92400e',
    stop2: '#e8b583',
    stop3: '#fff3e0',
    orbit: '#fcd7a8',
  },
  {
    name: 'Saturno',
    desc: 'El señor de los anillos, célebre por su sistema de hielo y roca deslumbrante.',
    stop1: '#a16207',
    stop2: '#e5c36b',
    stop3: '#fbe7c6',
    orbit: '#e7d3a0',
    ring: true,
  },
  {
    name: 'Urano',
    desc: 'El gigante de hielo inclinado que rueda alrededor del Sol sobre su costado.',
    stop1: '#0e7490',
    stop2: '#67e8f9',
    stop3: '#cffafe',
    orbit: '#a5f3fc',
    ring: true,
  },
  {
    name: 'Neptuno',
    desc: 'El lejano planeta azul azotado por los vientos más rápidos del sistema solar.',
    stop1: '#1e3a8a',
    stop2: '#4f7dff',
    stop3: '#a5c2ff',
    orbit: '#93c5fd',
  },
]

export default function PlanetsGrid() {
  return (
    <section id="planetas" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-300">
            Los vecinos del cosmos
          </span>
          <h2 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">
            Planetas del <span className="text-gradient">sistema solar</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
            Ocho mundos orbitan al Sol, cada uno con una personalidad única:
            desde desiertos ardientes hasta gigantes de hielo y tormentas infinitas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {planets.map((planet, i) => (
            <motion.article
              key={planet.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-fuchsia-400/40 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_-20px_rgba(168,85,247,0.5)]"
            >
              <div
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: `radial-gradient(circle, ${planet.stop2}, transparent 70%)` }}
              />

              <div className="relative mx-auto mb-6 h-36 w-36">
                <div
                  className="absolute inset-[-18%] rounded-full border border-dashed opacity-40 animate-spin-slow"
                  style={{ borderColor: planet.orbit }}
                />
                {planet.ring && (
                  <div className="absolute inset-[-26%] rounded-[50%] border-2 opacity-70 animate-spin-slow"
                    style={{ borderColor: `${planet.orbit}cc`, transform: 'rotate(-24deg)' }}
                  />
                )}
                <div
                  className="animate-float-slow absolute inset-6 rounded-full shadow-[0_10px_50px_-10px_rgba(0,0,0,0.8)]"
                  style={{
                    background: `radial-gradient(circle at 32% 28%, ${planet.stop3}, ${planet.stop2} 40%, ${planet.stop1} 82%)`,
                    boxShadow: `0 0 40px -8px ${planet.orbit}`,
                  }}
                />
              </div>

              <h3 className="font-display text-xl font-semibold text-white">{planet.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{planet.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}