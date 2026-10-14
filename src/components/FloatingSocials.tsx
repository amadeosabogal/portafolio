import React from 'react'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './Icons'

interface FloatingSocialsProps {
  socialLinks: {
    instagram: string
    tiktok: string
    whatsapp: string
  }
  hidden?: boolean
}

export const FloatingSocials: React.FC<FloatingSocialsProps> = ({
  socialLinks,
  hidden = false
}) => {
  if (hidden) return null

  return (
    <aside
      className={`floating-socials-dock ${hidden ? 'hidden' : ''}`}
      aria-label="Redes sociales de contacto"
    >
      <a
        href={socialLinks?.whatsapp || 'https://wa.me/51953095173'}
        target="_blank"
        rel="noreferrer"
        className="floating-social-btn whatsapp-btn"
        title="WhatsApp (953 095 173)"
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon size={22} />
      </a>
      <a
        href={socialLinks?.instagram || 'https://www.instagram.com/woditek.pe/'}
        target="_blank"
        rel="noreferrer"
        className="floating-social-btn instagram-btn"
        title="Instagram @woditek.pe"
        aria-label="Visitar perfil de Instagram"
      >
        <InstagramIcon size={21} />
      </a>
      <a
        href={socialLinks?.tiktok || 'https://www.tiktok.com/@woditek'}
        target="_blank"
        rel="noreferrer"
        className="floating-social-btn tiktok-btn"
        title="TikTok @woditek"
        aria-label="Visitar canal de TikTok"
      >
        <TikTokIcon size={21} />
      </a>
    </aside>
  )
}
