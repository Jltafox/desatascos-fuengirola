# Decisiones de arquitectura (y su porqué)

Registro de decisiones. El objetivo es que cualquiera (o nosotros dentro de 6 meses)
entienda **por qué** está montado así y no repita callejones sin salida.

Formato: cada decisión lleva **Contexto → Decisión → Por qué → Alternativas descartadas**.

---

## 1. Framework: Astro

- **Decisión:** Astro 5.
- **Por qué:** la web es local-SEO con muchas páginas casi iguales (matriz
  servicio × zona). Astro genera HTML rápido, tiene rutas dinámicas y enfocadas a
  contenido, y permite inyectar JSON-LD por página con cero esfuerzo.
- **Alternativas descartadas:**
  - *WordPress*: sería mejor si el cliente final editara contenido sin código, pero
    lo mantenemos nosotros → pesa de más (PHP, BD, seguridad).
  - *Next.js*: sobredimensionado para una web de captación.
  - *HTML estático ampliado*: la matriz servicio × zona se vuelve inmantenible.

## 2. Contenido dirigido por datos (`src/data/`)

- **Decisión:** todo el contenido vive en `src/data/*.ts`, no en las plantillas.
- **Por qué:** es lo que hace la web **replicable**. Para una web nueva de otro oficio
  o ciudad, se cambian los datos y listo (ver [PLANTILLA-NUEVA-WEB.md](PLANTILLA-NUEVA-WEB.md)).

## 3. Estilos: CSS + design tokens (sin Tailwind)

- **Decisión:** reutilizar los design tokens de la landing original en `tokens.css`.
- **Por qué:** ya había un diseño válido; reaprovecharlo es más rápido y la marca se
  cambia en un sitio (`:root`).

## 4. SEO técnico desde el día 1

- **Decisión:** JSON-LD (LocalBusiness/Plumber, Service, FAQPage, BreadcrumbList),
  sitemap, canónicas, Open Graph, breadcrumbs.
- **Por qué:** el benchmark de competidores mostró que casi ninguno tiene schema
  completo → es una ventaja barata. La valoración (`AggregateRating`) **solo** se
  emite si hay nº real de reseñas, para no inventar datos.

## 5. Indexación controlada por env (`PUBLIC_INDEXABLE`)

- **Decisión:** noindex por defecto; indexable solo si `PUBLIC_INDEXABLE=true`.
- **Por qué:** evita que el deploy de pruebas se indexe y cause contenido duplicado /
  problemas al pasar a producción. Un solo interruptor, sin tocar código.
- Controla a la vez la `<meta robots>` (en `Base.astro`) y el `robots.txt`
  (en `pages/robots.txt.ts`).

## 6. Protección por contraseña del deploy de pruebas ⭐ (el caso más instructivo)

- **Contexto:** queremos que el deploy en Vercel **no se vea ni se indexe** mientras
  hacemos pruebas. Plan: Hobby (gratis).
- **Decisión final:** `@astrojs/vercel` con `output: 'server'` (render bajo demanda) +
  `src/middleware.ts` que hace **HTTP Basic Auth** si existe `PREVIEW_PASSWORD`.
- **Por qué así y no de otra forma — alternativas que NO funcionaron o no servían:**

  | Intento | Resultado | Motivo |
  |---|---|---|
  | `robots.txt` con `Disallow: /` | ❌ No fiable | Si bloqueas el rastreo, Google **no llega a leer** el `noindex` → puede indexar la URL igual. Los dos métodos se pisan. |
  | Vercel Authentication (toggle nativo) | ❌ De pago para esto | Gratis solo en *preview*; proteger **producción** exige plan Pro. |
  | Vercel Password Protection (nativo) | ❌ De pago | Requiere plan Pro. |
  | `middleware.ts` en la raíz (Edge de Vercel) | ❌ No se ejecuta | Patrón de Next; Vercel **no lo recoge** en un proyecto Astro estático. |
  | Adapter `edgeMiddleware:true` con páginas **prerenderizadas** | ❌ No protege | El `config.json` sirve los HTML estáticos por el handler `filesystem` **antes** de pasar por el middleware. |
  | **SSR (`output:'server'`) + middleware de Astro** | ✅ **Funciona** | Toda petición pasa por `_render`, que ejecuta el middleware **con las cabeceras reales** → Basic Auth real. Verificado en local (401 sin credenciales, 200 con ellas). |

- **Consecuencia:** la web pasó de estática a **SSR**. Para una web pequeña en Vercel
  es perfectamente válido y rápido. Ventaja: ir a producción es **solo quitar
  `PREVIEW_PASSWORD`** (sin cambios de estructura).
- **Lección para futuras webs:** si necesitas proteger por contraseña un sitio Astro
  en Vercel Hobby, ve directo a **SSR + middleware de Astro**. No pierdas tiempo con
  `robots`, el `middleware.ts` de raíz, ni el `edgeMiddleware` sobre páginas estáticas.

## 7. Reseñas: filtrar las negativas/incoherentes

- **Decisión:** en `resenas.ts` solo van reseñas reales positivas; se descartaron una
  negativa ("venta forzada") y otra incoherente que mostraba la landing original.
- **Por qué:** son reales (no inventadas), pero mostrar la negativa en bucle dañaba la
  conversión.

---

## Pendientes conocidos (deuda técnica)

- **Sitemap en modo SSR:** `@astrojs/sitemap` no enumera las rutas dinámicas cuando
  todo es SSR. Irrelevante mientras sea `noindex`. Para producción: generar el sitemap
  desde los datos (endpoint propio) o reintroducir prerender selectivo.
- **Datos reales** pendientes en `src/data/negocio.ts` (teléfono local, WhatsApp,
  email, NAP, coordenadas, nº de reseñas, razón social/NIF).
- **Páginas legales** son stubs (`noindex`) hasta tener los datos de la empresa.
