import type { ProfileData, Project } from '../types'

export const DEFAULT_PROFILE: ProfileData = {
  brandName: 'WODITEK',
  tagline: 'Desarrollo de software a medida, aplicaciones web escalables y soluciones digitales de alto impacto para potenciar tu negocio.',
  phone: '953 095 173',
  email: 'soporte@woditek.com',
  locationLine1: 'Lima, Perú',
  locationLine2: 'Soluciones Digitales & Software',
  aboutBio:
    'En WODITEK nos especializamos en el diseño y desarrollo de soluciones tecnológicas de alto impacto. Creamos software a medida, aplicaciones web escalables e interfaces modernas que potencian la presencia digital y operatividad de empresas y emprendimientos.',
  socialLinks: {
    instagram: 'https://www.instagram.com/woditek.pe/',
    tiktok: 'https://www.tiktok.com/@woditek',
    whatsapp: 'https://wa.me/51953095173'
  }
}

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Licorería Online',
    category: 'E-Commerce',
    imageUrl: '/licoreria.jpg',
    appUrl: 'https://licoreria.woditek.com',
    description: 'Tienda virtual moderna con catálogo de licores, bebidas premium, carrito de compras y pedidos para delivery.',
    tags: ['E-Commerce', 'Licores', 'Delivery']
  },
  {
    id: '2',
    title: 'Agencia de Viajes',
    category: 'Turismo',
    imageUrl: '/agenciaViajes.jpg',
    appUrl: 'https://agenciaviajes.woditek.com',
    description: 'Plataforma para reservas turísticas, paquetes de viaje nacionales e internacionales, tours y cotizaciones en vivo.',
    tags: ['Turismo', 'Reservas', 'Viajes']
  },
  {
    id: '3',
    title: 'Car Wash & Detailing',
    category: 'Servicios Automotrices',
    imageUrl: '/carwash.jpg',
    appUrl: 'https://carwash.woditek.com',
    description: 'Sistema web para agendamiento de citas de lavado, paquetes de detailing vehicular y promociones exclusivas.',
    tags: ['Car Wash', 'Automotriz', 'Citas Online']
  },
  {
    id: '4',
    title: 'Institución Educativa',
    category: 'Educación',
    imageUrl: '/colegio.jpg',
    appUrl: 'https://colegio.woditek.com',
    description: 'Portal institucional escolar con admisión en línea, cronograma académico, aulas virtuales y noticias para la comunidad.',
    tags: ['Educación', 'Colegio', 'Admisión']
  },
  {
    id: '5',
    title: 'Clínica Veterinaria',
    category: 'Salud Animal',
    imageUrl: '/veterianaria.jpg',
    appUrl: 'https://veterinaria.woditek.com',
    description: 'Portal veterinario integral con reserva de consultas médicas, vacunas, servicios estéticos y catálogo de pet shop.',
    tags: ['Veterinaria', 'Mascotas', 'Citas']
  },
  {
    id: '6',
    title: 'Zapatería & Calzado',
    category: 'Moda & Calzado',
    imageUrl: '/zapateria.jpg',
    appUrl: 'https://zapateria.woditek.com',
    description: 'E-commerce interactivo de calzado con filtros avanzados por talla, marca y modelo, con checkout rápido y seguro.',
    tags: ['Calzado', 'Moda', 'Tienda Virtual']
  },
  {
    id: '7',
    title: 'Gimnasio & Fitness',
    category: 'Fitness & Deporte',
    imageUrl: '/gimnasio.jpg',
    appUrl: 'https://gimnasio.woditek.com',
    description: 'Plataforma fitness con planes de membresía, reservas de clases grupales, planes de nutrición y rutinas de entrenamiento.',
    tags: ['Fitness', 'Membresías', 'Salud']
  },
  {
    id: '8',
    title: 'Hotel & Hospedaje',
    category: 'Hotelería',
    imageUrl: '/hotel.jpg',
    appUrl: 'https://hotel.woditek.com',
    description: 'Sitio web hotelero con motor de reservas en tiempo real, galería de habitaciones, amenidades y servicios para huéspedes.',
    tags: ['Hotelería', 'Reservas', 'Hospedaje']
  },
  {
    id: '9',
    title: 'Concesionario de Vehículos',
    category: 'Automotriz',
    imageUrl: '/concesionario.jpg',
    appUrl: 'https://concesionario.woditek.com',
    description: 'Showroom virtual de autos nuevos y seminuevos con cotizador en línea, fichas técnicas descargables y test drive.',
    tags: ['Autos', 'Showroom', 'Cotizador']
  },
  {
    id: '10',
    title: 'Burger & Restaurante',
    category: 'Gastronomía',
    imageUrl: '/burger.jpg',
    appUrl: 'https://burger.woditek.com',
    description: 'Menú digital interactivo para hamburguesería con selección de combos, ingredientes adicionales y pedidos directos a cocina.',
    tags: ['Gastronomía', 'Hamburguesas', 'Delivery']
  },
  {
    id: '11',
    title: 'Clínica Odontológica',
    category: 'Salud Dental',
    imageUrl: '/dentista.jpg',
    appUrl: 'https://dentista.woditek.com',
    description: 'Centro odontológico digital con agenda de citas en línea, detalle de tratamientos, ortodoncia e implantes dentales.',
    tags: ['Odontología', 'Salud', 'Citas Médicas']
  },
  {
    id: '12',
    title: 'Centro Óptico',
    category: 'Salud Visual',
    imageUrl: '/optica.jpg',
    appUrl: 'https://optica.woditek.com',
    description: 'Catálogo de monturas y lentes de sol, probador visual, asesoría óptica y reserva de exámenes de la vista.',
    tags: ['Óptica', 'Lentes', 'Salud Visual']
  }
]
