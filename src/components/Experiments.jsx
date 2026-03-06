import { motion } from 'framer-motion'

const experiments = [
  {
    title: '3D Interface Prototype',
    description: 'Exploring depth, parallax, and motion for control panels.',
    type: '3D / WebGL',
  },
  {
    title: 'VFX Loader System',
    description: 'Procedural loading and transition effects for web apps.',
    type: 'VFX / Motion',
  },
]

const Experiments = () => {
  return (
    <section
      id="experiments"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl sm:text-3xl">Experiments</h2>
        <p className="text-xs uppercase tracking-[0.3em] text-foreground-light/50 dark:text-foreground-dark/50">
          Lab work
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-8 grid gap-6 md:grid-cols-2"
      >
        {experiments.map((item) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="group rounded-2xl border border-white/10 bg-gradient-to-br from-background-dark via-background-dark to-background-light/10 p-5 text-foreground-dark shadow-[0_0_40px_rgba(0,0,0,0.3)] dark:from-background-dark dark:via-[#050505] dark:to-background-dark"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent-blue">
              {item.type}
            </p>
            <h3 className="mt-2 font-display text-lg">{item.title}</h3>
            <p className="mt-3 text-xs text-foreground-dark/70">
              {item.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Experiments

