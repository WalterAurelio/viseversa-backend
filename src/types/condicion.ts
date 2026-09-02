export const CONDICIONES = [
  'nuevo',
  'excelente estado',
  'buen estado',
  'estado aceptable',
  'necesita reparación',
] as const;

export type Condicion = (typeof CONDICIONES)[number];
