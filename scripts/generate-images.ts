/**
 * GENERADOR DE IMÁGENES con gpt-image-1 (OpenAI).
 *
 * Uso:
 *   npm run generate:images               # genera todas las pendientes
 *   npm run generate:images -- --only=hero  # solo una
 *   npm run generate:images -- --force    # regenera aunque ya exista
 *
 * Requiere OPENAI_API_KEY en .env (sin comillas).
 * Salida: public/img/<id>.webp  (+ <id>-original.png como copia de seguridad)
 */

import { mkdir, writeFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import OpenAI from 'openai';
import { imagePrompts, getPromptById, type ImagePromptSpec } from './image-prompts.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'public', 'img');

const args = process.argv.slice(2);
const onlyArg = args.find((a) => a.startsWith('--only='))?.split('=')[1];
const force = args.includes('--force');

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Falta OPENAI_API_KEY. Crea un .env (mira .env.example).');
  process.exit(1);
}

const client = new OpenAI();

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generateOne(spec: ImagePromptSpec): Promise<void> {
  const outWebp = resolve(OUT_DIR, `${spec.id}.webp`);
  const outOriginal = resolve(OUT_DIR, `${spec.id}-original.png`);

  if (!force && (await exists(outWebp))) {
    console.log(`⏭️  ${spec.id}: ya existe (usa --force para regenerar)`);
    return;
  }

  console.log(`🎨 Generando "${spec.id}" (${spec.size}, calidad ${spec.quality})…`);
  const start = Date.now();

  const result = await client.images.generate({
    model: 'gpt-image-1',
    prompt: spec.prompt,
    size: spec.size,
    quality: spec.quality,
    n: 1,
  });

  const b64 = result.data?.[0]?.b64_json;
  if (!b64) throw new Error(`Respuesta vacía para ${spec.id}`);

  const buffer = Buffer.from(b64, 'base64');
  await mkdir(OUT_DIR, { recursive: true });

  // Guarda el PNG original (de respaldo, por si quieres rehacer optimizaciones).
  await writeFile(outOriginal, buffer);

  // Convierte a WebP optimizado para web.
  await sharp(buffer)
    .resize({ width: spec.outputWidth, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outWebp);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`✅ ${spec.id} → ${outWebp} (${elapsed}s)`);
}

async function main() {
  const todo = onlyArg
    ? (getPromptById(onlyArg) ? [getPromptById(onlyArg)!] : [])
    : imagePrompts;

  if (todo.length === 0) {
    console.error(`❌ No hay imagen con id "${onlyArg}". Disponibles: ${imagePrompts.map((p) => p.id).join(', ')}`);
    process.exit(1);
  }

  console.log(`\n📸 Generando ${todo.length} imagen(es)…\n`);
  for (const spec of todo) {
    try {
      await generateOne(spec);
    } catch (err) {
      console.error(`❌ Falló "${spec.id}":`, err instanceof Error ? err.message : err);
    }
  }
  console.log('\n✨ Listo. Revisa public/img/ y commitea las que te gusten.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
