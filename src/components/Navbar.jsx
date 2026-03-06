import { useTheme } from '../ThemeContext'
import profile from '../data/profile.json'
import { Moon, Sun, Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import profileImg from "../assets/profile.jpeg"

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const Navbar = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gray-200 bg-[#f7f7fa]/80 backdrop-blur dark:border-white/5 dark:bg-background-dark/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-0">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => scrollToSection('hero')}
        >
         <div className="p-[2px] rounded-full bg-gradient-to-br from-accent-blue to-accent-red">
        <img
              src={profileImg}
              alt="Piyush"
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-accent-blue">
              Portfolio
            </span>
            <span className="text-xs text-foreground-light/70 dark:text-foreground-dark/60">
              {profile.name}
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.25em] text-gray-600 dark:text-foreground-dark/50">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-2 py-1"
                >
                  <span
                    className={
                      activeSection === item.id
                        ? 'text-accent-blue'
                        : 'hover:text-gray-900 dark:hover:text-foreground-dark'
                    }
                  >
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-x-1 -bottom-1 h-px bg-gradient-to-r from-accent-blue via-accent-red to-transparent"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-white/10 dark:bg-background-dark/80 dark:text-foreground-dark"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-white/10 dark:text-foreground-dark"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-white/10 dark:text-foreground-dark"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

