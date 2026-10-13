import React from 'react'
import type { Project } from '../types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="project-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header">
          <div className="project-modal-info">
            <span className="project-modal-tag">{project.category || 'Proyecto'}</span>
            <h2 className="project-modal-title">{project.title}</h2>
          </div>

          <div className="project-modal-actions">
            <a
              href={project.appUrl}
              target="_blank"
              rel="noreferrer"
              className="open-tab-btn"
            >
              Abrir App en Pestaña Nueva
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <button type="button" className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>

        <div className="project-modal-body">
          <div className="project-iframe-wrapper">
            <iframe
              src={project.appUrl}
              className="project-live-frame"
              title={project.title}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
