export const CATEGORIAS = [
  'remeras',
  'camisas',
  'buzos',
  'abrigos',
  'pantalones',
  'shorts',
  'faldas',
  'vestidos',
  'calzado',
  'accesorios',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];
