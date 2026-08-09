export const COLORES = [
  'Blanco',
  'Negro',
  'Gris',
  'Beige',
  'Marrón',
  'Rojo',
  'Rosa',
  'Naranja',
  'Amarillo',
  'Verde',
  'Celeste',
  'Azul',
  'Violeta',
  'Bordó',
  'Multicolor',
] as const;

export type Color = (typeof COLORES)[number];
