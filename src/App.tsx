import { useState, useEffect, useRef, useCallback } from 'react'
import {
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS
} from './data/defaultData'
import type { Project } from './types'
import { Navbar } from './components/Navbar'
import { HomeSection } from './components/HomeSection'
import { AboutSection } from './components/AboutSection'
import { PortfolioSection } from './components/PortfolioSection'
import { ProjectModal } from './components/ProjectModal'
import { FloatingSocials } from './components/FloatingSocials'
import './index.css'

export function App() {
  const profile = DEFAULT_PROFILE
  const projects = DEFAULT_PROJECTS

  const [activeSection, setActiveSection] = useState<string>('home')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [cachedProjects, setCachedProjects] = useState<Project[]>([])
  const isNavigatingRef = useRef<boolean>(false)

  // Precalentamiento especulativo de proyectos (DNS + Prefetch + Iframe Pool al pasar mouse o touch)
  const handlePreloadProject = useCallback((proj: Project) => {
    if (!proj?.appUrl) return

    setCachedProjects((prev) => {
      if (prev.some((p) => p.id === proj.id)) return prev
      return [...prev, proj]
    })

    // Inyectar enlace de prefetch en el head si no existe
    const linkId = `prefetch-${proj.id}`
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link')
      link.id = linkId
      link.rel = 'prefetch'
      link.href = proj.appUrl
      link.as = 'document'
      document.head.appendChild(link)
    }
  }, [])

  // Navegación suave a la sección
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)
    isNavigatingRef.current = true
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        isNavigatingRef.current = false
      }, 750)
    }
  }

  // IntersectionObserver para actualizar navbar activa al hacer scroll
  useEffect(() => {
    const sections = ['home', 'about', 'portfolio']
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isNavigatingRef.current) {
              setActiveSection(id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -40% 0px',
          threshold: [0.1, 0.4]
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Navegación por teclado (Flechas Arriba / Abajo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return

      const sections = ['home', 'about', 'portfolio']
      const currentIndex = sections.indexOf(activeSection)

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < sections.length - 1) {
          e.preventDefault()
          handleNavigate(sections[currentIndex + 1])
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault()
          handleNavigate(sections[currentIndex - 1])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, selectedProject])

  return (
    <div className="portfolio-app-root">
      {/* Header fijo superior con soporte móvil responsivo */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleNavigate}
        phone={profile.phone}
      />

      {/* Contenedor principal con scroll vertical suave */}
      <main className="screens-scroll-container">
        <HomeSection
          profile={profile}
          onNavigate={handleNavigate}
        />

        <AboutSection
          profile={profile}
        />

        <PortfolioSection
          projects={projects}
          onSelectProject={(proj) => {
            handlePreloadProject(proj)
            setSelectedProject(proj)
          }}
          onPreloadProject={handlePreloadProject}
        />
      </main>

      {/* Botones flotantes redondos de redes sociales a la derecha */}
      <FloatingSocials
        socialLinks={profile.socialLinks}
        hidden={Boolean(selectedProject)}
      />

      {/* Modal para visualizar proyectos en vivo ultrarrápido */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        cachedProjects={cachedProjects}
      />
    </div>
  )
}

export default App
