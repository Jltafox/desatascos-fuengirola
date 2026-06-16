# Plantilla: crear una web nueva similar

Esta web está pensada como **molde** para levantar otras de captación local
(otro oficio, otra ciudad) en poco tiempo. Casi todo es cambiar datos.

## 1. Clonar el molde

```bash
# Opción A: nuevo repo a partir de este
git clone https://github.com/Jltafox/desatascos-fuengirola.git nueva-web
cd nueva-web
rm -rf .git && git init
npm install
```

## 2. Cambiar la marca (1 archivo)

`src/styles/tokens.css` → edita las variables `:root` (`--brand`, `--accent`, etc.).
Cambia también `public/favicon.svg`.

## 3. Cambiar el contenido (carpeta `src/data/`)

Es el 90% del trabajo. **No toques las plantillas**, solo estos archivos:

| Archivo | Qué poner |
|---|---|
| `negocio.ts` | Nombre, claim, descripción, teléfono, WhatsApp, email, ciudad/zonas, NAP, horario, años, valoración, equipo |
| `servicios.ts` | Los servicios del nuevo oficio (slug, nombre, icono, resumen, intro, bullets). Cada uno crea su página |
| `zonas.ts` | Ciudades y barrios objetivo. Cada uno crea su página |
| `faqs.ts` | Preguntas frecuentes del nuevo negocio |
| `resenas.ts` | Reseñas reales (solo si las hay; si no, deja el array vacío) |

> Los iconos salen de Font Awesome 6 (`fa6-solid:...`, `fa6-brands:...`).
> Busca nombres en https://icones.js.org/collection/fa6-solid

## 4. Ajustar textos de cabecera/SEO si hace falta

- `src/pages/index.astro` → el `title` y los textos del hero/proceso.
- `src/layouts/Base.astro` → estructura del `<head>` (normalmente no se toca).

## 5. Dominio

`astro.config.mjs` → `site: 'https://nuevo-dominio.es'` (afecta canónicas y sitemap).

## 6. Desplegar en Vercel

1. Sube el repo a GitHub.
2. Vercel → New Project → Import → selecciona el repo (detecta Astro solo).
3. **Pruebas:** añade env `PREVIEW_USER` + `PREVIEW_PASSWORD` (protección por contraseña).
   No pongas `PUBLIC_INDEXABLE` (queda en noindex).
4. **Producción:** quita `PREVIEW_PASSWORD`, pon `PUBLIC_INDEXABLE=true`, redeploy.

## 7. Checklist de "listo para producción"

- [ ] Datos reales en `negocio.ts` (sin `TODO`)
- [ ] Teléfono local (no un 900 de call-center)
- [ ] WhatsApp en formato `34XXXXXXXXX`
- [ ] Email real
- [ ] NAP (dirección) y coordenadas reales
- [ ] Fotos reales en `public/` (equipo, vehículo, trabajos)
- [ ] Páginas legales completas (aviso legal, privacidad, cookies)
- [ ] Dominio real en `astro.config.mjs`
- [ ] `PUBLIC_INDEXABLE=true` y `PREVIEW_PASSWORD` borrada en Vercel

## Qué NO cambia entre webs (lo reutilizable)

- Toda la carpeta `src/components/` y `src/layouts/`.
- `src/middleware.ts` (protección por contraseña).
- `src/consts.ts` (flag de indexación).
- `src/pages/` (las plantillas; se alimentan de los datos).
- La configuración de Vercel y el flujo de despliegue.
