/**
 * Configuración global de la web.
 *
 * INDEXABLE controla si Google puede indexar el sitio.
 *  - Por DEFECTO es `false` (noindex) → seguro para el deploy de pruebas en Vercel.
 *  - Para PRODUCCIÓN: define la variable de entorno `PUBLIC_INDEXABLE=true`
 *    en Vercel (Project → Settings → Environment Variables, entorno Production)
 *    y vuelve a desplegar. No hay que tocar código.
 */
export const INDEXABLE = import.meta.env.PUBLIC_INDEXABLE === 'true';
