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
  {
    id: 'desatascos-tuberias',
    description: 'Hero de página de servicio: manos del técnico desatascando una tubería con sonda eléctrica',
    prompt: `Photorealistic professional commercial photograph for a Spanish plumbing / drain-cleaning service. Cinematic close-up shot of a male plumbing technician's hands and forearms in dark navy work uniform with black nitrile gloves, operating a professional electric drain auger machine (sonda eléctrica) to unclog a kitchen sink pipe under a clean modern white kitchen counter in a Spanish coastal apartment. The flexible auger cable is clearly visible entering the pipe. A professional toolbox with chrome wrenches is open nearby. Soft natural Mediterranean morning daylight comes through a window. Shallow depth of field, sharp focus on the hands and the auger machine, slight motion blur on the rotating cable suggests action. No faces visible, no logos, no text. Editorial commercial photography, 35mm lens, photorealistic, high detail.`,
    size: '1536x1024',
    quality: 'high',
    outputWidth: 1600,
  },
  {
    id: 'limpieza-arquetas-pozos',
    description: 'Hero de página de servicio: camión cuba aspirando una arqueta en calle de Fuengirola',
    prompt: `Photorealistic professional commercial photograph for a Spanish drain-cleaning company. A large clean white industrial vacuum tanker truck (camión cuba) parked on a sunny residential street in a Spanish coastal town in Andalusia: whitewashed houses, palm trees, bright Mediterranean midday light. A thick corrugated black suction hose runs from the truck down into an open street manhole / arqueta in the foreground. A male technician in dark navy uniform and black gloves, viewed from the side from waist down, professionally guides the hose into the manhole. Clean professional equipment, no visible logos or text on the truck. Sharp clear photography, professional 35mm lens, photorealistic, editorial commercial quality, no faces in close-up.`,
    size: '1536x1024',
    quality: 'high',
    outputWidth: 1600,
  },
  {
    id: 'desatoros-urgentes-24h',
    description: 'Hero de página de servicio: furgoneta de urgencia 24h al anochecer en calle de Costa del Sol',
    prompt: `Photorealistic professional commercial photograph for a 24-hour emergency drain service in coastal Spain. Twilight scene on a quiet residential street in coastal Andalusia (Fuengirola style: whitewashed buildings, a palm tree). A clean white service van parked at the curb with its rear doors open, softly illuminated by an amber street light and the warm interior lights of the van. The inside of the van shows neatly organized professional plumbing tools, drain auger reels and equipment on shelves. A male technician in dark navy uniform, viewed from behind in a three-quarters angle, is reaching for a tool from the van, ready to respond. Mood: calm urgency, late evening, warm streetlight tones contrasted with the cool blue dusk sky. Photorealistic, cinematic, sharp focus on the van interior and tools, professional 35mm photography, no logos, no text, no faces visible, editorial commercial quality.`,
    size: '1536x1024',
    quality: 'high',
    outputWidth: 1600,
  },
  {
    id: 'equipo',
    description: 'Equipo: dos técnicos junto a la furgoneta en Fuengirola (diferenciador del negocio)',
    prompt: `Photorealistic professional commercial photograph for a Spanish family-run drain-cleaning business. Two male technicians (one slightly older, around 40, the other in his early 30s) in matching dark navy work uniforms with black gloves, standing side by side next to a clean white professional service van on a sunny residential street in coastal Andalusia (Fuengirola, Costa del Sol). They are viewed from a three-quarter angle and looking slightly off-camera toward the right, posed naturally — confident, approachable, professional, calm — not smiling at the camera. Whitewashed Spanish buildings and a palm tree in the background, hint of the Mediterranean sea on the horizon. Warm late-afternoon golden light. Professional 35mm commercial photography, sharp focus, photorealistic, no logos or text on uniforms or van, editorial quality.`,
    size: '1536x1024',
    quality: 'high',
    outputWidth: 1600,
  },
];

export function getPromptById(id: string): ImagePromptSpec | undefined {
  return imagePrompts.find((p) => p.id === id);
}
