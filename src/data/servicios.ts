/**
 * SERVICIOS
 * ---------
 * Cada servicio genera su propia página en /servicios/[slug]/ y entra en el menú,
 * el footer, el schema Service y la matriz servicio × zona.
 *
 * Los 3 primeros son los que ya ofrecía el sitio original.
 * Los marcados con `confirmar: true` son recomendados por el benchmark
 * (la competencia los tiene): déjalos solo si el negocio realmente los presta.
 */

export interface Servicio {
  slug: string;
  /** Nombre corto para menús/cards */
  nombre: string;
  /** Título largo orientado a SEO (sin la ciudad, se añade dinámicamente) */
  titulo: string;
  /** Icono iconify (set fa6-solid) */
  icono: string;
  /** Resumen de 1 frase para tarjetas */
  resumen: string;
  /** Párrafo de introducción para la página del servicio */
  intro: string;
  /** Puntos clave / qué incluye */
  bullets: string[];
  /** ¿Es un servicio principal (destaca en home)? */
  destacado: boolean;
  /** Recomendado por benchmark, pendiente de confirmar que se ofrece */
  confirmar?: boolean;
}

export const servicios: Servicio[] = [
  {
    slug: 'desatascos-tuberias',
    nombre: 'Desatascos de tuberías',
    titulo: 'Desatascos de tuberías',
    icono: 'fa6-solid:bath',
    resumen:
      'Resolvemos atascos en cañerías de hogares y locales con maquinaria profesional y sin romper.',
    intro:
      'Atascos en fregaderos, lavabos, duchas, inodoros o bajantes. Desatascamos tuberías con equipos de presión y sondas eléctricas, sin obras y sin dañar tus instalaciones.',
    bullets: [
      'Desatasco de WC, fregaderos, lavabos y duchas',
      'Bajantes y tuberías de comunidad',
      'Maquinaria profesional sin romper',
      'Precio cerrado antes de empezar',
    ],
    destacado: true,
  },
  {
    slug: 'limpieza-arquetas-pozos',
    nombre: 'Limpieza de arquetas y pozos',
    titulo: 'Limpieza de arquetas y pozos',
    icono: 'fa6-solid:water',
    resumen:
      'Vaciamos y limpiamos arquetas y pozos ciegos con bombas y vehículos adaptados.',
    intro:
      'Limpieza y vaciado de arquetas, pozos ciegos y registros saturados. Trabajamos con bombas de aspiración y camión cuba para dejar la red de saneamiento operativa.',
    bullets: [
      'Vaciado de pozos ciegos y arquetas',
      'Aspiración con camión cuba',
      'Retirada y gestión de residuos',
      'Solo actuamos donde nos autorizas, sin gasto innecesario',
    ],
    destacado: true,
  },
  {
    slug: 'desatoros-urgentes-24h',
    nombre: 'Desatoros urgentes 24h',
    titulo: 'Desatoros urgentes 24 horas',
    icono: 'fa6-solid:clock',
    resumen:
      'Atendemos emergencias de atascos día y noche, con llegada en menos de una hora.',
    intro:
      'Urgencias de atascos las 24 horas, los 365 días del año. Si tienes una inundación o un atasco que no puede esperar, salimos de inmediato y llegamos en menos de una hora.',
    bullets: [
      'Disponibles 24 h / 365 días',
      'Llegada en menos de 1 hora',
      'Achique de agua por inundación',
      'Sin recargos abusivos por urgencia',
    ],
    destacado: true,
  },
  {
    slug: 'inspeccion-camara-cctv',
    nombre: 'Inspección con cámara CCTV',
    titulo: 'Inspección de tuberías con cámara CCTV',
    icono: 'fa6-solid:video',
    resumen:
      'Localizamos el problema exacto dentro de la tubería con cámara, sin romper.',
    intro:
      'Introducimos una cámara en la conducción para ver el estado real de la tubería, localizar la obstrucción, roturas o raíces, y decidir la solución sin picar a ciegas.',
    bullets: [
      'Diagnóstico preciso del atasco o avería',
      'Localización de roturas y raíces',
      'Informe del estado de la red',
      'Evita obras innecesarias',
    ],
    destacado: false,
    confirmar: true,
  },
  {
    slug: 'fosas-septicas',
    nombre: 'Fosas sépticas',
    titulo: 'Vaciado y limpieza de fosas sépticas',
    icono: 'fa6-solid:droplet',
    resumen:
      'Vaciado, limpieza y mantenimiento de fosas sépticas con camión cuba.',
    intro:
      'Vaciado y limpieza de fosas sépticas y depuradoras con camión cuba, con retirada y gestión autorizada de residuos.',
    bullets: [
      'Vaciado con camión cuba',
      'Limpieza y mantenimiento preventivo',
      'Gestión autorizada de residuos',
      'Para viviendas, comunidades y negocios',
    ],
    destacado: false,
    confirmar: true,
  },
];

export const serviciosDestacados = servicios.filter((s) => s.destacado);

export function getServicio(slug: string): Servicio | undefined {
  return servicios.find((s) => s.slug === slug);
}
