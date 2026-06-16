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
  },
  {
    slug: 'mijas',
    nombre: 'Mijas',
    tipo: 'ciudad',
    ciudad: 'Mijas',
    intro:
      'Desatascos en Mijas pueblo, Las Lagunas y La Cala, para viviendas, comunidades y locales.',
  },
  {
    slug: 'marbella',
    nombre: 'Marbella',
    tipo: 'ciudad',
    ciudad: 'Marbella',
    intro:
      'Servicio de desatascos y limpieza de canalizaciones en Marbella y San Pedro, urgencias 24 horas.',
  },

  // --- Barrios de Fuengirola ---
  {
    slug: 'fuengirola-centro',
    nombre: 'Fuengirola Centro',
    tipo: 'barrio',
    ciudad: 'Fuengirola',
    intro: 'Atascos y desatoros en el centro de Fuengirola con llegada rápida.',
  },
  {
    slug: 'los-pacos',
    nombre: 'Los Pacos',
    tipo: 'barrio',
    ciudad: 'Fuengirola',
    intro: 'Desatascos en la zona de Los Pacos, Fuengirola.',
  },
  {
    slug: 'el-cerezo',
    nombre: 'El Cerezo',
    tipo: 'barrio',
    ciudad: 'Fuengirola',
    intro: 'Desatascos en El Cerezo, Fuengirola.',
  },
  {
    slug: 'montemar',
    nombre: 'Montemar',
    tipo: 'barrio',
    ciudad: 'Fuengirola',
    intro: 'Desatascos en Montemar, Fuengirola.',
  },
  {
    slug: 'las-lagunas',
    nombre: 'Las Lagunas',
    tipo: 'barrio',
    ciudad: 'Mijas',
    intro: 'Desatascos en Las Lagunas de Mijas, junto a Fuengirola.',
  },
];

export const ciudades = zonas.filter((z) => z.tipo === 'ciudad');
export const barrios = zonas.filter((z) => z.tipo === 'barrio');

export function getZona(slug: string): Zona | undefined {
  return zonas.find((z) => z.slug === slug);
}
