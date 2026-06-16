// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

// IMPORTANTE: cambia `site` por el dominio real cuando lo tengas.
// Se usa para URLs canónicas y para generar el sitemap.
export default defineConfig({
  site: 'https://TU-DOMINIO.es',
  trailingSlash: 'always',
  // output:'server': cada petición pasa por la función de render, que ejecuta
  // src/middleware.ts (protección por contraseña en pruebas). Para producción
  // basta quitar la variable PREVIEW_PASSWORD en Vercel (la web pasa a pública).
  output: 'server',
  adapter: vercel(),
  integrations: [
    icon(),
    sitemap(),
  ],
  build: {
    format: 'directory',
  },
});
