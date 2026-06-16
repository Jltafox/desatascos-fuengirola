/**
 * FAQs (se usan en la home, en páginas de zona y en el schema FAQPage).
 * Orientadas a objeciones reales del cliente, igual que la landing original.
 */
export interface Faq {
  pregunta: string;
  respuesta: string;
}

export const faqs: Faq[] = [
  {
    pregunta: '¿Tenéis técnicos en Fuengirola ahora mismo?',
    respuesta:
      'Sí, estamos operativos en Fuengirola, Mijas y Marbella las 24 horas. Llevamos más de 10 años dando servicio en la zona.',
  },
  {
    pregunta: '¿Cuánto tardáis en llegar?',
    respuesta:
      'En menos de una hora si es una emergencia. Muchas veces llegamos en 30 minutos.',
  },
  {
    pregunta: '¿Vaciaréis mi pozo sin pedirlo?',
    respuesta:
      'No. Solo actuamos donde nos autorizas. Sin pillarte el dedo ni hacerte un gasto innecesario.',
  },
  {
    pregunta: '¿El presupuesto es cerrado?',
    respuesta:
      'Sí. Te decimos el precio antes de empezar y es el que pagas, sin sorpresas ni recargos ocultos.',
  },
];
