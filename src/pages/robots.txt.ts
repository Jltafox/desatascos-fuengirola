import type { APIRoute } from 'astro';
import { INDEXABLE } from '../consts';

export const GET: APIRoute = ({ site }) => {
  const sitemap = site ? new URL('sitemap-index.xml', site).href : '';

  const body = INDEXABLE
    ? `User-agent: *\nAllow: /\n${sitemap ? `\nSitemap: ${sitemap}\n` : ''}`
    : `# Deploy de pruebas: bloqueado para buscadores.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
