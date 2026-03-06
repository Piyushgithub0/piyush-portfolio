import { motion } from 'framer-motion'
import data from '../data/skills.json'

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <h2 className="font-display text-2xl sm:text-3xl">Skills</h2>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-8 grid gap-4 md:grid-cols-2"
      >
        {data.categories.map((cat) => (
          <motion.div
            key={cat.name}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="rounded-2xl border border-white/10 bg-background-light/80 p-4 text-foreground-light backdrop-blur dark:bg-background-dark/80 dark:text-foreground-dark"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-foreground-light/60 dark:text-foreground-dark/60">
              {cat.name}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-foreground-light/80 dark:text-foreground-dark/80">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/5 px-3 py-1 text-[11px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Skills

