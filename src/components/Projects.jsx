import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import data from '../data/projects.json'

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl sm:text-3xl">Projects</h2>
        <p className="text-xs uppercase tracking-[0.3em] text-foreground-light/50 dark:text-foreground-dark/50">
          Selected work
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {data.projects.map((project) => (
          <motion.article
            key={project.id}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="group flex flex-col rounded-2xl border border-white/10 bg-background-light/80 p-4 text-foreground-light shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur dark:bg-background-dark/80 dark:text-foreground-dark"
          >
            <div className="flex-1">
              <h3 className="font-display text-lg">{project.title}</h3>
              <p className="mt-2 text-xs text-foreground-light/70 dark:text-foreground-dark/70">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-background-light/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-foreground-light/60 group-hover:border-accent-blue group-hover:text-accent-blue dark:bg-background-dark/60 dark:text-foreground-dark/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foreground-light/70 transition-colors hover:border-accent-blue hover:text-accent-blue dark:text-foreground-dark/70"
              >
                <Github className="h-3 w-3" />
                GitHub
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-foreground-light/60 transition-colors hover:text-accent-blue dark:text-foreground-dark/60"
                >
                  <ExternalLink className="h-3 w-3" />
                  Live demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Projects

