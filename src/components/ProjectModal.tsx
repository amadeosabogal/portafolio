import React, { useState, useEffect } from 'react'
import type { Project } from '../types'
import {
  ExternalLinkIcon,
  CloseIcon,
  RefreshCwIcon,
  MonitorIcon,
  TabletIcon,
  SmartphoneIcon
} from './Icons'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  cachedProjects?: Project[]
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  cachedProjects = []
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [loadedFrames, setLoadedFrames] = useState<Record<string, boolean>>({})
  const [refreshCounters, setRefreshCounters] = useState<Record<string, number>>({})
  const [isSlowWarning, setIsSlowWarning] = useState<boolean>(false)

  // Combinar reactivamente el proyecto seleccionado con la caché de iframes
  const displayProjects = React.useMemo(() => {
    if (!project) return cachedProjects
    if (!cachedProjects.some((p) => p.id === project.id)) {
      return [...cachedProjects, project]
    }
    return cachedProjects
  }, [project, cachedProjects])

  // Bloquear scroll del fondo y escuchar tecla Escape
  useEffect(() => {
    if (project) {
      document.body.classList.add('modal-open')
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.classList.remove('modal-open')
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [project, onClose])

  // Temporizador para advertencia de conexión lenta sin setState sincrónico en render
  useEffect(() => {
    if (!project || loadedFrames[project.id]) {
      return
    }

    const timer = window.setTimeout(() => {
      setIsSlowWarning(true)
    }, 7500)

    return () => {
      window.clearTimeout(timer)
      setIsSlowWarning(false)
    }
  }, [project, loadedFrames])

  const handleFrameLoaded = (id: string) => {
    setLoadedFrames((prev) => ({ ...prev, [id]: true }))
    setIsSlowWarning(false)
  }

  const handleRefresh = (id: string) => {
    setLoadedFrames((prev) => ({ ...prev, [id]: false }))
    setRefreshCounters((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const isCurrentLoaded = project ? Boolean(loadedFrames[project.id]) : false

  return (
    <div
      className={`modal-overlay ${project ? 'active' : ''}`}
      onClick={onClose}
      aria-hidden={!project}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {project && (
          <>
            {/* Barra superior de la vista previa */}
            <header className="project-modal-header">
              <div className="project-modal-info">
                <div className="project-modal-meta">
                  <span className="project-modal-tag">
                    {project.category || 'Proyecto'}
                  </span>
                  <span
                    className={`preview-status-pill ${
                      isCurrentLoaded ? 'online' : 'loading'
                    }`}
                  >
                    <span className="status-dot" />
                    {isCurrentLoaded ? 'En vivo' : 'Cargando vista interactiva...'}
                  </span>
                </div>
                <h2 className="project-modal-title">{project.title}</h2>
              </div>

              {/* Selector de dispositivo (Escritorio / Tablet / Móvil) */}
              <div className="project-modal-device-controls" role="toolbar" aria-label="Selector de pantalla">
                <button
                  type="button"
                  className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                  onClick={() => setDeviceMode('desktop')}
                  title="Vista de Escritorio (100%)"
                >
                  <MonitorIcon size={16} />
                  <span className="device-label">Escritorio</span>
                </button>
                <button
                  type="button"
                  className={`device-btn ${deviceMode === 'tablet' ? 'active' : ''}`}
                  onClick={() => setDeviceMode('tablet')}
                  title="Vista Tablet (768px)"
                >
                  <TabletIcon size={16} />
                  <span className="device-label">Tablet</span>
                </button>
                <button
                  type="button"
                  className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                  onClick={() => setDeviceMode('mobile')}
                  title="Vista Móvil (390px)"
                >
                  <SmartphoneIcon size={16} />
                  <span className="device-label">Móvil</span>
                </button>
              </div>

              {/* Acciones principales */}
              <div className="project-modal-actions">
                <button
                  type="button"
                  className="modal-icon-btn refresh-btn"
                  onClick={() => handleRefresh(project.id)}
                  title="Recargar vista previa"
                >
                  <RefreshCwIcon size={15} />
                  <span className="btn-label-desktop">Recargar</span>
                </button>

                <a
                  href={project.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="open-tab-btn"
                  title="Abrir aplicación web en una pestaña nueva"
                >
                  <span className="btn-text-full">Abrir en Pestaña Nueva</span>
                  <span className="btn-text-short">Abrir</span>
                  <ExternalLinkIcon size={14} />
                </a>

                <button
                  type="button"
                  className="close-btn"
                  onClick={onClose}
                  aria-label="Cerrar vista previa"
                >
                  <CloseIcon size={20} />
                </button>
              </div>
            </header>

            {/* Alerta de conexión lenta si el servidor remoto demora */}
            {isSlowWarning && !isCurrentLoaded && (
              <div className="slow-connection-banner">
                <span className="slow-icon">⚠️</span>
                <span>
                  El servidor de la aplicación está respondiendo con lentitud. Puedes abrirla directamente para acelerar:
                </span>
                <a
                  href={project.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="slow-banner-link"
                >
                  Abrir directo &rarr;
                </a>
              </div>
            )}

            {/* Barra de progreso de carga */}
            {!isCurrentLoaded && (
              <div className="preview-progress-bar">
                <div className="preview-progress-indeterminate" />
              </div>
            )}
          </>
        )}

        {/* Cuerpo del modal con soporte para múltiples dispositivos y poster instantáneo */}
        <div className="project-modal-body">
          <div className={`project-viewport-stage device-${deviceMode}`}>
            {project && (
              <div className="project-frame-wrapper">
                {/* 1. Vista previa instantánea (Poster) en 0 milisegundos */}
                <div
                  className={`instant-poster-layer ${isCurrentLoaded ? 'fade-out' : 'visible'}`}
                  aria-hidden={isCurrentLoaded}
                >
                  <div
                    className="instant-poster-bg"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  <img
                    src={project.imageUrl}
                    alt={`Captura de ${project.title}`}
                    className="instant-poster-img"
                  />
                  {!isCurrentLoaded && (
                    <div className="instant-poster-loader-card">
                      <div className="pulse-spinner" />
                      <div className="loader-card-text">
                        <strong>Cargando vista interactiva...</strong>
                        <p>Conectando con {new URL(project.appUrl).hostname}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Capa interactiva de iframes con caché persistente (nunca se destruyen al cerrar) */}
                {displayProjects.map((p) => {
                  const isCurrent = project.id === p.id
                  const refreshKey = refreshCounters[p.id] || 0
                  const isLoaded = loadedFrames[p.id]

                  return (
                    <iframe
                      key={`${p.id}-${refreshKey}`}
                      src={p.appUrl}
                      className={`project-live-frame ${isCurrent ? 'active' : 'hidden'} ${
                        isLoaded ? 'loaded' : 'loading'
                      }`}
                      title={`Vista previa en vivo de ${p.title}`}
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                      loading="eager"
                      onLoad={() => handleFrameLoaded(p.id)}
                      style={{
                        display: isCurrent ? 'block' : 'none',
                        opacity: isCurrent && isLoaded ? 1 : 0
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
