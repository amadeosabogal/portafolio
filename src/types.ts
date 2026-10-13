export interface Project {
  id: string
  title: string
  category: string
  imageUrl: string
  appUrl: string
  description?: string
  tags?: string[]
}

export interface ProfileData {
  brandName: string
  tagline?: string
  phone: string
  email: string
  locationLine1: string
  locationLine2: string
  aboutBio: string
  socialLinks: {
    instagram: string
    tiktok: string
    whatsapp: string
  }
}
