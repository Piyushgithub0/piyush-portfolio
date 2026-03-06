import profile from '../data/profile.json'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-[#f7f7fa]/90 py-6 text-xs text-gray-600 backdrop-blur dark:border-white/10 dark:bg-background-dark/90 dark:text-foreground-dark/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-0">
        <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-blue"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-blue"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-accent-blue"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

