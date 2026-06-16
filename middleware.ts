import { next } from '@vercel/edge';

/**
 * Protección por contraseña (HTTP Basic Auth) para el deploy de PRUEBAS en Vercel.
 * Funciona en el plan gratuito (Hobby) y protege también la producción.
 *
 * Cómo funciona:
 *  - Si la variable de entorno PREVIEW_PASSWORD está definida en Vercel, TODA la web
 *    pide usuario/contraseña → ni se ve ni se puede indexar (devuelve 401 a los bots).
 *  - Si PREVIEW_PASSWORD NO está definida (producción), la web es pública.
 *
 * Configurar en Vercel → Settings → Environment Variables:
 *   PREVIEW_USER      (opcional, p. ej. "cliente")
 *   PREVIEW_PASSWORD  (obligatoria para activar el bloqueo)
 *
 * Para PRODUCCIÓN: borra esas variables y vuelve a desplegar.
 *
 * Nota: esto solo actúa en Vercel. En local (`npm run dev`) la web sigue visible.
 */

export const config = {
  // Protege todas las rutas (incluidos assets, para que no se vea nada).
  matcher: '/:path*',
};

export default function middleware(req: Request) {
  const expectedUser = process.env.PREVIEW_USER;
  const expectedPass = process.env.PREVIEW_PASSWORD;

  // Sin contraseña configurada => web pública (producción).
  if (!expectedPass) return next();

  const header = req.headers.get('authorization');
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
}
