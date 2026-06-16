import { defineMiddleware } from 'astro:middleware';

/**
 * Protección por contraseña (HTTP Basic Auth) para el deploy de PRUEBAS.
 * Se compila como Vercel Edge Middleware (adapter @astrojs/vercel con
 * edgeMiddleware: true) y se ejecuta ANTES de servir cualquier página,
 * incluidas las estáticas → protege toda la web. Gratis en plan Hobby.
 *
 * Activación: define PREVIEW_PASSWORD (y opcional PREVIEW_USER) en Vercel.
 * Sin PREVIEW_PASSWORD => web pública (producción).
 *
 * El middleware de Astro también corre en `npm run dev`, así que se puede
 * probar en local:  PREVIEW_PASSWORD=secreto npm run dev
 */
export const onRequest = defineMiddleware((context, next) => {
  const expectedPass =
    process.env.PREVIEW_PASSWORD ?? import.meta.env.PREVIEW_PASSWORD;
  const expectedUser =
    process.env.PREVIEW_USER ?? import.meta.env.PREVIEW_USER;

  // Sin contraseña configurada => web pública.
  if (!expectedPass) return next();

  const header = context.request.headers.get('authorization');
  if (header) {
    const [scheme, encoded] = header.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const sep = decoded.indexOf(':');
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      const userOk = !expectedUser || user === expectedUser;
      if (userOk && pass === expectedPass) {
        return next();
      }
    }
  }

  return new Response('Acceso restringido — web en pruebas', {
    status: 401,
    headers: {
      'WWW-Authenticate':
        'Basic realm="Desatascos Fuengirola (privado)", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
});
