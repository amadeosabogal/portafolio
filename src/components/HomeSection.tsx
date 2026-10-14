import React from 'react'
import type { ProfileData } from '../types'

interface HomeSectionProps {
  profile: ProfileData
  onNavigate: (section: string) => void
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  profile,
  onNavigate
}) => {
  return (
    <section className="section screen-home" id="home">
      {/* Background Workstation Image with smooth white gradient mask */}
      <div className="home-bg-wrapper">
        <img
          src="/hero-bg.jpg"
          alt="WODITEK Workstation"
          className="home-bg-image"
          loading="eager"
        />
        <div className="home-bg-overlay" />
      </div>

      <div className="home-content">
        <div className="home-hero-text">
          <div className="hero-badge-pill">
            <span className="hero-badge-dot" />
            <span>Soluciones Digitales &amp; Software</span>
          </div>

          <h1 className="hero-brand-title">
            {profile.brandName || 'WODITEK'}
          </h1>

          <p className="hero-tagline">
            {profile.tagline ||
              'Desarrollo de software a medida, aplicaciones web escalables y soluciones digitales de alto impacto para potenciar tu negocio.'}
          </p>

          <div className="hero-cta-buttons">
            <button
              type="button"
              className="action-btn-sharp primary"
              onClick={() => onNavigate('portfolio')}
            >
              Explorar Portafolio
            </button>
            <button
              type="button"
              className="action-btn-sharp outline"
              onClick={() => onNavigate('about')}
            >
              Sobre Nosotros
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
