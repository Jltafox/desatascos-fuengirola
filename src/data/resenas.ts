/**
 * RESEÑAS reales recuperadas de la landing original (Google).
 * Se han DESCARTADO la reseña negativa ("venta forzada") y una incoherente,
 * tal y como recomendaba el benchmark. Añade aquí nuevas reseñas reales.
 *
 * Nota: NO uses estas reseñas para generar AggregateRating schema salvo que
 * tengas el nº total real de reseñas en negocio.valoracion.total.
 */
export interface Resena {
  autor: string;
  texto: string;
  estrellas: number;
  fecha?: string;
}

export const resenas: Resena[] = [
  {
    autor: 'Manuel Monteleone',
    estrellas: 5,
    fecha: 'Hace 2 años',
    texto:
      'Servicio impecable, profesional y transparente, no se puede pedir más. El equipo que se encargó de mi casa fue espectacular, liderado por Sandro, implicado en cada momento del trabajo.',
  },
  {
    autor: 'Cristina Cuesta',
    estrellas: 5,
    fecha: 'Hace 2 años',
    texto:
      'Empresa recomendable 100%. Le doy las gracias a Sandro y a Adrián: muy amables y profesionales, me solucionaron lo que necesitaba cuando otras empresas no supieron hacerlo. ¡Muy agradecida!',
  },
  {
    autor: 'M. Rein',
    estrellas: 5,
    fecha: 'Hace 2 años',
    texto:
      'Recomendables 100%. Los llamamos para una limpieza de cañerías y arquetas y vinieron en menos de una hora. Todo arreglado, trabajo bien terminado y muy amables.',
  },
  {
    autor: 'Zona López Petersen',
    estrellas: 5,
    fecha: 'Hace 3 años',
    texto:
      'Encantados con el servicio, los contratamos para un atasco y lo solucionaron de forma efectiva y eficiente.',
  },
];
