import React from 'react'
import type { Project } from '../types'

interface PortfolioSectionProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  onSelectProject
}) => {
  return (
    <section className="section screen-portfolio" id="portfolio">
      <div className="portfolio-content-container">
        <div className="portfolio-header-row">
          <div className="section-title-wrap">
            <h2 className="section-title">Portafolio</h2>
            <div className="title-underline" />
          </div>
        </div>

        <div className="portfolio-cards-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="portfolio-project-card"
              onClick={() => onSelectProject(project)}
            >
              <div className="card-thumb-wrapper">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="card-thumb-img"
                  loading="lazy"
                />
                <div className="card-hover-overlay">
                  <span className="view-project-btn">Ver proyecto</span>
                </div>
              </div>

              <div className="card-info-box">
                <span className="card-category-tag">{project.category || 'Proyecto'}</span>
                <h3 className="card-project-title">{project.title}</h3>
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
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="portfolio-empty-state">
              <p>No se encontraron proyectos actualmente.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
