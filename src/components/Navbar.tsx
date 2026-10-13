import React from 'react'
import { PhoneIcon } from './Icons'

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
  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Nosotros' },
    { id: 'portfolio', label: 'Portafolio' }
  ]

  return (
    <header className="site-header">
      <nav className="site-nav">
        <ul className="nav-list">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSection(item.id)}
                >
                  {item.label}
                  {isActive && <span className="nav-indicator" />}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="nav-right">
          <a
            href="https://wa.me/51953095173"
            target="_blank"
            rel="noreferrer"
            className="nav-phone"
            title={`Contactar al WhatsApp: ${phone}`}
          >
            <PhoneIcon size={14} className="phone-icon" />
            <span>{phone}</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
