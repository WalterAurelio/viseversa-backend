export const COLORES = [
  'blanco',
  'negro',
  'gris',
  'beige',
  'marrón',
  'rojo',
  'rosa',
  'naranja',
  'amarillo',
  'verde',
  'celeste',
  'azul',
  'violeta',
  'bordó',
  'multicolor',
] as const;

export type Color = (typeof COLORES)[number];
