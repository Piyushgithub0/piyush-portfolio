import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experiments from './components/Experiments'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { useActiveSection } from './hooks/useActiveSection'
import InteractiveBackground from './components/InteractiveBackground'
import LightModeBackground from './components/LightModeBackground'

function App() {
  const sectionIds = [
    'hero',
    'about',
    'projects',
    'experiments',
    'skills',
    'certifications',
    'education',
    'contact',
  ]

  const activeSection = useActiveSection(sectionIds)

  return (
    <div className="relative min-h-screen bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark">
      <InteractiveBackground />
      <LightModeBackground />
      <div className="relative z-10">
        <Navbar activeSection={activeSection} />
        <main className="pt-16">
          <Hero />
          <About />
          <Projects />
          <Experiments />
          <Skills />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  )
}

export default App