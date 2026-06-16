/**
 * ZONAS DE SERVICIO
 * -----------------
 * Cada zona genera una página /zonas/[slug]/ (SEO local) y entra en la matriz
 * servicio × zona. Las ciudades son el primer nivel; los barrios cuelgan de Fuengirola.
 *
 * Amplía esta lista para crecer en SEO local (p. ej. Benalmádena, Torremolinos…).
 */

export interface Zona {
  slug: string;
  nombre: string;
  tipo: 'ciudad' | 'barrio';
  /** Para barrios: ciudad a la que pertenecen */
  ciudad: string;
  /** Frase contextual para la página de la zona */
  intro: string;
  /** Tiempo de llegada habitual desde Fuengirola centro (minutos) */
  eta: { min: number; max: number };
  /** Query para el enlace de Google Maps Directions desde Fuengirola */
  mapsDesde: string;
}

export const zonas: Zona[] = [
  // --- Ciudades principales ---
  {
    slug: 'fuengirola',
    nombre: 'Fuengirola',
    tipo: 'ciudad',
    ciudad: 'Fuengirola',
    intro:
      'Damos servicio de desatascos en todo Fuengirola, de Los Boliches al centro, con salida inmediata para urgencias.',
    eta: { min: 5, max: 15 },
    mapsDesde: 'Fuengirola,+M%C3%A1laga/Fuengirola,+M%C3%A1laga',
  },
  {
    slug: 'mijas',
    nombre: 'Mijas',
    tipo: 'ciudad',
    ciudad: 'Mijas',
    intro:
      'Desatascos en Mijas pueblo, Las Lagunas y La Cala, para viviendas, comunidades y locales.',
    eta: { min: 18, max: 28 },
    mapsDesde: 'Fuengirola,+M%C3%A1laga/Mijas,+M%C3%A1laga',
  },
  {
    slug: 'marbella',
    nombre: 'Marbella',
    tipo: 'ciudad',
    ciudad: 'Marbella',
    intro:
      'Servicio de desatascos y limpieza de canalizaciones en Marbella y San Pedro, urgencias 24 horas.',
    eta: { min: 25, max: 40 },
    mapsDesde: 'Fuengirola,+M%C3%A1laga/Marbella,+M%C3%A1laga',
  },

  // --- Barrios de Fuengirola ---
  {
    slug: 'fuengirola-centro',
    nombre: 'Fuengirola Centro',
    tipo: 'barrio',
    ciudad: 'Fuengirola',
    intro: 'Atascos y desatoros en el centro de Fuengirola con llegada rápida.',
    eta: { min: 3, max: 10 },
    mapsDesde: 'Fuengirola,+M%C3%A1laga/Centro+Fuengirola,+M%C3%A1laga',
  },
  {
    slug: 'los-pacos',
    nombre: 'Los Pacos',
    tipo: 'barrio',
    ciudad: 'Fuengirola',
    intro: 'Desatascos en la zona de Los Pacos, Fuengirola.',
    eta: { min: 8, max: 15 },
    mapsDesde: 'Fuengirola,+M%C3%A1laga/Los+Pacos,+Fuengirola,+M%C3%A1laga',
  },
  {
    slug: 'el-cerezo',
    nombre: 'El Cerezo',
    tipo: 'barrio',
    ciudad: 'Fuengirola',
    intro: 'Desatascos en El Cerezo, Fuengirola.',
    eta: { min: 10, max: 18 },
    mapsDesde: 'Fuengirola,+M%C3%A1laga/El+Cerezo,+Fuengirola,+M%C3%A1laga',
  },
  {
    slug: 'montemar',
    nombre: 'Montemar',
    tipo: 'barrio',
    ciudad: 'Fuengirola',
    intro: 'Desatascos en Montemar, Fuengirola.',
    eta: { min: 8, max: 14 },
    mapsDesde: 'Fuengirola,+M%C3%A1laga/Montemar,+Fuengirola,+M%C3%A1laga',
  },
  {
    slug: 'las-lagunas',
    nombre: 'Las Lagunas',
    tipo: 'barrio',
    ciudad: 'Mijas',
    intro: 'Desatascos en Las Lagunas de Mijas, junto a Fuengirola.',
    eta: { min: 12, max: 20 },
    mapsDesde: 'Fuengirola,+M%C3%A1laga/Las+Lagunas,+Mijas,+M%C3%A1laga',
  },
];

export const ciudades = zonas.filter((z) => z.tipo === 'ciudad');
export const barrios = zonas.filter((z) => z.tipo === 'barrio');

export function getZona(slug: string): Zona | undefined {
  return zonas.find((z) => z.slug === slug);
}
