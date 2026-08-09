export const CONDICIONES = [
  'Nuevo',
  'Excelente estado',
  'Buen estado',
  'Estado aceptable',
  'Necesita reparación',
] as const;

export type Condicion = (typeof CONDICIONES)[number];
