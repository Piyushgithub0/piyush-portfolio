import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import profile from '../data/profile.json'

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <h2 className="font-display text-2xl sm:text-3xl">Contact</h2>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">
          I&apos;m always open to interesting problems, collaborations, and
          engineering conversations. The fastest way to reach me is via email or
          LinkedIn.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-foreground-light/80 transition-colors hover:border-accent-blue hover:text-accent-blue dark:text-foreground-dark/80"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-foreground-light/80 transition-colors hover:border-accent-blue hover:text-accent-blue dark:text-foreground-dark/80"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-foreground-light/80 transition-colors hover:border-accent-blue hover:text-accent-blue dark:text-foreground-dark/80"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact

