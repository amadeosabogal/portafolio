import React from 'react'
import type { ProfileData } from '../types'

interface AboutSectionProps {
  profile: ProfileData
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section className="section screen-about" id="about">
      {/* Background Architectural Office Image with White Vignette Mask */}
      <div className="about-portrait-wrapper">
        <img
          src="/pexels-ruining-song-3594016-29422663.jpg"
          alt="Oficina y Espacio WODITEK"
          className="about-portrait-image"
        />
        <div className="about-portrait-gradient" />
      </div>

      <div className="about-content">
        <div className="about-text-container">
          <div className="section-title-wrap">
            <h2 className="section-title">Nosotros</h2>
            <div className="title-underline" />
          </div>

          <a href={`mailto:${profile.email}`} className="about-email">
            {profile.email}
          </a>

          <p className="about-bio">
            {profile.aboutBio}
          </p>

          <div className="about-location-box">
            <div className="location-line-decor left" />
            <div className="location-text-group">
              <span className="location-city">{profile.locationLine1}</span>
              <span className="location-address">{profile.locationLine2}</span>
            </div>
            <div className="location-line-decor right" />
          </div>
        </div>
      </div>
    </section>
  )
}
