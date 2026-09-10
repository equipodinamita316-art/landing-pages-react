import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 2200, bounce: 0 })

  useEffect(() => {
    if (inView) mv.set(to)
  }, [inView, to, mv])

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('es') + suffix
    })
    return unsub
  }, [spring, suffix])

  return <span ref={ref}>0</span>
}

const stats = [
  { value: 100000, suffix: 'M+', label: 'Galaxias observables' },
  { value: 13800, suffix: 'M a', label: 'Edad del universo' },
  { value: 8, suffix: '', label: 'Planetas del sistema solar' },
  { value: 5000, suffix: '+', label: 'Exoplanetas descubiertos' },
]

const missions = [
  {
    title: 'Exploración robótica',
    desc: 'Rovers y sondas recorren Marte y asteroides lejanos, enviando datos que redefinen la ciencia.',
    color: '#fb923c',
    icon: (
      <path d="M4 7h13v2H4zM4 11h10v2H4zM4 15h13v2H4zM18.5 9.5l3-2.5v8l-3-2.5h-2a3 3 0 0 1-3-3 3 3 0 0 1 3-3h2z" />
    ),
  },
  {
    title: 'Telescopios espaciales',
    desc: 'Mirar más profundo en el pasado del universo con observatorios que orbitan más allá de la atmósfera.',
    color: '#38bdf8',
    icon: (
      <path d="M12 3a9 9 0 1 0 9 9h-9zM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    ),
  },
  {
    title: 'Retorno a la Luna',
    desc: 'Bases lunares permanentes y la puerta de entrada para el próximo gran salto hacia Marte.',
    color: '#c084fc',
    icon: (
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    ),
  },
  {
    title: 'Búsqueda de vida',
    desc: 'Analizamos atmósferas de mundos lejanos en busca de los biofirmas que delaten vida extraterrestre.',
    color: '#34d399',
    icon: (
      <path d="M2 12h3M9 4l2 8-2 8M19 4l-2 8 2 8M22 12h-3M22 5l-8 7 8 7" />
    ),
  },
]

export default function Features() {
  return (
    <section id="misiones" className="relative px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[130px]"
          style={{ background: 'radial-gradient(circle at 40% 40%, rgba(168,85,247,0.8), transparent 70%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">
            Las misiones actuales
          </span>
          <h2 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">
            Fronteras de la <span className="text-gradient">exploración</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
            La humanidad nunca ha estado tan cerca de las estrellas. Estas son las
            misiones que están reescribiendo nuestra historia en el espacio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center backdrop-blur"
            >
              <div className="font-display text-4xl font-bold text-gradient">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {missions.map((mission, i) => (
            <motion.article
              key={mission.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1 }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-white/25"
            >
              <div
                className="mb-5 inline-flex rounded-2xl border p-3 transition duration-300 group-hover:scale-110"
                style={{
                  color: mission.color,
                  borderColor: `${mission.color}44`,
                  background: `${mission.color}14`,
                  boxShadow: `0 0 24px -8px ${mission.color}`,
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {mission.icon}
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{mission.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{mission.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}