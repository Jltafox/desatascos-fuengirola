# Desatascos Fuengirola

Web de **captación de leads (local SEO)** para un negocio de desatascos en Fuengirola
(Málaga). Construida como plantilla **reutilizable** para levantar webs similares de
otros oficios/ciudades cambiando solo los datos.

- **Marca:** Ecilimp _(pendiente de confirmar)_
- **Repo:** https://github.com/Jltafox/desatascos-fuengirola
- **Hosting:** Vercel — https://vercel.com/jltafoxs-projects/desatascos-fuengirola

> 📚 Documentación ampliada en [`/docs`](docs):
> - [Decisiones de arquitectura y su porqué](docs/DECISIONES.md) ← **léelo antes de tocar nada**
> - [Plantilla: cómo crear una web nueva similar](docs/PLANTILLA-NUEVA-WEB.md)
> - [CHANGELOG](CHANGELOG.md) — historial de iteraciones

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Astro 5](https://astro.build) (`output: 'server'` para la protección por contraseña) |
| Lenguaje | TypeScript |
| Hosting | Vercel (adaptador `@astrojs/vercel`) |
| Estilos | CSS plano + design tokens (`src/styles/tokens.css`) |
| Iconos | `astro-icon` (Font Awesome 6, SVG inline) |
| Fuentes | `@fontsource/roboto` (auto-alojadas) |
| SEO | JSON-LD (LocalBusiness, Service, FAQPage, Breadcrumb), sitemap, canónicas, OG |

## Requisitos

- Node.js 20+ (probado con v24)
- npm

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:4321
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Compila a `.vercel/output/` |
| `npm run preview` | Previsualiza el build |

## La idea clave: datos como fuente de verdad

**No se edita el contenido en las plantillas, se edita en `src/data/`.** De ahí se
generan páginas, menús, footer y los datos estructurados (schema).

```
src/data/
├─ negocio.ts     → nombre, teléfono, WhatsApp, email, zonas, NAP, valoración…
├─ servicios.ts   → cada servicio = una página /servicios/[slug]/
├─ zonas.ts       → cada zona = una página /zonas/[slug]/
├─ faqs.ts        → preguntas frecuentes (+ schema FAQPage)
└─ resenas.ts     → reseñas reales (filtradas)
```

## Estructura del proyecto

```
src/
├─ data/                  ← FUENTE DE VERDAD (ver arriba)
├─ consts.ts              ← flag INDEXABLE (indexación)
├─ middleware.ts          ← Basic Auth (protección por contraseña en pruebas)
├─ layouts/Base.astro     ← <head>, SEO, canónica, OG, schema, navbar, footer
├─ components/
│  ├─ Navbar · Footer · FloatingPhone
│  ├─ seo/ LocalBusinessSchema · Breadcrumb
│  └─ sections/ Faqs · CtaBanner
├─ pages/
│  ├─ index.astro
│  ├─ servicios/[servicio].astro   ← matriz de servicios
│  ├─ zonas/[zona].astro           ← matriz de zonas (SEO local)
│  ├─ robots.txt.ts                ← robots dinámico (según INDEXABLE)
│  ├─ 404.astro · aviso-legal · politica-privacidad · politica-cookies
└─ styles/tokens.css      ← design tokens (cambia la marca aquí)
public/                   ← favicon, imágenes, og
_legacy/                  ← landing estática original (referencia)
```

## Variables de entorno (en Vercel)

| Variable | Para qué | Pruebas | Producción |
|---|---|---|---|
| `PREVIEW_PASSWORD` | Activa la protección por contraseña (Basic Auth) | _definida_ | **borrar** |
| `PREVIEW_USER` | Usuario para la contraseña (opcional) | p. ej. `cliente` | — |
| `PUBLIC_INDEXABLE` | `true` permite indexar en Google | _sin definir_ (= noindex) | `true` |

Ver el detalle del porqué en [docs/DECISIONES.md](docs/DECISIONES.md).

## Pasar a producción (checklist)

1. Quitar `PREVIEW_PASSWORD` (y `PREVIEW_USER`) en Vercel → web pública.
2. Poner `PUBLIC_INDEXABLE=true` en Vercel (entorno Production).
3. Poner el dominio real en `astro.config.mjs` (`site`).
4. Rellenar los `TODO` de datos reales en `src/data/negocio.ts`.
5. Redeploy.
