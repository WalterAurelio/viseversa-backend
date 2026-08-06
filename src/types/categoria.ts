export const CATEGORIAS = [
  'Remeras',
  'Camisas',
  'Buzos',
  'Abrigos',
  'Pantalones',
  'Shorts',
  'Faldas',
  'Vestidos',
  'Calzado',
  'Accesorios',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];
