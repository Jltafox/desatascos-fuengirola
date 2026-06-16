# Changelog

Historial de iteraciones. Anotamos aquí cada cambio relevante para tener contexto a
futuro. Formato libre pero conciso: fecha + qué + por qué.

El _porqué_ de las decisiones de fondo está en [docs/DECISIONES.md](docs/DECISIONES.md).

---

## 2026-06-16

### Imágenes integradas (lote básico)
- 4 imágenes nuevas generadas con `gpt-image-1` y optimizadas a WebP (~95 KB c/u):
  `desatascos-tuberias`, `limpieza-arquetas-pozos`, `desatoros-urgentes-24h`, `equipo`.
- Cada página de servicio usa su imagen por **convención de slug**:
  `[servicio].astro` aplica `background-image: url(/img/${slug}.webp)` con gradiente
  oscuro encima. Añadir una imagen futura no requiere tocar la plantilla.
- Foto del equipo integrada en la sección "Por qué elegirnos" de la home con caption
  "Sandro y Adrián — al frente del equipo". Materializa el diferenciador del
  benchmark (caras y nombres reales del equipo).
- Verificado en desktop y móvil (preview screenshots).

### Generación de imágenes con IA
- Script `scripts/generate-images.ts` que llama a `gpt-image-1` (OpenAI) y
  optimiza a WebP con `sharp`. Prompts contextualizados en `scripts/image-prompts.ts`.
- Lanzar con `npm run generate:images` (lee `OPENAI_API_KEY` de `.env`).
- Salida en `public/img/<id>.webp` (subido a git, ~150 KB cada uno).
- PNG originales en `public/img/<id>-original.png` excluidos de git por peso.
- Primera imagen prevista: `hero` (1536×1024 high, ~0.17 USD).
- Decisión documentada: las imágenes SÍ se versionan en git para deploys atómicos
  con Vercel (volumen previsto <10 MB; sin sobrecoste de CDN externo).

### Documentación
- Añadidos `README.md`, `docs/DECISIONES.md`, `docs/PLANTILLA-NUEVA-WEB.md` y este
  `CHANGELOG.md` para poder replicar webs similares con todo el contexto.
- `README.txt` de la landing original movido a `_legacy/`.

### Protección por contraseña (deploy de pruebas)
- La web pasa a **SSR** (`@astrojs/vercel`, `output: 'server'`) + `src/middleware.ts`
  con HTTP Basic Auth (activado por `PREVIEW_PASSWORD`).
- Motivo y alternativas descartadas (robots, Vercel Authentication, edge middleware):
  ver [DECISIONES §6](docs/DECISIONES.md).
- Rutas dinámicas servicio/zona convertidas a render bajo demanda (sin `getStaticPaths`).
- Verificado en local: 401 sin credenciales, 200 con credenciales correctas.

### Indexación
- Noindex por defecto; indexable con `PUBLIC_INDEXABLE=true` (`src/consts.ts`).
- `<meta robots>` global en `Base.astro` + `robots.txt` dinámico.

### Migración a Astro
- Reescritura de la landing estática (`_legacy/index.html`) a proyecto Astro
  dirigido por datos (`src/data/`), con matriz servicio × zona, schema y sitemap.
- Subida a GitHub y proyecto creado en Vercel.

---

## Cómo añadir una entrada

Al cerrar un cambio relevante, añade arriba una entrada con la fecha, qué cambió y
(si aplica) el porqué o un enlace a `docs/DECISIONES.md`.
