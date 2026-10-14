import React, { useState, useEffect } from 'react'
import {
  MenuIcon,
  CloseIcon,
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  WhatsAppIcon
} from './Icons'

interface NavbarProps {
  activeSection: string
  onSelectSection: (section: string) => void
  phone: string
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  phone
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  const navItems = [
    { id: 'home', label: 'Inicio', icon: HomeIcon },
    { id: 'about', label: 'Nosotros', icon: UsersIcon },
    { id: 'portfolio', label: 'Portafolio', icon: BriefcaseIcon }
  ]

  // Cerrar menú móvil al cambiar tamaño de pantalla si se agranda
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // Cerrar menú móvil con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  const handleItemClick = (id: string) => {
    onSelectSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegación principal">
        {/* Logotipo / Marca WODITEK */}
        <div className="nav-brand">
          <button
            type="button"
            className="brand-logo-btn"
            onClick={() => handleItemClick('home')}
            aria-label="Ir al inicio WODITEK"
          >
            <span className="brand-text">WODITEK</span>
            <span className="brand-dot" />
          </button>
        </div>

        {/* Enlaces de escritorio */}
        <ul className="nav-list desktop-only">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.label}
                  {isActive && <span className="nav-indicator" />}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Acciones del lado derecho (Teléfono escritorio + Botón móvil) */}
        <div className="nav-right">
          <a
            href="https://wa.me/51953095173"
            target="_blank"
            rel="noreferrer"
            className="nav-phone desktop-only"
            title={`Contactar al WhatsApp: ${phone}`}
          >
            <WhatsAppIcon size={16} className="phone-icon" />
            <span>{phone}</span>
          </a>

          {/* Botón rápido de WhatsApp para móviles */}
          <a
            href="https://wa.me/51953095173"
            target="_blank"
            rel="noreferrer"
            className="mobile-quick-wa mobile-only"
            title="Escribir por WhatsApp"
            aria-label="Escribir por WhatsApp"
          >
            <WhatsAppIcon size={18} />
          </a>

          {/* Botón Hamburguesa para móviles */}
          <button
            type="button"
            className="mobile-menu-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </nav>

      {/* Menú desplegable para dispositivos móviles */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-nav-panel">
          <div className="mobile-nav-header">
            <span className="mobile-menu-title">Navegación</span>
            <span className="mobile-brand-badge">WODITEK</span>
          </div>

          <ul className="mobile-nav-links">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              const IconComponent = item.icon
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`mobile-nav-link-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <div className="mobile-nav-item-content">
                      <IconComponent size={20} className="mobile-nav-icon" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <span className="mobile-active-dot" />}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mobile-nav-footer">
            <a
              href="https://wa.me/51953095173"
              target="_blank"
              rel="noreferrer"
              className="mobile-wa-banner-btn"
            >
              <WhatsAppIcon size={20} />
              <div className="mobile-wa-info">
                <span className="wa-title">Contactar por WhatsApp</span>
                <span className="wa-number">{phone}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
