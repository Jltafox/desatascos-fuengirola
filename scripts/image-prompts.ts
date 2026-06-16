/**
 * REGISTRO DE PROMPTS DE IMÁGENES
 * ---------------------------------
 * Cada entrada genera UN archivo en public/img/<id>.webp.
 * - `prompt`: lo que pide gpt-image-1. Sé específico (composición, luz, contexto).
 * - `size`: "1536x1024" landscape (hero/banner), "1024x1024" cuadrado (cards),
 *           "1024x1536" portrait (retratos).
 * - `quality`: "low" (~0.02$), "medium" (~0.07$), "high" (~0.17$). Hero = high.
 *
 * Para añadir más imágenes en futuras iteraciones: añade entradas aquí y
 * relanza `npm run generate:images -- --only=<id>` (o sin filtro = todas).
 *
 * Consejos para que salgan realistas:
 *  - Pide "photorealistic, professional commercial photography".
 *  - Evita primeros planos de caras (gpt-image-1 falla con detalles humanos).
 *  - Especifica luz, hora, lente y entorno geográfico real.
 *  - Menciona el contexto del negocio (Costa del Sol, mediterráneo).
 */

export interface ImagePromptSpec {
  id: string;
  prompt: string;
  size: '1024x1024' | '1536x1024' | '1024x1536';
  quality: 'low' | 'medium' | 'high';
  /** Anchura máxima en píxeles tras optimizar a WebP (alto se calcula proporcional) */
  outputWidth: number;
  /** Descripción humana (para logs y para el alt si se reutiliza luego) */
  description: string;
}

export const imagePrompts: ImagePromptSpec[] = [
  {
    id: 'hero',
    description: 'Hero principal de la home: técnico profesional trabajando en una calle de Costa del Sol al amanecer',
    prompt: `Photorealistic professional commercial photograph for a Spanish drain-cleaning service in Fuengirola, Costa del Sol. A male plumbing technician in clean dark navy work uniform and gloves, seen from the side and slightly behind so face is not the focus, working confidently on a street-level drain manhole on a sunny Mediterranean morning. A clean white service van with professional equipment is parked nearby in the background but only partially visible, out of focus. The setting is a typical Andalusian residential street in Fuengirola with whitewashed buildings, palm trees, and a hint of the Mediterranean sea on the horizon. Warm soft early morning light, golden hour, shallow depth of field, professional 35mm photography, sharp focus on the technician's hands and tool, cinematic atmosphere, no logos, no text, no faces in close-up, photorealistic, high detail, editorial quality.`,
    size: '1536x1024',
    quality: 'high',
    outputWidth: 1920,
  },
  // Añade aquí más imágenes en próximas iteraciones (servicios, equipo, antes/después).
];

export function getPromptById(id: string): ImagePromptSpec | undefined {
  return imagePrompts.find((p) => p.id === id);
}
