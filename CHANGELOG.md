# Changelog

Historial de iteraciones. Anotamos aquí cada cambio relevante para tener contexto a
futuro. Formato libre pero conciso: fecha + qué + por qué.

El _porqué_ de las decisiones de fondo está en [docs/DECISIONES.md](docs/DECISIONES.md).

---

## 2026-06-16

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
