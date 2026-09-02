export const GENEROS = [
    'hombre',
    'mujer',
    'unisex'
] as const;

export type GeneroRopa = (typeof GENEROS)[number];