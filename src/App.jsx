import Hero from './components/Hero'
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
    <div className="min-h-screen bg-background-dark text-foreground-dark">
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
  )
}

export default App