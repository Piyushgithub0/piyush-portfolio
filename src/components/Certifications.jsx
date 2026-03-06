import { motion } from 'framer-motion'
import data from '../data/certifications.json'

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <h2 className="font-display text-2xl sm:text-3xl">Certifications</h2>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-8 grid gap-5 md:grid-cols-3"
      >
        {data.items.map((item) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="rounded-2xl border border-white/10 bg-background-light/80 p-4 text-foreground-light backdrop-blur dark:bg-background-dark/80 dark:text-foreground-dark"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground-light/60 dark:text-foreground-dark/60">
              {item.year}
            </p>
            <h3 className="mt-1 font-display text-base">{item.title}</h3>
            <p className="mt-1 text-xs text-foreground-light/70 dark:text-foreground-dark/70">
              {item.issuer}
            </p>
            <p className="mt-3 text-xs text-foreground-light/70 dark:text-foreground-dark/70">
              {item.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Certifications

