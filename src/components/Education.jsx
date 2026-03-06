import { motion } from 'framer-motion'

const education = [
  {
    title: 'B.Tech in Computer Science',
    institution: 'Institute of Technology',
    period: '2020 – 2024',
    detail: 'Focused on software engineering, systems design, and applied machine learning.',
  },
  {
    title: 'High School',
    institution: 'Science & Mathematics Track',
    period: '2018 – 2020',
    detail: 'Strong foundation in mathematics, physics, and problem solving.',
  },
]

const Education = () => {
  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <h2 className="font-display text-2xl sm:text-3xl">Education</h2>
      <div className="mt-10">
        <div className="relative border-l border-white/10">
          {education.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative ml-6 pb-8 last:pb-0"
            >
              <div className="absolute -left-[13px] top-1 h-3 w-3 rounded-full bg-accent-blue shadow-[0_0_20px_rgba(0,174,239,0.8)]" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-foreground-light/60 dark:text-foreground-dark/60">
                {item.period}
              </p>
              <h3 className="mt-1 font-display text-base">{item.title}</h3>
              <p className="text-xs text-foreground-light/70 dark:text-foreground-dark/70">
                {item.institution}
              </p>
              <p className="mt-2 text-xs text-foreground-light/70 dark:text-foreground-dark/70">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education

