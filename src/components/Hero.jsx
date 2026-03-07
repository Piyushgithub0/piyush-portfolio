import { motion } from 'framer-motion'
import profile from '../data/profile.json'
import profileImg from "../assets/profile.jpg"
import MagneticElement from './MagneticElement'

export const Hero = () => {
  const handleScrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }


  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#f5f5f7] via-white to-[#f0f2f5] px-4 pt-24 text-gray-900 dark:from-background-dark dark:via-[#050505] dark:to-background-dark dark:text-foreground-dark sm:px-6 lg:px-0"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen dark:opacity-70">
        <div className="pointer-events-none absolute -left-32 top-40 h-64 w-64 rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent-red/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-xl space-y-6"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent-blue">
            Software Engineer · Builder
          </p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            Crafting{' '}
            <span className="bg-gradient-to-r from-accent-blue via-accent-red to-accent-blue bg-clip-text text-transparent">
              clean systems
            </span>{' '}
            & futuristic interfaces.
          </h1>
          <p className="max-w-lg text-sm text-foreground-light/70 dark:text-foreground-dark/70">
            {profile.tagline}{' '}
            {profile.bio}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticElement strength={16}>
              <button
                onClick={handleScrollToProjects}
                className="group relative overflow-hidden rounded-full border border-accent-blue/40 bg-accent-blue px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-background-dark shadow-[0_0_40px_rgba(0,174,239,0.6)] transition-transform hover:-translate-y-0.5"
              >
                <span className="relative z-10">View Projects</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-white/40 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </MagneticElement>
            <MagneticElement strength={10}>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-foreground-light/80 transition-colors hover:border-accent-blue hover:text-accent-blue dark:text-foreground-dark/80"
              >
                GitHub
              </a>
            </MagneticElement>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="mt-6 w-full max-w-sm md:mt-0"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px] shadow-[0_0_80px_rgba(0,0,0,0.8)] dark:from-white/10 dark:via-white/5 dark:to-transparent">
            <div className="relative h-full rounded-3xl bg-background-light/90 p-5 dark:bg-[#050505]/90">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-foreground-light/60 dark:text-foreground-dark/60">
                    Developer Profile
                  </p>
                  <p className="mt-1 font-display text-lg text-foreground-light dark:text-foreground-dark">
                    {profile.name}
                  </p>
                </div>
                <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-white/10">
                  <img
                    src={profileImg}
                    alt="Piyush"
                    className="h-full w-full object-cover"
                     />
                </div>
              </div>
              <div className="mt-6 space-y-3 text-xs text-foreground-light/70 dark:text-foreground-dark/70">
                <p>{profile.bio}</p>
                <p className="text-foreground-light/50 dark:text-foreground-dark/50">
                  {profile.location}
                </p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-[10px] uppercase tracking-[0.25em]">
                <div className="rounded-2xl border border-white/10 bg-background-light/80 px-3 py-2 text-foreground-light/70 dark:bg-background-dark/80 dark:text-foreground-dark/70">
                  <p className="text-[9px] text-foreground-light/50 dark:text-foreground-dark/50">
                    Focus
                  </p>
                  <p className="mt-1 text-[11px] text-foreground-light dark:text-foreground-dark">
                    DX & Systems
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-background-light/80 px-3 py-2 text-foreground-light/70 dark:bg-background-dark/80 dark:text-foreground-dark/70">
                  <p className="text-[9px] text-foreground-light/50 dark:text-foreground-dark/50">
                    Current
                  </p>
                  <p className="mt-1 text-[11px] text-foreground-light dark:text-foreground-dark">
                    Frontend · AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

