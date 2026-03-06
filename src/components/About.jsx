import { motion } from 'framer-motion'
import profile from '../data/profile.json'

const About = () => {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">About</h2>
          <p className="mt-4 text-sm text-foreground-light/70 dark:text-foreground-dark/70">
            {profile.bio}
          </p>
        </div>
        <div className="space-y-4 text-sm text-foreground-light/70 dark:text-foreground-dark/70">
          <p>
            I enjoy building systems that feel effortless to work with—clear
            architecture, predictable behavior, and strong tooling. My work
            often lives at the intersection of frontend engineering, platforms,
            and developer experience.
          </p>
          <p>
            Technologies I currently enjoy: React, TypeScript, Tailwind, Vite,
            Framer Motion, Node.js, and modern cloud-native tooling.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default About

