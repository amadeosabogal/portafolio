import React, { useState, useMemo } from 'react'
import type { Project } from '../types'
import { ExternalLinkIcon } from './Icons'

interface PortfolioSectionProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
  onPreloadProject?: (project: Project) => void
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  onSelectProject,
  onPreloadProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')

  // Obtener categorías únicas dinámicamente
  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return ['Todos', ...Array.from(set)]
  }, [projects])

  // Filtrado de proyectos
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Todos') return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <section className="section screen-portfolio" id="portfolio">
      <div className="portfolio-content-container">
        {/* Cabecera y filtros */}
        <div className="portfolio-header-row">
          <div className="section-title-wrap">
            <h2 className="section-title">Portafolio</h2>
            <div className="title-underline" />
          </div>

          {/* Filtros de Categoría con scroll táctil suave */}
          <div className="category-filter-pills" role="tablist" aria-label="Categorías de proyectos">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de tarjetas responsivas */}
        <div className="portfolio-cards-grid">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="portfolio-project-card"
              onClick={() => onSelectProject(project)}
              onPointerEnter={() => onPreloadProject?.(project)}
              onTouchStart={() => onPreloadProject?.(project)}
              tabIndex={0}
              role="button"
              aria-label={`Ver proyecto ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectProject(project)
                }
              }}
            >
              <div className="card-thumb-wrapper">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="card-thumb-img"
                  loading={index < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />

                {/* Overlay en hover y soporte táctil */}
                <div className="card-hover-overlay">
                  <span className="view-project-btn">
                    Ver vista previa
                  </span>
                </div>

                <div className="card-tag-badge-float">
                  {project.category || 'App'}
                </div>
              </div>

              <div className="card-info-box">
                <div className="card-header-line">
                  <h3 className="card-project-title">{project.title}</h3>
                  <a
                    href={project.appUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="card-direct-ext-link"
                    title={`Abrir ${project.title} en nueva pestaña`}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Abrir ${project.title} en pestaña nueva`}
                  >
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>

                {project.description && (
                  <p className="card-project-desc">{project.description}</p>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div className="card-tags-list">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Botón táctil visible en dispositivos móviles */}
                <div className="card-mobile-cta">
                  <span>Abrir vista previa interactiva &rarr;</span>
                </div>
              </div>
            </article>
          ))}

          {filteredProjects.length === 0 && (
            <div className="portfolio-empty-state">
              <p>No se encontraron proyectos en esta categoría.</p>
              <button
                type="button"
                className="action-btn-sharp outline small"
                onClick={() => setSelectedCategory('Todos')}
              >
                Ver todos los proyectos
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
