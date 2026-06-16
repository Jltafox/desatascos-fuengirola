/**
 * FUENTE DE VERDAD DEL NEGOCIO
 * ----------------------------
 * Cambia aquí los datos y se actualizan en TODA la web (páginas, menús, footer y schema).
 * Los campos marcados con `TODO` son datos reales que NO debo inventar: complétalos tú.
 */

export interface Telefono {
  /** Cómo se muestra al usuario, p. ej. "951 23 45 67" */
  display: string;
  /** Versión para href="tel:" sin espacios, p. ej. "951234567" */
  tel: string;
}

export interface Whatsapp {
  /** Número en formato internacional E.164 SIN '+', p. ej. "34611223344" */
  e164: string;
  /** Cómo se muestra, p. ej. "611 22 33 44" */
  display: string;
  /** Mensaje prerrellenado al abrir el chat */
  mensaje: string;
}

export interface Direccion {
  calle: string;
  cp: string;
  localidad: string;
  provincia: string;
  pais: string; // código ISO, p. ej. "ES"
}

export const negocio = {
  // --- Identidad ---
  // Marca real probable según reseñas de Google. TODO: confirmar razón social/marca.
  nombre: 'Ecilimp',
  nombreLargo:
    'Desatascos, Desatoros y Limpieza de Canalizaciones',
  claim: 'Desatascos urgentes en Fuengirola 24h',
  descripcion:
    'Empresa de desatascos, desatoros y limpieza de canalizaciones en Fuengirola, Mijas y Marbella. Servicio 24h, llegamos en menos de 1 hora y trabajamos con precio cerrado, sin sorpresas.',

  // --- Contacto ---
  // TODO: el 900 es gratuito tipo call-center y resta confianza local.
  // Lo ideal es un móvil local (6XX) o fijo de Málaga (951/952).
  telefono: { display: '900 922 713', tel: '900922713' } as Telefono,

  // TODO: el WhatsApp del sitio original estaba ROTO (un 900 no es móvil válido).
  // Pon el móvil real de WhatsApp en formato E.164 sin '+'.
  whatsapp: {
    e164: '34000000000', // TODO: número real
    display: '900 922 713', // TODO: display real
    mensaje: 'Hola, tengo un atasco en Fuengirola y necesito ayuda urgente.',
  } as Whatsapp,

  email: '', // TODO: email real (el original estaba vacío)

  // --- Localización ---
  ciudadPrincipal: 'Fuengirola',
  provincia: 'Málaga',
  comunidad: 'Andalucía',
  pais: 'España',
  // Zonas en las que opera (se usan para textos y schema areaServed)
  zonasServicio: ['Fuengirola', 'Mijas', 'Marbella'] as string[],

  // TODO: dirección física real. Sin NAP no hay buen SEO local ni ficha coherente.
  direccion: {
    calle: '',
    cp: '',
    localidad: 'Fuengirola',
    provincia: 'Málaga',
    pais: 'ES',
  } as Direccion,

  // TODO: coordenadas reales (las del Google Business Profile)
  geo: { lat: 0, lng: 0 },

  // --- Operativa / confianza ---
  horario: '24 horas · 365 días',
  abierto24h: true,
  tiempoLlegada: 'menos de 1 hora',
  // El sitio original mezclaba "15+ años" (hero) y "más de 10 años" (FAQ).
  // TODO: confirmar la cifra correcta.
  experienciaAnios: 10,
  precioCerrado: true,
  garantia: true,

  // Valoración. NO inventar el total: solo se mostrará/marcará si es real.
  valoracion: {
    media: 4.8, // del hero original
    total: null as number | null, // TODO: nº real de reseñas (si no, no se usa AggregateRating)
  },

  // Técnicos con nombre = diferenciador de confianza (ningún competidor lo explota).
  equipo: ['Sandro', 'Adrián'] as string[],

  // --- Redes y legal ---
  redes: {
    google: '', // TODO: URL ficha Google
    facebook: '',
    instagram: '',
  },
  legal: {
    razonSocial: '', // TODO
    nif: '', // TODO
  },
} as const;

// --- Helpers derivados (no editar) ---
export const telHref = `tel:${negocio.telefono.tel}`;
export const whatsappHref = `https://wa.me/${negocio.whatsapp.e164}?text=${encodeURIComponent(
  negocio.whatsapp.mensaje,
)}`;
export const emailHref = negocio.email ? `mailto:${negocio.email}` : '';

/** Lista legible de zonas, p. ej. "Fuengirola, Mijas y Marbella" */
export const zonasTexto = (() => {
  const z = negocio.zonasServicio;
  if (z.length <= 1) return z[0] ?? '';
  return `${z.slice(0, -1).join(', ')} y ${z[z.length - 1]}`;
})();
