import React from 'react'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './Icons'

interface FloatingSocialsProps {
  socialLinks: {
    instagram: string
    tiktok: string
    whatsapp: string
  }
}

export const FloatingSocials: React.FC<FloatingSocialsProps> = ({ socialLinks }) => {
  return (
    <aside className="floating-socials-dock" aria-label="Redes sociales">
      <a
        href={socialLinks?.whatsapp || 'https://wa.me/51953095173'}
        target="_blank"
        rel="noreferrer"
        className="floating-social-btn whatsapp-btn"
        title="WhatsApp (953 095 173)"
      >
        <WhatsAppIcon size={22} />
      </a>
      <a
        href={socialLinks?.instagram || 'https://www.instagram.com/woditek.pe/'}
        target="_blank"
        rel="noreferrer"
        className="floating-social-btn instagram-btn"
        title="Instagram @woditek.pe"
      >
        <InstagramIcon size={21} />
      </a>
      <a
        href={socialLinks?.tiktok || 'https://www.tiktok.com/@woditek'}
        target="_blank"
        rel="noreferrer"
        className="floating-social-btn tiktok-btn"
        title="TikTok @woditek"
      >
        <TikTokIcon size={21} />
      </a>
    </aside>
  )
}
