// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// IMPORTANTE: cambia `site` por el dominio real cuando lo tengas.
// Se usa para URLs canónicas y para generar el sitemap.
export default defineConfig({
  site: 'https://TU-DOMINIO.es',
  trailingSlash: 'always',
  integrations: [
    icon(),
    sitemap(),
  ],
  build: {
    format: 'directory',
  },
});
